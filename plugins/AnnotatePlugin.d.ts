import { Annotation, EditorPlugin } from '../core/EditorCore';
export declare class AnnotatePlugin implements EditorPlugin {
    name: string;
    private editor;
    private isDrawing;
    private currentAnnotation;
    private onAnnotationComplete?;
    private canvasScale;
    initialize(editor: any): void;
    setAnnotationCompleteCallback(callback: (annotation: Annotation) => void): void;
    setCanvasScale(scale: number): void;
    handleMouseDown(event: any, currentTool: string, toolSettings: any): void;
    handleMouseMove(event: any): void;
    handleMouseUp(): void;
    render(ctx: CanvasRenderingContext2D): void;
    private renderAnnotation;
    private drawArrow;
    updateAnnotations(annotations: Annotation[]): void;
    destroy(): void;
}
//# sourceMappingURL=AnnotatePlugin.d.ts.map