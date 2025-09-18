import React from 'react';
interface EditorHeaderProps {
    onClose: () => void;
    onConfirm?: () => void;
    onUndo: () => void;
    onRedo: () => void;
    onSave: () => void;
    onUpload?: (file: File) => void;
    showCloseButton?: boolean;
    showDownloadButton?: boolean;
}
declare const EditorHeader: React.FC<EditorHeaderProps>;
export default EditorHeader;
//# sourceMappingURL=EditorHeader.d.ts.map