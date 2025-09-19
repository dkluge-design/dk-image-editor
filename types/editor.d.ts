export interface EditorState {
    filter?: string | null;
    crop?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    rotation?: number;
    flipX?: boolean;
    flipY?: boolean;
    scale?: number;
    skewX?: number;
    skewY?: number;
    brightness?: number;
    contrast?: number;
    saturation?: number;
    exposure?: number;
    highlights?: number;
    shadows?: number;
    vibrance?: number;
    warmth?: number;
    tint?: number;
    gamma?: number;
    clarity?: number;
    dehaze?: number;
    vignette?: number;
    frame?: string;
    appliedFilters?: Array<{
        type: string;
        value: number;
    }>;
}
export interface CropPreset {
    ratio?: number;
    name: string;
}
export interface Filter {
    id: string;
    name: string;
}
export interface EditorRef {
    getImageDisplay(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    getState(): EditorState;
    render(): void;
    getImageData(): ImageData | null;
    setImageData(imageData: ImageData): void;
    getOriginalImageSize(): {
        width: number;
        height: number;
    };
    resetToOriginal(): void;
}
//# sourceMappingURL=editor.d.ts.map