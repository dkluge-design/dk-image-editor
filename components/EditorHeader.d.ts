import React from 'react';
export type ExportFormat = 'png' | 'jpg' | 'webp' | 'avif' | 'heic';
interface EditorHeaderProps {
    onClose: () => void;
    onConfirm?: () => void;
    onUndo: () => void;
    onRedo: () => void;
    onSave: (format?: ExportFormat) => void;
    onUpload?: (file: File) => void;
    showConfirmButton?: boolean;
    showCloseButton?: boolean;
    showDownloadButton?: boolean;
}
declare const EditorHeader: React.FC<EditorHeaderProps>;
export default EditorHeader;
//# sourceMappingURL=EditorHeader.d.ts.map