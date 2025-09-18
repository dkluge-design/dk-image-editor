import { Annotation } from '../types/annotation';
export declare const useAnnotation: (initialColor?: string) => {
    currentAnnotation: Annotation | null;
    lastAnnotateColor: string;
    setCurrentAnnotation: (annotation: Annotation) => void;
    setLastAnnotateColor: (color: string) => void;
    resetAnnotation: () => void;
    DEFAULT_STROKE_WIDTH: 2;
    DEFAULT_FONT_SIZE: 24;
};
//# sourceMappingURL=useAnnotation.d.ts.map