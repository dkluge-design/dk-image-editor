import React from 'react';
import { EditorRef } from '../../types/editor';
interface StickerPanelProps {
    editorRef: React.RefObject<EditorRef>;
    stickerPluginRef: React.RefObject<any>;
    selectionPluginRef: React.RefObject<any>;
    imagePluginRef: React.RefObject<any>;
    zoomLevel: number;
    setHasSelection: (hasSelection: boolean) => void;
    currentSticker: {
        content: string;
        type: 'emoji' | 'image';
    } | null;
    setCurrentSticker: (sticker: {
        content: string;
        type: 'emoji' | 'image';
    } | null) => void;
}
export declare const StickerPanel: React.FC<StickerPanelProps>;
export {};
//# sourceMappingURL=StickerPanel.d.ts.map