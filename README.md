# @dkluge/image-editor

[![npm version](https://badge.fury.io/js/@dkluge%2Fimage-editor.svg)](https://badge.fury.io/js/@dkluge%2Fimage-editor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A powerful, feature-rich React image editor component with comprehensive editing capabilities.

## ✨ Features

- 🖼️ **Image Editing**: Crop, rotate, flip, and resize images
- 🎨 **Filters**: 15+ built-in filters (vintage, dramatic, artistic, etc.)
- ✏️ **Annotations**: Draw, add shapes, text, and arrows
- 🏷️ **Stickers**: Emoji stickers and custom image uploads
- 🎛️ **Fine-tuning**: Brightness, contrast, saturation, exposure, gamma, vignette
- 🖼️ **Frames**: 10+ decorative frame styles
- 🌍 **Internationalization**: Built-in support for multiple languages
- 📱 **Responsive**: Optimized for desktop and mobile devices
- 🔧 **Customizable**: Configurable tools, presets, and styling
- ⚡ **Performance**: Optimized canvas rendering and memory management
- 🎯 **TypeScript**: Full type safety and IntelliSense support

## 📦 Installation

```bash
npm install @dkluge/image-editor
# or
yarn add @dkluge/image-editor
# or
pnpm add @dkluge/image-editor
```

## 🚀 Quick Start

```tsx
import React from 'react'
import { DkImageEditor } from '@dkluge/image-editor'
import '@dkluge/image-editor/dist/index.css'

function App() {
  const handleSave = (result) => {
    console.log('Saved image:', result)
    // result.src - Blob URL of edited image
    // result.dest - File object for download
    // result.imageState - Current editor state
  }

  const handleClose = () => {
    console.log('Editor closed')
  }

  return (
    <DkImageEditor
      src="https://example.com/image.jpg" // URL, File, or Blob
      language="en" // 'en' | 'zh' | custom
      onSave={handleSave}
      onClose={handleClose}
      utils={['crop', 'filter', 'annotate', 'sticker', 'finetune', 'frame']}
    />
  )
}

export default App
```

## 🌍 Internationalization

```tsx
// Built-in language support
<DkImageEditor language="zh" /> // Chinese
<DkImageEditor language="en" /> // English

// Custom translations - 只需要覆盖特定的键值，其他会使用默认翻译
const customTranslations = {
  en: { 
    'header.upload': 'Choose Photo',  // 覆盖默认翻译
    'header.download': 'Export Image' // 覆盖默认翻译
    // 其他键值会使用默认的英文翻译
  },
  zh: { 
    'header.upload': '选择照片'  // 覆盖默认中文翻译
    // 其他键值会使用默认的中文翻译
  },
  ja: { 
    // 添加新语言支持
    'header.upload': '画像をアップロード',
    'header.download': 'ダウンロード',
    'tool.crop': 'クロップ'
  }
}

<DkImageEditor 
  language="ja" 
  translations={customTranslations} 
/>
```

## 🎨 Customization Examples

```tsx
// Custom tool selection
<DkImageEditor
  utils={['crop', 'filter', 'annotate']} // Only show specific tools
  cropSelectPresetOptions={[
    [undefined, 'Original'],
    [1, 'Square'],
    [16/9, 'Widescreen'],
    [9/16, 'Portrait']
  ]}
  filterOptions={[
    ['vintage', 'Vintage'],
    ['dramatic', 'Dramatic'],
    ['vivid', 'Vivid']
  ]}
/>
```

## 📚 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string \| File \| Blob` | **Required** | Image source (URL, File object, or Blob) |
| `onSave` | `(result: SaveResult) => void` | **Required** | Callback when user saves the edited image |
| `onClose` | `() => void` | **Required** | Callback when user closes the editor |
| `language` | `'en' \| 'zh' \| string` | `'en'` | Interface language |
| `translations` | `Translations` | - | Custom translation object |
| `className` | `string` | `''` | Additional CSS class name |
| `utils` | `string[]` | `['select', 'crop', 'filter', 'annotate', 'sticker', 'finetune', 'frame']` | Available editing tools |
| `cropSelectPresetOptions` | `Array<[number \| undefined, string]>` | Default presets | Custom crop aspect ratio presets |
| `annotateTools` | `Array<[string, string]>` | Default tools | Custom annotation tools |
| `filterOptions` | `Array<[string, string]>` | Default filters | Custom filter options |
| `finetuneOptions` | `Array<[string, string]>` | Default options | Custom fine-tune controls |

### SaveResult Object

```typescript
interface SaveResult {
  src: string        // Blob URL of the edited image
  dest: File         // File object ready for download/upload
  imageState: object // Complete editor state for restoration
}
```

### Available Tools

- `select` - Selection and manipulation tool
- `crop` - Crop and rotate functionality
- `filter` - Image filters and effects
- `annotate` - Drawing, shapes, and text
- `sticker` - Emoji and image stickers
- `finetune` - Color and exposure adjustments
- `frame` - Decorative borders and frames

## 🎯 Examples

Check out the [example directory](./example) for comprehensive usage examples:

- **Basic Usage** - Simple implementation
- **Internationalization** - Multi-language support
- **Custom Tools** - Tool customization
- **File Upload** - File handling patterns

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and TypeScript
- Canvas-based image processing
- Inspired by modern image editing tools

---

**Made with ❤️ by the DKLuge Team**