import React from 'react';
import { EditorRef, EditorState } from '../../types/editor';
interface FinetunePanelProps {
    editorState: EditorState;
    selectedFinetuneOption: string;
    finetuneOptions: Array<[string, string]>;
    editorRef: React.RefObject<EditorRef>;
    onStateChange: (updates: Partial<EditorState>) => void;
    setSelectedFinetuneOption: (option: string) => void;
}
export declare const FinetunePanel: React.FC<FinetunePanelProps>;
export {};
//# sourceMappingURL=FinetunePanel.d.ts.map