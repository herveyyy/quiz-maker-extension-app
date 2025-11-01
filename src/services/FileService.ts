type FileUploadResult = {
  success: boolean;
  fileId?: string;
  url?: string;
  error?: string;
};

type FileMetadata = {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
};

export class FileService {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async uploadFile(file: File): Promise<FileUploadResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'document');

      const response = await fetch(`${this.baseUrl}/api/files/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return {
        success: true,
        fileId: result.fileId,
        url: result.url,
      };
    } catch (error) {
      console.error('File upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  async extractTextFromFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log('📄 FileService: Extracting text from file...');
      
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const fileName = file.name.toLowerCase();
      
      if (fileExtension === 'docx' || fileExtension === 'doc') {
        // Use mammoth for Word documents (including Google Docs exports)
        this.extractTextFromWordDocument(file)
          .then(resolve)
          .catch(reject);
      } else if (fileExtension === 'pptx') {
        // Use jszip for PowerPoint presentations
        this.extractTextFromPowerPoint(file)
          .then(resolve)
          .catch(reject);
      } else if (fileExtension === 'pdf') {
        // Use pdfjs-dist for PDF files
        this.extractTextFromPDF(file)
          .then(resolve)
          .catch(reject);
      } else if (
        fileExtension === 'txt' || 
        fileExtension === 'text' ||
        fileExtension === 'srt' || 
        fileExtension === 'vtt' ||
        fileName.includes('transcript')
      ) {
        // Use FileReader for text files, transcripts, and subtitle files
        this.extractTextFromTextFile(file)
          .then(resolve)
          .catch(reject);
      } else if (fileExtension === 'gdoc') {
        // Google Docs native files are JSON shortcuts - inform user
        reject(new Error('Please export your Google Doc as .docx or .pdf and upload that file instead. Google Docs native files (.gdoc) cannot be directly processed.'));
      } else {
        // Use FileReader for other text-based formats
        this.extractTextFromTextFile(file)
          .then(resolve)
          .catch(reject);
      }
    });
  }

  private async extractTextFromWordDocument(file: File): Promise<string> {
    try {
      console.log('📄 Using mammoth for Word document...');
      
      // Convert File to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Import mammoth dynamically
      const mammoth = await import('mammoth');
      
      // Parse the Word document
      const result = await mammoth.extractRawText({ arrayBuffer });
      
      console.log('📊 Word document parsed:', {
        length: result.value.length,
        preview: result.value.substring(0, 200) + '...'
      });

      return result.value;
    } catch (error) {
      console.error('Error parsing Word document:', error);
      throw new Error(`Failed to parse Word document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async extractTextFromPowerPoint(file: File): Promise<string> {
    try {
      console.log('📊 Using jszip for PowerPoint presentation...');
      
      // Convert File to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Import jszip dynamically
      const JSZip = (await import('jszip')).default;
      
      // Load the PPTX file (which is a ZIP archive)
      const zip = await JSZip.loadAsync(arrayBuffer);
      
      // Extract text from all slides
      const slideFiles = Object.keys(zip.files)
        .filter(name => name.startsWith('ppt/slides/slide') && name.endsWith('.xml'))
        .sort(); // Sort to maintain slide order
      
      const textParts: string[] = [];
      
      for (let i = 0; i < slideFiles.length; i++) {
        const slideFileName = slideFiles[i];
        const slideXml = await zip.files[slideFileName].async('string');
        const slideText = this.extractTextFromSlideXml(slideXml);
        if (slideText.trim()) {
          textParts.push(`Slide ${i + 1}: ${slideText}`);
        }
      }
      
      const fullText = textParts.join('\n\n');
      
      console.log('📊 PowerPoint presentation parsed:', {
        slides: slideFiles.length,
        length: fullText.length,
        preview: fullText.substring(0, 200) + '...'
      });

      return fullText;
    } catch (error) {
      console.error('Error parsing PowerPoint presentation:', error);
      throw new Error(`Failed to parse PowerPoint presentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private extractTextFromSlideXml(xmlContent: string): string {
    try {
      // Parse XML and extract text from <a:t> elements (text in PowerPoint)
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
      
      // Get all text elements (PowerPoint uses various namespaces, so we'll search broadly)
      const textElements = xmlDoc.getElementsByTagName('a:t');
      const textParts: string[] = [];
      
      for (let i = 0; i < textElements.length; i++) {
        const text = textElements[i].textContent?.trim();
        if (text) {
          textParts.push(text);
        }
      }
      
      // Also check for other common text elements
      const fallbackTextElements = xmlDoc.getElementsByTagName('t');
      for (let i = 0; i < fallbackTextElements.length; i++) {
        const text = fallbackTextElements[i].textContent?.trim();
        if (text && !textParts.includes(text)) {
          textParts.push(text);
        }
      }
      
      return textParts.join(' ');
    } catch (error) {
      console.error('Error extracting text from slide XML:', error);
      // Fallback: try to extract text using regex
      const textMatches = xmlContent.match(/<a:t[^>]*>([^<]+)<\/a:t>/g);
      if (textMatches) {
        return textMatches
          .map(match => match.replace(/<[^>]+>/g, ''))
          .join(' ');
      }
      return '';
    }
  }

  private async extractTextFromPDF(file: File): Promise<string> {
    try {
      console.log('📑 Using pdfjs-dist for PDF document...');
      
      // Import pdfjs-dist dynamically
      const pdfjsLib = await import('pdfjs-dist');
      
      // Set worker source for pdfjs (required for browser environments)
      // For Chrome extensions, we need to use a local worker or disable it
      if (typeof window !== 'undefined') {
        // Try to use a local worker path (relative to extension)
        // If this doesn't work, pdfjs will fall back to a synchronous mode
        try {
          // Attempt to set worker from CDN (may fail in Chrome extensions due to CSP)
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
        } catch {
          // If CDN fails, pdfjs will work without worker (slower but functional)
          console.warn('PDF.js worker not available, using synchronous mode');
        }
      }
      
      // Convert File to ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Load the PDF document
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      const textParts: string[] = [];
      
      // Type definition for PDF.js text item
      type TextItem = {
        str: string;
        [key: string]: unknown;
      };
      
      // Extract text from each page
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Combine all text items from the page
        const pageText = (textContent.items as TextItem[])
          .map((item) => item.str)
          .join(' ');
        
        if (pageText.trim()) {
          textParts.push(`Page ${pageNum}: ${pageText}`);
        }
      }
      
      const fullText = textParts.join('\n\n');
      
      console.log('📊 PDF document parsed:', {
        pages: pdf.numPages,
        length: fullText.length,
        preview: fullText.substring(0, 200) + '...'
      });

      return fullText;
    } catch (error) {
      console.error('Error parsing PDF document:', error);
      throw new Error(`Failed to parse PDF document: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async extractTextFromTextFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log('📝 Reading text file...');
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (!content) {
          reject(new Error('Failed to read file content'));
          return;
        }

        console.log('📊 Content extracted:', {
          length: content.length,
          preview: content.substring(0, 200) + '...'
        });

        resolve(content);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      // Try UTF-8 first, fallback to other encodings if needed
      reader.readAsText(file, 'UTF-8');
    });
  }


  async getFileMetadata(fileId: string): Promise<FileMetadata | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/files/${fileId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching file metadata:', error);
      return null;
    }
  }

  async deleteFile(fileId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }
}
