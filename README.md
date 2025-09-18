# @dkluge/image-editor

A powerful React image editor component with crop, filter, annotate, and sticker features.

## Installation

```bash
npm install @dkluge/image-editor
# or
yarn add @dkluge/image-editor
```

## Quick Start

```jsx
import React from 'react'
import { DkImageEditor } from '@dkluge/image-editor'
import '@dkluge/image-editor/dist/index.css'

function App() {
  return (
    <DkImageEditor
      src="/path/to/your/image.jpg"
      onSave={(editedImageBlob) => {
        console.log('Edited image:', editedImageBlob)
      }}
    />
  )
}

export default App
```

## Features

- 🖼️ **Image Cropping** - Precise crop with aspect ratio controls
- 🎨 **Filters** - Professional photo filters and effects
- ✏️ **Annotations** - Draw, text, shapes, and arrows
- 🏷️ **Stickers** - Add fun stickers and emojis
- 🖌️ **Fine-tuning** - Brightness, contrast, saturation adjustments
- 🖼️ **Frames** - Beautiful photo frames
- 🌍 **i18n Support** - Multi-language support
- 📱 **Responsive** - Works on desktop and mobile

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL |
| `onSave` | `(blob: Blob) => void` | - | Callback when image is saved |
| `onCancel` | `() => void` | - | Callback when editor is cancelled |
| `tools` | `string[]` | `['crop', 'filter', 'finetune', 'annotate', 'sticker', 'frame']` | Available tools |
| `theme` | `'light' \| 'dark'` | `'light'` | Editor theme |
| `locale` | `string` | `'en'` | Language locale |

## Examples

### Basic Usage

```jsx
<DkImageEditor
  src="/image.jpg"
  onSave={(blob) => {
    // Handle the edited image
    const url = URL.createObjectURL(blob)
    console.log('Download URL:', url)
  }}
/>
```

### Custom Tools

```jsx
<DkImageEditor
  src="/image.jpg"
  tools={['crop', 'filter', 'annotate']}
  onSave={(blob) => console.log(blob)}
/>
```

### Dark Theme

```jsx
<DkImageEditor
  src="/image.jpg"
  theme="dark"
  onSave={(blob) => console.log(blob)}
/>
```

### Internationalization

```jsx
<DkImageEditor
  src="/image.jpg"
  locale="zh-CN"
  onSave={(blob) => console.log(blob)}
/>
```

## Supported Languages

- English (en)
- 中文 (zh-CN)
- 日本語 (ja)
- 한국어 (ko)
- Español (es)
- Français (fr)
- Deutsch (de)
- Italiano (it)
- Português (pt)
- Русский (ru)

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT © DKLuge Team

## Support

- 📧 Email: support@dkluge.com
- 🐛 Issues: [GitHub Issues](https://github.com/bluebellx7/dk-image-editor/issues)
- 📖 Documentation: [GitHub Wiki](https://github.com/bluebellx7/dk-image-editor/wiki)