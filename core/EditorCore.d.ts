interface Point {
    x: number;
    y: number;
}
interface Size {
    width: number;
    height: number;
}
interface Position {
    x: number;
    y: number;
}
interface CanvasState {
    canvasRotation?: number;
    canvasFlipX?: boolean;
    canvasFlipY?: boolean;
    canvasScale?: number;
    canvasSkewX?: number;
    canvasSkewY?: number;
}
export interface EditorPlugin {
    name: string;
    init?: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;
    initialize?: (editor: EditorCore) => void;
    render?: (ctx: CanvasRenderingContext2D) => void;
    destroy: () => void;
    updateStickers?: (stickers: Sticker[]) => void;
    updateAnnotations?: (annotations: Annotation[]) => void;
}
export interface CropState extends Position, Size {
}
export interface EditorState {
    crop: CropState;
    rotation: number;
    flipX: boolean;
    flipY: boolean;
    scale: number;
    skewX: number;
    skewY: number;
    brightness: number;
    contrast: number;
    saturation: number;
    exposure: number;
    gamma: number;
    vignette: number;
    filter: string;
    appliedFilters: Array<{
        type: string;
        value: number;
    }>;
    annotations: Annotation[];
    stickers: Sticker[];
    images: ImageItem[];
    backgroundColor: string;
    frame: string;
    filterCounts: Record<string, number>;
    targetSize?: Size;
}
interface BaseItem extends Position, CanvasState {
    id: string;
    rotation: number;
    zIndex: number;
    opacity: number;
    flipX: boolean;
    flipY: boolean;
}
export interface ImageItem extends BaseItem, Size {
    type: 'image';
    image: HTMLImageElement;
}
export interface Annotation extends BaseItem {
    type: 'text' | 'rectangle' | 'ellipse' | 'line' | 'arrow' | 'path' | 'sharpie';
    width?: number;
    height?: number;
    text?: string;
    color: string;
    strokeWidth: number;
    fontSize?: number;
    points?: Point[];
    fillColor?: string;
    strokeColor?: string;
}
export interface Sticker extends BaseItem {
    sticker: 1 | 0;
    type: 'emoji' | 'image';
    content: string;
    size: number;
    image?: HTMLImageElement;
}
export declare class EditorCore {
    private canvas;
    private ctx;
    private image;
    private originalImage;
    private imageDisplay;
    private state;
    private history;
    private historyIndex;
    private plugins;
    private eventListeners;
    private resizeObserver;
    constructor(canvas: HTMLCanvasElement);
    private isSticker;
    private setupCanvasResize;
    private updateCanvasSize;
    private calculateImageDisplay;
    private getInitialState;
    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;
    emit(event: string, data?: any): void;
    addPlugin(plugin: EditorPlugin): void;
    removePlugin(name: string): void;
    getState(): EditorState;
    getImageDisplay(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    getOriginalImageSize(): Size;
    setState(updates: Partial<EditorState>, saveToHistory?: boolean): void;
    private saveToHistory;
    private restoreState;
    undo(): void;
    redo(): void;
    loadImage(src: string | File | Blob): Promise<void>;
    render(): void;
    private applyFiltersToContext;
    private applyFilters;
    private applyVignette;
    private drawAnnotation;
    private applyRotation;
    private drawAnnotationShape;
    private drawText;
    private drawTextDecoration;
    private drawRectangle;
    private drawEllipse;
    private drawLine;
    private drawArrow;
    private drawPath;
    private drawImage;
    private drawSticker;
    private drawFrame;
    getImageData(): ImageData | null;
    resetToOriginal(): void;
    setImageData(imageData: ImageData): void;
    export(format?: 'blob' | 'dataURL', customWidth?: number, customHeight?: number, imageFormat?: 'png' | 'jpg' | 'webp' | 'avif' | 'heic'): Promise<Blob | string>;
    private renderToExportCanvas;
    private drawStickerToExport;
    private drawImageToExport;
    private drawAnnotationToExport;
    private drawFrameToExport;
    private applyVignetteToExport;
    private getAllItems;
    moveToFront(itemId: string): void;
    moveToBack(itemId: string): void;
    moveForward(itemId: string): void;
    moveBackward(itemId: string): void;
    private updateItemZIndex;
    recalculateImageDisplay(): void;
    private getMimeType;
    destroy(): void;
    private applyCanvasTransformForItem;
    private applyCanvasTransformForItemToExport;
}
export {};
//# sourceMappingURL=EditorCore.d.ts.map