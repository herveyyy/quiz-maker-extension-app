# 🤖 AI Testing Guide

## 🎯 **AI-Only Testing Mode**

Your quiz generator is now configured for **AI testing only** - no backend API required!

### ✅ **What's Configured**

-   **Gemini API**: ✅ Connected with your API key
-   **Backend APIs**: ❌ Disabled for testing
-   **File Processing**: ✅ Local file reading
-   **AI Generation**: ✅ Full functionality
-   **Save Function**: 🧪 Simulated (no real backend calls)

### 🚀 **How to Test AI Capabilities**

#### **Step 1: Load the Extension**

1. Open Chrome → `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `dist` folder

#### **Step 2: Test with Sample Document**

I've created a test document for you: `test-document.txt`

**Test Document Content:**

-   JavaScript programming fundamentals
-   10 key concepts covered
-   Perfect for generating quiz questions
-   Ready to upload and test

#### **Step 3: Generate Your First Quiz**

1. **Upload Document**:

    - Click "Choose File"
    - Select `test-document.txt`
    - File will be processed locally

2. **Configure Quiz**:

    - Title: "JavaScript Fundamentals Quiz"
    - Type: Quiz
    - Difficulty: Medium
    - Points: 100
    - Questions: 5
    - Time Limit: 30 minutes

3. **Generate Quiz**:

    - Click "Generate Quiz"
    - AI will analyze the document
    - Questions will be generated using Gemini API

4. **Review Results**:
    - Multiple choice questions
    - True/false questions
    - Short answer questions
    - Essay questions (if configured)

#### **Step 4: Test Save Function**

-   Click "Test Save (AI Mode)"
-   This simulates saving to backend
-   No real API calls are made
-   Perfect for testing the flow

### 🧪 **What You Can Test**

#### **AI Question Generation**

-   ✅ Multiple question types
-   ✅ Difficulty adaptation
-   ✅ Content relevance
-   ✅ Question variety
-   ✅ Answer quality

#### **File Processing**

-   ✅ PDF files
-   ✅ Word documents (.doc, .docx)
-   ✅ Text files (.txt)
-   ✅ File size validation
-   ✅ Content extraction

#### **User Interface**

-   ✅ Mobile-responsive design
-   ✅ Touch-friendly controls
-   ✅ Progress indicators
-   ✅ Error handling
-   ✅ Loading states

### 📊 **Expected AI Behavior**

#### **Question Types Generated**

-   **Multiple Choice**: 4 options, 1 correct answer
-   **True/False**: Clear true/false statements
-   **Short Answer**: Brief, specific answers
-   **Essay**: Longer, analytical questions

#### **Content Quality**

-   Questions directly related to document content
-   Appropriate difficulty level
-   Clear, unambiguous wording
-   Proper grammar and spelling

#### **AI Response Time**

-   Initial generation: 5-15 seconds
-   Regeneration: 3-10 seconds
-   Depends on document size and complexity

### 🔍 **Testing Scenarios**

#### **Scenario 1: Simple Document**

-   Upload `test-document.txt`
-   Generate 3 easy questions
-   Verify questions match content

#### **Scenario 2: Complex Document**

-   Upload a longer PDF
-   Generate 10 medium questions
-   Test different question types

#### **Scenario 3: Different Difficulties**

-   Same document, different difficulty levels
-   Compare question complexity
-   Verify appropriate challenge level

#### **Scenario 4: Various File Types**

-   Test PDF upload
-   Test Word document
-   Test text file
-   Verify content extraction

### 🚨 **Troubleshooting**

#### **Common Issues**

1. **"Failed to generate quiz"**

    - Check internet connection
    - Verify Gemini API key
    - Try with smaller document

2. **"File upload failed"**

    - Check file size (max 10MB)
    - Verify file type is supported
    - Try different file format

3. **"AI response too slow"**
    - Normal for large documents
    - Try with smaller content
    - Check API quota limits

#### **Debug Information**

-   Check browser console for detailed logs
-   AI testing mode shows all operations
-   Backend calls are simulated
-   No real data is saved

### 🎉 **Success Indicators**

#### **AI Working Correctly**

-   ✅ Questions generated from document content
-   ✅ Multiple question types created
-   ✅ Appropriate difficulty level
-   ✅ Clear, relevant questions
-   ✅ Proper answer options

#### **UI Working Correctly**

-   ✅ File uploads successfully
-   ✅ Progress indicators show
-   ✅ Quiz displays properly
-   ✅ Mobile layout works
-   ✅ All buttons functional

### 📱 **Mobile Testing**

#### **Test on Mobile Device**

-   Load extension in mobile Chrome
-   Test touch interactions
-   Verify responsive layout
-   Check file upload on mobile
-   Test quiz generation flow

#### **Mobile Features**

-   Touch-friendly file upload
-   Swipe-friendly quiz display
-   One-handed operation
-   Fast loading times
-   Minimal data usage

### 🔄 **Next Steps After Testing**

Once you're satisfied with the AI capabilities:

1. **Add Backend Integration**

    - Configure your API endpoints
    - Update `src/config/api.ts`
    - Enable real save functionality

2. **Customize UI**

    - Modify colors and styling
    - Adjust layout for your needs
    - Add your branding

3. **Deploy Extension**
    - Package for Chrome Web Store
    - Add proper permissions
    - Include user documentation

### 🎯 **Testing Checklist**

-   [ ] Extension loads in Chrome
-   [ ] File upload works
-   [ ] AI generates questions
-   [ ] Questions are relevant
-   [ ] Multiple question types
-   [ ] Difficulty levels work
-   [ ] Mobile interface works
-   [ ] Save simulation works
-   [ ] Error handling works
-   [ ] Performance is acceptable

**Happy Testing! 🚀**
