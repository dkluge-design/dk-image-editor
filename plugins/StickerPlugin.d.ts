import { EditorPlugin } from '../core/EditorCore';
export interface Sticker {
    id: string;
    type: 'emoji' | 'image';
    content: string;
    x: number;
    y: number;
    size: number;
    rotation: number;
    image?: HTMLImageElement;
}
export declare class StickerPlugin implements EditorPlugin {
    name: string;
    private editor;
    private canvasScale;
    initialize(editor: any): void;
    setCanvasScale(scale: number): void;
    addSticker(sticker: Sticker): void;
    handleMouseDown(event: MouseEvent): void;
    handleMouseMove(event: MouseEvent): void;
    handleMouseUp(): void;
    render(ctx: CanvasRenderingContext2D): void;
    updateStickers(stickers: Sticker[]): void;
    deleteSelected(): void;
    destroy(): void;
}
//# sourceMappingURL=StickerPlugin.d.ts.map