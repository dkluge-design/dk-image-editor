import React from 'react';
import { Annotation } from '../core/EditorCore';
interface TextAnnotation extends Annotation {
    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;
}
interface TextEditorProps {
    editingText: {
        id: string;
        x: number;
        y: number;
        rotation?: number;
    } | null;
    editingValue: string;
    editingTextItem?: TextAnnotation | null;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    zoomLevel: number;
    onValueChange: (value: string) => void;
    onBlur: () => void;
}
declare const TextEditor: React.FC<TextEditorProps>;
export default TextEditor;
//# sourceMappingURL=TextEditor.d.ts.map