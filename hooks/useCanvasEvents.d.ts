/**
 * Canvas 事件处理 Hook
 *
 * 封装所有 Canvas 相关的鼠标事件处理逻辑：
 * - 鼠标坐标转换（屏幕坐标 -> Canvas 坐标）
 * - 不同工具的鼠标交互逻辑
 * - 元素选中和拖拽处理
 * - 文本编辑模式切换
 */
interface UseCanvasEventsProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    activeTool: string;
    currentAnnotation: any;
    currentSticker: {
        content: string;
        type: 'emoji' | 'image';
    } | null;
    editorRef: React.MutableRefObject<any>;
    cropPluginRef: React.MutableRefObject<any>;
    annotatePluginRef: React.MutableRefObject<any>;
    stickerPluginRef: React.MutableRefObject<any>;
    selectionPluginRef: React.MutableRefObject<any>;
    setHasSelection: (hasSelection: boolean) => void;
    setEditingText: (text: any) => void;
    setEditingValue: (value: string) => void;
    setEditingTextItem: (item: any) => void;
    setActiveTool: (tool: string) => void;
}
export declare const useCanvasEvents: ({ canvasRef, activeTool, currentAnnotation, currentSticker, editorRef, cropPluginRef, annotatePluginRef, stickerPluginRef, selectionPluginRef, setHasSelection, setEditingText, setEditingValue, setEditingTextItem, setActiveTool, }: UseCanvasEventsProps) => {
    handleCanvasMouseDown: (e: React.MouseEvent | React.TouchEvent) => void;
    handleCanvasMouseMove: (e: React.MouseEvent | React.TouchEvent) => void;
    handleCanvasMouseUp: () => void;
    handleCanvasDoubleClick: (e: React.MouseEvent | React.TouchEvent) => void;
    handleCanvasTouchStart: (e: React.MouseEvent | React.TouchEvent) => void;
    handleCanvasTouchMove: (e: React.MouseEvent | React.TouchEvent) => void;
    handleCanvasTouchEnd: () => void;
};
export {};
//# sourceMappingURL=useCanvasEvents.d.ts.map