/**
 * 像素处理工具函数
 *
 * 统一处理像素级别的图像操作
 */
/**
 * 安全的像素值设置，确保在 0-255 范围内
 */
export declare const clampPixel: (value: number) => number;
/**
 * 批量处理像素数据
 */
export declare const processPixelData: (data: Uint8ClampedArray, processor: (r: number, g: number, b: number, a: number, index: number) => [number, number, number, number]) => void;
/**
 * 应用卷积核
 */
export declare const applyConvolution: (data: Uint8ClampedArray, width: number, height: number, kernel: number[], kernelSize: number) => void;
//# sourceMappingURL=pixelUtils.d.ts.map