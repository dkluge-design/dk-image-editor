import { EditorPlugin } from '../core/EditorCore';
export declare class AdvancedFilterPlugin implements EditorPlugin {
    name: string;
    private canvas;
    private ctx;
    init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void;
    applyAdvancedFilter(imageData: ImageData, filterType: string, options?: any): Promise<ImageData>;
    private applyFilterChunked;
    private applyFilterDirect;
    private applyGaussianBlur;
    private applyHorizontalBlur;
    private applyVerticalBlur;
    private applySharpen;
    private applyEmboss;
    private applyEdgeDetection;
    private applyOilPainting;
    private applyVintage;
    private applyCrossProcess;
    private applyLomo;
    private createGaussianKernel;
    private applyConvolution;
    initialize(editor: any): void;
    destroy(): void;
}
//# sourceMappingURL=AdvancedFilterPlugin.d.ts.map