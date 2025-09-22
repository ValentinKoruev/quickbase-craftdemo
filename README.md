# QuickBase Field Builder Demo

A React-based demo application for building and configuring form fields with a focus on multi-select fields.

## 🚦 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ValentinKoruev/quickbase-craftdemo.git
   cd quickbase-craftdemo
   ```

2. Install dependencies for both client and server:

   ```bash
   # Install client dependencies
   cd client
   yarn install

   # Install server dependencies
   cd ../server
   yarn install
   ```

### Running the Application

1. Start the server:

   ```bash
   cd server
   yarn dev
   # Server runs on http://localhost:3000 by default
   ```

2. In a separate terminal, start the client:
   ```bash
   cd client
   yarn dev
   # Client runs on http://localhost:5173 by default
   ```

### Running Tests

```bash
cd client
yarn test           # Run tests
yarn test:watch     # Run tests in watch mode
yarn test:preview   # Run tests in preview mode
```

## 📝 Core Requirements Implementation

- ✅ Add/remove choices from the list
- ✅ Form validation
  - Required label field
  - No duplicate choices
  - Maximum 50 choices
- ✅ Default value added to choices when saving
- ✅ Form retains values after submission
- ✅ Button to clear the form
- ✅ HTTP endpoint to receive field data
- ✅ Submit button posts JSON data to backend

## 🌟 Stretch Goals Implemented

- ✅ Unit tests using Vitest and React Testing Library
- ✅ Responsive design for mobile and desktop
- ✅ Visual distinction for choices exceeding 40 characters
- ✅ Reusable Button component with loading state and various combinations of properties

## Additional Features Implemented

- ✅ Fully reusable FieldBuilder component that functions as a dynamic form generator for creating customized forms
- ✅ Multiple field type variants (text, checkbox, dropdown, list, readonly, button) with consistent interfaces
- ✅ Advanced cursor management in editable text fields for better UX (required for stretch task implementation)
- ✅ Validation system with custom validation functions per field
- ✅ Reusable Icon component system with centralized SVG management
- ✅ Form modification tracking to prevent unnecessary submissions
- ✅ Highly modular codebase architecture with clear separation of concerns
- ✅ Example implementations demonstrating component reusability

## 🔒 License

This project is for demonstration purposes and part of a craft demo for QuickBase.
