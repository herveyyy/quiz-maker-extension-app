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
      
      if (fileExtension === 'docx') {
        // Use mammoth for Word documents
        this.extractTextFromWordDocument(file)
          .then(resolve)
          .catch(reject);
      } else {
        // Use FileReader for text files and other formats
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
        
        reader.readAsText(file, 'UTF-8');
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
