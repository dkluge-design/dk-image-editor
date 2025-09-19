import React from 'react';
import '../../styles/frame-panel.css';
import { EditorRef, EditorState } from '../../types/editor';
interface FramePanelProps {
    editorState: EditorState;
    editorRef: React.RefObject<EditorRef>;
    onStateChange: (updates: Partial<EditorState>) => void;
}
export declare const FramePanel: React.FC<FramePanelProps>;
export {};
//# sourceMappingURL=FramePanel.d.ts.map