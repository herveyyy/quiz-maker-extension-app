# 🔧 Extension Troubleshooting Guide

## 🚨 **Common Issues & Solutions**

### **Issue 1: Extension Not Loading**

**Symptoms:** Extension doesn't appear in Chrome or shows errors

**Solutions:**

1. **Check Developer Mode**

    - Go to `chrome://extensions/`
    - Enable "Developer mode" (toggle in top right)
    - Try loading the extension again

2. **Verify Build**

    ```bash
    bun run build
    ```

    - Ensure no TypeScript errors
    - Ensure build completes successfully

3. **Check Manifest**
    - Verify `dist/manifest.json` exists
    - Check permissions are correct
    - Ensure all required files are present

### **Issue 2: UI Not Working**

**Symptoms:** Extension loads but buttons don't work, forms don't submit

**Solutions:**

1. **Check Console Errors**

    - Open DevTools (F12)
    - Look for JavaScript errors
    - Check for missing dependencies

2. **Verify Context Providers**

    - Ensure `QuizGeneratorProvider` wraps the app
    - Check that `useQuizGeneratorContext` is used correctly
    - Verify all hooks are properly connected

3. **Check API Configuration**
    - Verify `src/config/api.ts` has correct API key
    - Ensure Gemini API key is valid
    - Check network connectivity

### **Issue 3: AI Not Generating Questions**

**Symptoms:** File uploads but no quiz is generated

**Solutions:**

1. **Check API Key**

    ```typescript
    // In src/config/api.ts
    export const API_CONFIG = {
        GEMINI_API_KEY: "your-actual-api-key", // Make sure this is correct
    };
    ```

2. **Test API Connection**

    ```bash
    node -e "
    import { GoogleGenAI } from '@google/genai';
    const ai = new GoogleGenAI({ apiKey: 'your-api-key' });
    ai.models.generateContent({ model: 'gemini-2.5-flash', contents: 'Hello' })
      .then(r => console.log('✅ API works:', r.text))
      .catch(e => console.error('❌ API error:', e.message));
    "
    ```

3. **Check File Upload**
    - Ensure file is actually selected
    - Check file type is supported (.pdf, .doc, .docx, .txt)
    - Verify file size is under 10MB

### **Issue 4: Mobile UI Issues**

**Symptoms:** UI looks broken on mobile or touch doesn't work

**Solutions:**

1. **Check Viewport**

    - Ensure `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is present
    - Test on different screen sizes

2. **Verify Touch Events**
    - Check that buttons are properly sized for touch
    - Ensure no overlapping elements
    - Test touch interactions

### **Issue 5: Build Errors**

**Symptoms:** `bun run build` fails with errors

**Solutions:**

1. **TypeScript Errors**

    ```bash
    # Check for TypeScript errors
    tsc --noEmit
    ```

2. **Missing Dependencies**

    ```bash
    # Reinstall dependencies
    bun install
    ```

3. **Import Errors**
    - Check all import paths are correct
    - Verify all files exist
    - Check for circular dependencies

## 🔍 **Debug Steps**

### **Step 1: Check Extension Load**

1. Go to `chrome://extensions/`
2. Enable Developer mode
3. Click "Load unpacked"
4. Select the `dist` folder
5. Check for any error messages

### **Step 2: Check Console**

1. Open the extension popup
2. Right-click → "Inspect"
3. Go to Console tab
4. Look for errors (red text)
5. Check for warnings (yellow text)

### **Step 3: Test API Connection**

1. Open browser console
2. Run this test:
    ```javascript
    fetch("https://generativelanguage.googleapis.com/v1beta/models", {
        headers: { "Content-Type": "application/json" },
    })
        .then((r) => console.log("API accessible:", r.ok))
        .catch((e) => console.error("API error:", e));
    ```

### **Step 4: Test File Upload**

1. Try uploading a small text file
2. Check if file is selected
3. Look for upload progress
4. Check for error messages

### **Step 5: Test AI Generation**

1. Upload a document
2. Fill in quiz form
3. Click "Generate Quiz"
4. Watch console for API calls
5. Check for error messages

## 🛠️ **Advanced Debugging**

### **Enable Debug Logging**

Add this to your component to see what's happening:

```typescript
// In QuizGenerator component
useEffect(() => {
    console.log("🔍 QuizGenerator mounted");
    console.log("🔍 Selected file:", selectedFile);
    console.log("🔍 Form data:", quizFormData);
    console.log("🔍 Generated quiz:", generatedQuiz);
}, [selectedFile, quizFormData, generatedQuiz]);
```

### **Check Network Requests**

1. Open DevTools → Network tab
2. Try generating a quiz
3. Look for requests to `generativelanguage.googleapis.com`
4. Check request/response details

### **Verify Context State**

```typescript
// Add this to your component
const context = useQuizGeneratorContext();
console.log("🔍 Context state:", {
    selectedFile: context.selectedFile,
    isGenerating: context.isGenerating,
    generatedQuiz: context.generatedQuiz,
    alert: context.alert,
});
```

## 📱 **Mobile-Specific Issues**

### **Touch Events Not Working**

-   Check that buttons have proper touch targets (min 44px)
-   Ensure no overlapping elements
-   Test on actual mobile device

### **Layout Issues**

-   Check responsive breakpoints
-   Verify Tailwind classes are correct
-   Test on different screen sizes

### **Performance Issues**

-   Check bundle size (should be ~400KB)
-   Look for memory leaks
-   Test on slower devices

## 🚀 **Quick Fixes**

### **Reset Everything**

```bash
# Clean and rebuild
rm -rf dist node_modules
bun install
bun run build
```

### **Check Dependencies**

```bash
# Update dependencies
bun update

# Check for conflicts
bun list
```

### **Verify Configuration**

```bash
# Check TypeScript config
tsc --showConfig

# Check Vite config
cat vite.config.ts
```

## 📞 **Getting Help**

### **Check These First**

1. ✅ Extension loads without errors
2. ✅ Console shows no JavaScript errors
3. ✅ API key is correct and valid
4. ✅ File upload works
5. ✅ Network requests are successful

### **Provide This Information**

When asking for help, include:

-   Browser version and OS
-   Console error messages
-   Steps to reproduce the issue
-   Screenshots if helpful
-   Network request details

### **Common Error Messages**

**"useQuizGeneratorContext must be used within a QuizGeneratorProvider"**

-   Solution: Ensure the component is wrapped in the provider

**"Failed to generate quiz"**

-   Solution: Check API key and network connection

**"File upload failed"**

-   Solution: Check file type and size limits

**"Extension not loading"**

-   Solution: Check manifest.json and build output

## 🎯 **Success Checklist**

-   [ ] Extension loads in Chrome
-   [ ] No console errors
-   [ ] File upload works
-   [ ] AI generates questions
-   [ ] Mobile UI works
-   [ ] All buttons functional
-   [ ] Error handling works
-   [ ] Performance is acceptable

**If all items are checked, your extension is working correctly! 🎉**
