# Project Architecture

## Overview

This project follows **Atomic Design Patterns** with modern TypeScript syntax and custom hooks for a clean, maintainable, and scalable architecture. The extension now focuses on **Quiz Generation** using AI (Gemini API) instead of recording functionality.

## Design Pattern: Atomic Design

### 🧪 Atoms (Basic Building Blocks)

Located in `src/design-system/atoms/`

-   **Button**: Reusable button component with variants and sizes
-   **Icon**: SVG icon component with predefined icons
-   **Input**: Form input component with various types
-   **TextArea**: Multi-line text input component
-   **Select**: Dropdown selection component
-   **ProgressBar**: Progress indicator component
-   **Alert**: Notification component for success/error messages

### 🧬 Molecules (Simple Combinations)

Located in `src/design-system/molecules/`

-   **FileUpload**: Combines Input + ProgressBar + Alert for file upload functionality
-   **QuizForm**: Combines Input + TextArea + Select for quiz configuration
-   **GeneratedQuiz**: Displays generated quiz with edit/save actions

### 🦠 Organisms (Complex Components)

Located in `src/design-system/organisms/`

-   **QuizGenerator**: Main quiz generation interface with file upload and AI integration

## Custom Hooks Pattern

### 🎣 Quiz Generator Hook (`useQuizGenerator`)

```typescript
const {
    selectedFile,
    isUploading,
    uploadProgress,
    quizFormData,
    generatedQuiz,
    isGenerating,
    isSaving,
    selectFile,
    removeFile,
    updateQuizForm,
    generateQuiz,
    saveQuiz,
    regenerateQuiz,
    editQuiz,
} = useQuizGenerator(geminiApiKey, baseUrl, apiKey);
```

**Features:**

-   File upload management
-   Quiz form state management
-   AI-powered quiz generation
-   Backend integration for saving quizzes
-   Error handling and user feedback

### 🎣 Chrome Extension Hook (`useChromeExtension`)

```typescript
const { isExtensionLoaded, sendMessageToBackground, sendMessageToActiveTab } =
    useChromeExtension();
```

**Features:**

-   Chrome extension API integration
-   Message passing between components
-   Background script communication

## Context Providers Pattern

### 🏪 Quiz Generator Context

```typescript
<QuizGeneratorProvider geminiApiKey={apiKey} baseUrl={url} apiKey={key}>
    <App />
</QuizGeneratorProvider>
```

**Purpose:** Provides quiz generation state and actions to child components

### 🏪 Chrome Extension Context

```typescript
<ChromeExtensionProvider>
    <App />
</ChromeExtensionProvider>
```

**Purpose:** Handles Chrome extension API communication

## Services Layer (Dependency Injection)

### 🔧 GeminiService

```typescript
const geminiService = new GeminiService({ apiKey: "your-api-key" });
```

**Features:**

-   AI-powered quiz generation using Gemini API
-   Document content analysis
-   Question type generation (multiple choice, true/false, essay, etc.)
-   Difficulty level adaptation

### 🔧 FileService

```typescript
const fileService = new FileService(baseUrl, apiKey);
```

**Features:**

-   File upload management
-   Text extraction from documents
-   File metadata handling
-   File deletion and cleanup

### 🔧 QuizService

```typescript
const quizService = new QuizService(geminiApiKey, baseUrl, apiKey);
```

**Features:**

-   End-to-end quiz generation workflow
-   Backend integration for saving quizzes
-   Section question creation
-   Form validation

### 🔧 ChromeExtensionService

```typescript
const chromeService = new ChromeExtensionService();
```

**Features:**

-   Chrome API abstraction
-   Message passing
-   Error handling

## Modern TypeScript Features

### ✅ Type Instead of Interface

```typescript
// Old way (interface)
interface User {
    name: string;
    age: number;
}

// New way (type)
type User = {
    name: string;
    age: number;
};
```

### ✅ Type-Only Imports

```typescript
import type { ReactNode } from "react";
```

### ✅ Generic Types

```typescript
type ApiResponse<T> = {
    data: T;
    success: boolean;
    error?: string;
};
```

## File Structure

```
src/
├── design-system/           # Atomic Design Components
│   ├── atoms/              # Basic building blocks
│   │   ├── Button/
│   │   ├── Icon/
│   │   ├── Input/
│   │   ├── TextArea/
│   │   ├── Select/
│   │   ├── ProgressBar/
│   │   └── Alert/
│   ├── molecules/          # Simple combinations
│   │   ├── FileUpload/
│   │   ├── QuizForm/
│   │   └── GeneratedQuiz/
│   └── organisms/          # Complex components
│       └── QuizGenerator/
├── hooks/                  # Custom React hooks
│   ├── useQuizGenerator.ts
│   └── useChromeExtension.ts
├── contexts/               # React Context providers
│   ├── QuizGeneratorContext.tsx
│   └── ChromeExtensionContext.tsx
├── services/               # Business logic services
│   ├── GeminiService.ts
│   ├── FileService.ts
│   ├── QuizService.ts
│   └── ChromeExtensionService.ts
├── types/                  # TypeScript definitions
│   └── chrome.d.ts
├── App.tsx                 # Main application
└── main.tsx               # Entry point
```

## Benefits of This Architecture

### 🎯 **Separation of Concerns**

-   UI components are pure and focused
-   Business logic is in services
-   State management is in hooks and contexts

### 🔄 **Reusability**

-   Atoms can be used anywhere
-   Molecules combine atoms logically
-   Organisms handle complex interactions

### 🧪 **Testability**

-   Each layer can be tested independently
-   Hooks can be tested with React Testing Library
-   Services can be unit tested

### 📈 **Scalability**

-   Easy to add new components
-   Clear patterns for new features
-   Consistent structure across the app

### 🛠️ **Maintainability**

-   Clear file organization
-   Predictable patterns
-   Easy to understand and modify

## Usage Examples

### Creating a New Atom

```typescript
// src/design-system/atoms/Checkbox/Checkbox.tsx
type CheckboxProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
};

export const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    onChange,
    label,
    disabled = false,
}) => {
    return (
        <label className="flex items-center space-x-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            {label && <span className="text-sm text-gray-700">{label}</span>}
        </label>
    );
};
```

### Creating a New Hook

```typescript
// src/hooks/useFileUpload.ts
export const useFileUpload = (maxSize: number = 10) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadFile = async (file: File) => {
        if (file.size > maxSize * 1024 * 1024) {
            setError(`File size must be less than ${maxSize}MB`);
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            // Upload logic here
            setFile(file);
        } catch (err) {
            setError("Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    return { file, isUploading, error, uploadFile };
};
```

### Creating a New Service

```typescript
// src/services/ApiService.ts
export class ApiService {
    constructor(private baseUrl: string, private apiKey: string) {}

    async post<T>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return response.json();
    }
}
```

## Design Principles

1. **Single Responsibility**: Each component/hook/service has one job
2. **Composition over Inheritance**: Build complex components from simple ones
3. **Dependency Injection**: Services receive dependencies through constructor
4. **Immutability**: State updates create new objects
5. **Type Safety**: Everything is typed with TypeScript
6. **Error Boundaries**: Graceful error handling at each layer

This architecture makes the codebase easy to understand, test, and maintain while following React and TypeScript best practices.
