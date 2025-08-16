# Language Toggle Implementation

## Overview

This implementation adds a simple toggle button to the ByWay project that allows users to switch between English and Arabic languages with proper RTL (Right-to-Left) support while keeping the navbar in LTR direction.

## Features

- **Simple Toggle Button**: Located in the navbar showing current language flag and code
- **One-Click Toggle**: Click to switch between English and Arabic instantly
- **RTL Support**: Automatic direction change for content when switching to Arabic
- **Navbar LTR Lock**: Navbar always maintains LTR direction regardless of language
- **LocalStorage Persistence**: Language preference is saved and restored on page reload
- **Initial Language Loading**: Website loads with previously selected language from localStorage
- **Translation Integration**: Uses react-i18next for text translations
- **Responsive Design**: Works on both desktop and mobile devices

## Key Changes from Dropdown Version

1. **Simple Toggle Button**: Replaced dropdown with a single button that toggles between languages
2. **Navbar Direction Lock**: Navbar always stays LTR even when content is RTL
3. **Initial Language Detection**: Properly loads saved language from localStorage on startup
4. **Simplified UI**: Clean, minimal design that shows flag and language code

## Files Modified/Created

### Updated Components

1. **`src/components/NavBar/LanguageToggle.tsx`**

   - Simple toggle button instead of dropdown
   - Shows current language flag and code (EN/AR)
   - One-click language switching

2. **`src/hooks/useLanguage.ts`**
   - Enhanced to keep navbar direction LTR
   - Better localStorage integration

### Modified Files

1. **`src/components/NavBar/AppNavbar.tsx`**

   - Added navbar-container class and LTR style
   - Integrated LanguageToggle component
   - Updated sign in/up buttons to use translations

2. **`src/i18n/index.ts`**

   - Added getInitialLanguage function to load from localStorage
   - Proper initialization with saved language preference
   - Disabled debug logs for production

3. **`src/index.css`**

   - Enhanced RTL CSS support
   - Added navbar-specific LTR enforcement
   - Better direction handling for content vs navbar

4. **`src/App.tsx`**
   - Simplified to use useLanguage hook

## How It Works

### Initial Language Loading

```typescript
const getInitialLanguage = (): string => {
  const savedLanguage = localStorage.getItem("i18nextLng");
  return savedLanguage && ["en", "ar"].includes(savedLanguage)
    ? savedLanguage
    : "en";
};
```

### Toggle Functionality

```typescript
const handleToggle = async () => {
  const newLanguageCode = currentLanguage.code === "en" ? "ar" : "en";
  const newLanguage =
    languages.find((lang) => lang.code === newLanguageCode) || languages[0];
  await changeLanguage(newLanguageCode);
  setCurrentLanguage(newLanguage);
};
```

### Navbar Direction Lock

```css
.navbar-container {
  direction: ltr !important;
}

.navbar-container * {
  direction: ltr !important;
}
```

## Toggle Button Design

- **Flag Icon**: Shows current language flag (🇺🇸 for English, 🇸🇦 for Arabic)
- **Language Code**: Displays "EN" or "AR" next to the flag
- **Border**: Subtle border with hover effects
- **Responsive**: Adapts to different screen sizes

## Language Persistence

- **Automatic Save**: Language choice is automatically saved to localStorage
- **Page Reload**: Language persists across browser sessions
- **Initial Load**: Website starts with previously selected language
- **Fallback**: Defaults to English if no preference is saved

## RTL Content vs LTR Navbar

- **Content Area**: Changes direction based on selected language
- **Navbar**: Always remains LTR for consistency
- **Logo/Icons**: Always positioned correctly regardless of content direction
- **User Actions**: Maintain intuitive left-to-right flow in navbar

## Usage

### In Components

```typescript
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();
  return <div>{t("common.home")}</div>;
}
```

### Custom Language Hook

```typescript
import { useLanguage } from "../hooks/useLanguage";

function MyComponent() {
  const { language, isRTL } = useLanguage();

  return (
    <div className={isRTL ? "rtl-content" : "ltr-content"}>
      Current language: {language}
    </div>
  );
}
```

## Testing

1. Start the development server: `npm run dev`
2. Open http://localhost:5174/
3. Look for the toggle button in the navbar (shows flag + language code)
4. Click the button to switch between English and Arabic
5. Observe:
   - Content direction changes (RTL ↔ LTR)
   - Navbar stays LTR
   - Text translations change
   - Language preference persists on page reload

## Browser Storage

- Language preference: `localStorage.getItem("i18nextLng")`
- Automatic persistence: Handled by i18next
- Initial loading: Custom getInitialLanguage function

## Supported Languages

- **English (EN)**: Left-to-right content, 🇺🇸 flag
- **Arabic (AR)**: Right-to-left content, 🇸🇦 flag

## CSS Classes for RTL Support

The implementation includes comprehensive CSS that automatically adjusts layout for RTL content while keeping the navbar LTR:

- Content area: Responds to document direction
- Navbar: Always LTR with `.navbar-container` class
- Margins/padding: Automatically adjusted for RTL content
- Text alignment: Proper RTL/LTR handling

This implementation provides a clean, simple language switching experience with proper direction handling and persistent user preferences.
