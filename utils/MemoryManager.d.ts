export interface MemoryLimits {
    maxCanvasSize: number;
    maxImageSize: number;
    maxMemoryUsage: number;
}
export declare class MemoryManager {
    private static limits;
    private static memoryUsage;
    private static canvasPool;
    static setLimits(limits: Partial<MemoryLimits>): void;
    static checkImageSize(width: number, height: number): boolean;
    static calculateOptimalSize(width: number, height: number): {
        width: number;
        height: number;
    };
    static processLargeImage(imageData: ImageData, processor: (chunk: ImageData) => ImageData, chunkSize?: number): Promise<ImageData>;
    private static extractChunk;
    private static insertChunk;
    static getCanvas(width: number, height: number): HTMLCanvasElement;
    static releaseCanvas(canvas: HTMLCanvasElement): void;
    static getMemoryUsage(): number;
    static isMemoryAvailable(additionalBytes: number): boolean;
    static cleanup(): void;
}
//# sourceMappingURL=MemoryManager.d.ts.map