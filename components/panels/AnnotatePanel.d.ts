import React from 'react';
import { Annotation, AnnotationTool } from '../../types/annotation';
interface AnnotatePanelProps {
    currentAnnotation: Annotation | null;
    lastAnnotateColor: string;
    annotateTools: AnnotationTool[];
    setCurrentAnnotation: (annotation: Annotation) => void;
    setLastAnnotateColor: (color: string) => void;
}
export declare const AnnotatePanel: React.FC<AnnotatePanelProps>;
export {};
//# sourceMappingURL=AnnotatePanel.d.ts.map