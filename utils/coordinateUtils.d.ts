/**
 * 坐标转换工具函数
 *
 * 统一处理鼠标坐标到画布坐标的转换
 */
export interface MouseEvent {
    clientX: number;
    clientY: number;
}
export interface CanvasCoordinates {
    x: number;
    y: number;
}
/**
 * 将鼠标坐标转换为画布坐标
 */
export declare const mouseToCanvas: (event: MouseEvent, canvas: HTMLCanvasElement) => CanvasCoordinates;
/**
 * 检查点是否在矩形区域内
 */
export declare const isPointInRect: (point: CanvasCoordinates, rect: {
    x: number;
    y: number;
    width: number;
    height: number;
}) => boolean;
/**
 * 生成唯一ID
 */
export declare const generateId: () => string;
//# sourceMappingURL=coordinateUtils.d.ts.map