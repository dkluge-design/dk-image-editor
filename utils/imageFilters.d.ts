/**
 * 图像滤镜工具函数
 *
 * 统一处理各种图像滤镜效果
 */
export type FilterType = 'chrome' | 'fade' | 'cold' | 'warm' | 'mono' | 'sepia';
/**
 * 应用滤镜到图像数据
 */
export declare const applyFilter: (imageData: ImageData, filterType: FilterType) => ImageData;
//# sourceMappingURL=imageFilters.d.ts.map