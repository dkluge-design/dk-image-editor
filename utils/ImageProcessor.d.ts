export declare class ImageProcessor {
    static loadImageFromFile(file: File): Promise<HTMLImageElement>;
    static getImageData(source: HTMLImageElement | HTMLCanvasElement): Promise<ImageData>;
    static createCanvasFromImageData(imageData: ImageData): HTMLCanvasElement;
    static canvasToBlob(canvas: HTMLCanvasElement, type?: string, quality?: number): Promise<Blob>;
}
//# sourceMappingURL=ImageProcessor.d.ts.map