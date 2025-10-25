import React from 'react';
import { FileUpload, QuizForm, GeneratedQuiz } from '../../molecules';
import { Alert } from '../../atoms';
import { useQuizGeneratorContext } from '../../../contexts';

const QuizGenerator: React.FC = () => {
  const {
    selectedFile,
    isUploading,
    uploadProgress,
    uploadError,
    quizFormData,
    generatedQuiz,
    isGenerating,
    isSaving,
    alert,
    selectFile,
    removeFile,
    updateQuizForm,
    generateQuiz,
    saveQuiz,
    regenerateQuiz,
    editQuiz,
    clearAlert,
  } = useQuizGeneratorContext();

  const handleFileSelect = async (file: File) => {
    selectFile(file);
  };

  const handleFileRemove = () => {
    removeFile();
  };

  const handleGenerateQuiz = async () => {
    await generateQuiz();
  };

  const handleSaveQuiz = async () => {
    if (!generatedQuiz) return;
    await saveQuiz('test-class-card-id');
  };

  const handleEditQuiz = () => {
    editQuiz();
  };

  const handleRegenerateQuiz = () => {
    regenerateQuiz();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-4">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-orange-800 mb-2">Quiz Generator</h1>
          <p className="text-orange-600 text-sm">
            Upload a document and generate quiz questions using AI
          </p>
          <div className="mt-2 px-3 py-1 bg-orange-100/50 rounded-full inline-block">
            <span className="text-xs text-orange-700 font-medium">🤖 AI Testing Mode</span>
          </div>
        </div>

        {alert && (
          <div className="mb-6">
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => clearAlert()}
            />
          </div>
        )}

        {!generatedQuiz ? (
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-orange-200/30">
              <h2 className="text-lg font-semibold text-orange-800 mb-4">
                Upload Document
              </h2>
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                selectedFile={selectedFile}
                isUploading={isUploading}
                uploadProgress={uploadProgress}
                error={uploadError || undefined}
                acceptedTypes=".pdf,.pptx,.docx,.doc,.txt"
                maxSize={10}
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-orange-200/30">
              <h2 className="text-lg font-semibold text-orange-800 mb-4">
                Configure Quiz
              </h2>
              <QuizForm
                data={quizFormData}
                onChange={updateQuizForm}
                onSubmit={handleGenerateQuiz}
                isSubmitting={isGenerating}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-orange-200/30">
            <h2 className="text-lg font-semibold text-orange-800 mb-4">
              Generated Quiz
            </h2>
            <GeneratedQuiz
              quiz={generatedQuiz}
              onEdit={handleEditQuiz}
              onSave={handleSaveQuiz}
              onRegenerate={handleRegenerateQuiz}
              isSaving={isSaving}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGenerator;