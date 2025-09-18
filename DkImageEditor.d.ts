/**
 * DkImageEditor - 图片编辑器主组件
 *
 * 经过重构优化的图片编辑器，采用模块化架构：
 * - 使用自定义 Hooks 管理复杂逻辑
 * - 提取独立组件处理 UI 渲染
 * - 统一状态管理和事件处理
 */
import React from 'react';
import { EditorState } from './core/EditorCore';
import './styles/DkImageEditor.scss';
import './styles/frame-panel.css';
import { Language, Translations } from './i18n';
export interface DkImageEditorProps {
    src?: string | File | Blob;
    onSave?: (result: {
        src: string;
        dest: File;
        imageState: EditorState;
    }) => void;
    onClose?: () => void;
    onConfirm?: (result: {
        src: string;
        dest: File;
        imageState: EditorState;
        canvas: HTMLCanvasElement;
    }) => void;
    className?: string;
    utils?: string[];
    cropSelectPresetOptions?: Array<[number | undefined, string]>;
    annotateTools?: Array<[string, string]>;
    stickerEnableSelectImagePreset?: boolean;
    filterOptions?: Array<[string, string]>;
    finetuneOptions?: Array<[string, string]>;
    language?: Language;
    translations?: Translations;
    showCloseButton?: boolean;
    showDownloadButton?: boolean;
}
declare const DkImageEditor: React.FC<DkImageEditorProps>;
export default DkImageEditor;
//# sourceMappingURL=DkImageEditor.d.ts.map