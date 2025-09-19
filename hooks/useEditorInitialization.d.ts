/**
 * 编辑器初始化 Hook
 *
 * 负责编辑器的完整初始化流程：
 * - 创建和配置所有插件
 * - 设置插件间的事件回调
 * - 加载初始图片
 * - 处理组件销毁时的清理工作
 */
import { EditorCore } from '../core/EditorCore';
import { AdvancedFilterPlugin } from '../plugins/AdvancedFilterPlugin';
import { AnnotatePlugin } from '../plugins/AnnotatePlugin';
import { CropPlugin } from '../plugins/CropPlugin';
import { FilterPlugin } from '../plugins/FilterPlugin';
import { FinetunePlugin } from '../plugins/FinetunePlugin';
import { HtmlSelectionPlugin } from '../plugins/HtmlSelectionPlugin';
import { ImagePlugin } from '../plugins/ImagePlugin';
import { StickerPlugin } from '../plugins/StickerPlugin';
interface UseEditorInitializationProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    editorRef: React.MutableRefObject<EditorCore | null>;
    cropPluginRef: React.MutableRefObject<CropPlugin | null>;
    filterPluginRef: React.MutableRefObject<FilterPlugin | null>;
    annotatePluginRef: React.MutableRefObject<AnnotatePlugin | null>;
    stickerPluginRef: React.MutableRefObject<StickerPlugin | null>;
    finetunePluginRef: React.MutableRefObject<FinetunePlugin | null>;
    imagePluginRef: React.MutableRefObject<ImagePlugin | null>;
    selectionPluginRef: React.MutableRefObject<HtmlSelectionPlugin | null>;
    advancedFilterPluginRef: React.MutableRefObject<AdvancedFilterPlugin | null>;
    src?: string | File | Blob;
    zoomLevel: number;
    setEditorState: (state: any) => void;
    setHasSelection: (hasSelection: boolean) => void;
    onImageLoadStart?: () => void;
    onImageLoadEnd?: () => void;
}
export declare const useEditorInitialization: ({ canvasRef, editorRef, cropPluginRef, filterPluginRef, annotatePluginRef, stickerPluginRef, finetunePluginRef, imagePluginRef, selectionPluginRef, advancedFilterPluginRef, src, zoomLevel, setEditorState, setHasSelection, onImageLoadStart, onImageLoadEnd, }: UseEditorInitializationProps) => void;
export {};
//# sourceMappingURL=useEditorInitialization.d.ts.map