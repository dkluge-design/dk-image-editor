import React from 'react';
import { Annotation } from '../core/EditorCore';
interface TextAnnotation extends Annotation {
    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;
}
interface FloatingToolbarProps {
    visible: boolean;
    editingText: {
        id: string;
    } | null;
    editingTextItem: TextAnnotation | null;
    selectionPluginRef: React.RefObject<any>;
    onDelete: () => void;
    onCopy: () => void;
    onMoveToFront: () => void;
    onMoveToBack: () => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onTextItemChange: (item: TextAnnotation) => void;
}
declare const FloatingToolbar: React.FC<FloatingToolbarProps>;
export default FloatingToolbar;
//# sourceMappingURL=FloatingToolbar.d.ts.map