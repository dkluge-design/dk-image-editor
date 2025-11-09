export interface Annotation {
    id: string;
    type: 'rectangle' | 'ellipse' | 'arrow' | 'text' | 'line' | 'sharpie' | 'path';
    x: number;
    y: number;
    color: string;
    strokeWidth: number;
    fontSize?: number;
    width?: number;
    height?: number;
    text?: string;
    fillColor?: string;
    strokeColor?: string;
    points?: Array<{
        x: number;
        y: number;
    }>;
    rotation?: number;
    zIndex?: number;
}
export type AnnotationTool = [string, string];
//# sourceMappingURL=annotation.d.ts.map