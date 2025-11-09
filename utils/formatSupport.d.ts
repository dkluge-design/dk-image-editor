/**
 * 检测浏览器对不同图片格式的支持
 */
export declare class FormatSupport {
    private static supportCache;
    /**
     * 检测浏览器是否支持指定的图片格式
     */
    static isFormatSupported(format: string): Promise<boolean>;
    /**
     * 获取支持的格式列表
     */
    static getSupportedFormats(): Promise<string[]>;
    private static getMimeType;
}
//# sourceMappingURL=formatSupport.d.ts.map