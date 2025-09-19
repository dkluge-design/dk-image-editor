export interface ExifData {
    orientation?: number;
    make?: string;
    model?: string;
    dateTime?: string;
    [key: string]: any;
}
export declare class ExifProcessor {
    static readExif(file: File): Promise<ExifData>;
    private static parseExifSegment;
    private static parseIFD;
    private static readString;
    static getOrientationTransform(orientation?: number): string;
}
//# sourceMappingURL=ExifProcessor.d.ts.map