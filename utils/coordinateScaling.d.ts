/**
 * 坐标缩放工具函数
 *
 * 当工具切换导致图片显示区域变化时，
 * 需要相应地缩放所有元素的坐标以保持相对位置不变。
 */
interface ImageDisplay {
    x: number;
    y: number;
    width: number;
    height: number;
}
interface ScalableItem {
    x: number;
    y: number;
    width?: number;
    height?: number;
    size?: number;
    fontSize?: number;
    [key: string]: any;
}
export declare const scaleCoordinates: <T extends ScalableItem>(prevDisplay: ImageDisplay, newDisplay: ImageDisplay, items: T[]) => T[];
export declare const scaleEditingText: (prevDisplay: ImageDisplay, newDisplay: ImageDisplay, editingText: {
    id: string;
    x: number;
    y: number;
    rotation?: number;
    [key: string]: any;
} | null) => {
    id: string;
    x: number;
    y: number;
    rotation?: number;
    [key: string]: any;
} | null;
export {};
//# sourceMappingURL=coordinateScaling.d.ts.map