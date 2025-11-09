/**
 * 工具切换处理 Hook
 *
 * 处理工具切换时的所有逻辑：
 * - 插件状态更新
 * - 坐标缩放处理
 * - 编辑状态同步
 */
interface UseToolSwitchingProps {
    activeTool: string;
    editingText: any;
    editingTextItem: any;
    editorRef: React.MutableRefObject<any>;
    cropPluginRef: React.MutableRefObject<any>;
    selectionPluginRef: React.MutableRefObject<any>;
    updateTextEditing: (updates: any) => void;
}
export declare const useToolSwitching: ({ activeTool, editingText, editingTextItem, editorRef, cropPluginRef, selectionPluginRef, updateTextEditing, }: UseToolSwitchingProps) => void;
export {};
//# sourceMappingURL=useToolSwitching.d.ts.map