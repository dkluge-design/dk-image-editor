import { EditorPlugin } from '../core/EditorCore';
export declare class FinetunePlugin implements EditorPlugin {
    name: string;
    private canvas;
    private ctx;
    init(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void;
    applyAdjustments(imageData: ImageData, adjustments: {
        brightness?: number;
        contrast?: number;
        saturation?: number;
        exposure?: number;
        gamma?: number;
        vignette?: number;
    }): ImageData;
    private applyBrightness;
    private applyContrast;
    private applySaturation;
    private applyExposure;
    private applyGamma;
    private applyVignette;
    initialize(editor: any): void;
    destroy(): void;
}
//# sourceMappingURL=FinetunePlugin.d.ts.map