import React from 'react';
interface EditorCanvasProps {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onDoubleClick: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    onTouchMove?: (e: React.TouchEvent) => void;
    onTouchEnd?: () => void;
}
declare const EditorCanvas: React.FC<EditorCanvasProps>;
export default EditorCanvas;
//# sourceMappingURL=EditorCanvas.d.ts.map