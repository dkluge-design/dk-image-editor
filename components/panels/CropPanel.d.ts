import React from 'react';
import { EditorState, CropPreset, EditorRef } from '../../types/editor';
interface CropPanelProps {
    editorState: EditorState;
    cropPresets: CropPreset[];
    editorRef: React.RefObject<EditorRef>;
    onStateChange: (updates: Partial<EditorState>) => void;
}
export declare const CropPanel: React.FC<CropPanelProps>;
export {};
//# sourceMappingURL=CropPanel.d.ts.map