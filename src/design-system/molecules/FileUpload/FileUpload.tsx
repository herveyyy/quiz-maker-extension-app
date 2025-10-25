import React from 'react';
import { Button, ProgressBar, Alert, Icon } from '../../atoms';

type FileUploadProps = {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  selectedFile: File | null;
  isUploading: boolean;
  uploadProgress: number;
  error?: string;
  acceptedTypes?: string;
  maxSize?: number; // in MB
};

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onFileRemove,
  selectedFile,
  isUploading,
  uploadProgress,
  error,
  acceptedTypes = '.pdf,.doc,.docx,.txt',
  maxSize = 10,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size must be less than ${maxSize}MB`);
        return;
      }
      onFileSelect(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-3">
      {error && <Alert type="error" message={error} />}
      
      <div className="border-2 border-dashed border-orange-200/50 rounded-xl p-4 text-center bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-200">
        {selectedFile ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="document" size="md" className="text-orange-500" />
                <div className="text-left">
                  <p className="text-sm font-medium text-orange-800 truncate max-w-48">{selectedFile.name}</p>
                  <p className="text-xs text-orange-600">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              <Button
                onClick={onFileRemove}
                variant="danger"
                size="sm"
                className="px-3 py-1 text-xs"
              >
                Remove
              </Button>
            </div>
            
            {isUploading && (
              <div className="space-y-2">
                <ProgressBar progress={uploadProgress} />
                <p className="text-xs text-orange-600">Uploading...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <Icon name="upload" size="md" className="text-orange-400 mx-auto" />
            <div>
              <p className="text-sm text-orange-700 font-medium">
                Tap to upload document
              </p>
              <p className="text-xs text-orange-500 mt-1">
                PDF, PPTX, DOCX, DOC, TXT (Max {maxSize}MB)
              </p>
              <p className="text-xs text-orange-400 mt-1">
                Supports: Word docs (parsed), Presentations, PDFs, Text files
              </p>
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              accept={acceptedTypes}
              className="hidden"
              disabled={isUploading}
            />
            <Button
              onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
              variant="primary"
              size="sm"
              disabled={isUploading}
              className="w-full"
            >
              Choose File
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
