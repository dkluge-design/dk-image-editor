export type ColorSpace = 'srgb' | 'display-p3' | 'rec2020';
export declare class ColorSpaceManager {
    private static supportedColorSpaces;
    static initialize(): Promise<void>;
    private static detectSupportedColorSpaces;
    static isSupported(colorSpace: ColorSpace): boolean;
    static getBestColorSpace(preferred?: ColorSpace): ColorSpace;
    static createCanvas(width: number, height: number, colorSpace?: ColorSpace): HTMLCanvasElement;
    static getContext(canvas: HTMLCanvasElement, colorSpace?: ColorSpace): CanvasRenderingContext2D;
    static convertColorSpace(imageData: ImageData, from: ColorSpace, to: ColorSpace): ImageData;
}
//# sourceMappingURL=ColorSpaceManager.d.ts.map