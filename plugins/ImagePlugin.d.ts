import { EditorPlugin } from '../core/EditorCore';
export interface ImageItem {
    id: string;
    type: 'image';
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    zIndex?: number;
    image: HTMLImageElement;
}
export declare class ImagePlugin implements EditorPlugin {
    name: string;
    private editor;
    private onImageComplete?;
    initialize(editor: any): void;
    setImageCompleteCallback(callback: (image: ImageItem) => void): void;
    addImageFromFile(file: File | string): Promise<void>;
    addImageFromClipboard(clipboardData: DataTransfer): Promise<void>;
    handleMouseDown(event: any): void;
    handleMouseMove(event: any): void;
    handleMouseUp(): void;
    render(ctx: CanvasRenderingContext2D): void;
    destroy(): void;
}
//# sourceMappingURL=ImagePlugin.d.ts.map