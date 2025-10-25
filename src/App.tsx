import { QuizGeneratorProvider, ChromeExtensionProvider } from './contexts';
import { QuizGenerator } from './design-system/organisms';
import { API_CONFIG } from './config/api';

function App() {
  return (
    <ChromeExtensionProvider>
      <QuizGeneratorProvider 
        geminiApiKey={API_CONFIG.GEMINI_API_KEY}
        baseUrl={API_CONFIG.API_BASE_URL}
        apiKey={API_CONFIG.API_KEY}
      >
        <QuizGenerator />
      </QuizGeneratorProvider>
    </ChromeExtensionProvider>
  );
}

export default App;
