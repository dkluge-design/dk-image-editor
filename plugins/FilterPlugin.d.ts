import { EditorPlugin } from '../core/EditorCore';
export declare class FilterPlugin implements EditorPlugin {
    name: string;
    private canvas;
    private ctx;
    init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void;
    applyFilter(imageData: ImageData, filterType: string): ImageData;
    initialize(editor: any): void;
    destroy(): void;
}
//# sourceMappingURL=FilterPlugin.d.ts.map