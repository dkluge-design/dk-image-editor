import { EditorCore, EditorPlugin } from '../core/EditorCore';
export declare class CropPlugin implements EditorPlugin {
    name: string;
    private editor;
    private isDragging;
    private dragMode;
    private dragStart;
    private initialCrop;
    private initialAspectRatio;
    private _isActive;
    private isShiftPressed;
    initialize(editor: EditorCore): void;
    setActive(active: boolean): void;
    get isActive(): boolean;
    private getTransformedBounds;
    render(ctx: CanvasRenderingContext2D): void;
    private drawCropOverlay;
    handleMouseDown(event: any): void;
    handleMouseMove(event: any): void;
    handleMouseUp(): void;
    private handleKeyDown;
    private handleKeyUp;
    destroy(): void;
}
//# sourceMappingURL=CropPlugin.d.ts.map