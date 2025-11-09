/**
 * 编辑器状态管理 Hook
 *
 * 统一管理编辑器的所有状态：
 * - textEditing: 文本编辑相关状态
 * - uiState: UI 界面状态（工具、选中、缩放等）
 * - editorState: 编辑器核心状态
 */
import { Annotation, EditorState } from '../core/EditorCore';
interface TextPosition {
    id: string;
    x: number;
    y: number;
    rotation?: number;
}
interface TextEditingState {
    editingText: TextPosition | null;
    editingValue: string;
    editingTextItem: Annotation | null;
}
interface EditorUIState {
    activeTool: string;
    isVisible: boolean;
    hasSelection: boolean;
    selectedFinetuneOption: string;
    lastAnnotateColor: string;
    zoomLevel: number;
    currentAnnotation: Partial<Annotation> | null;
    currentSticker: {
        content: string;
        type: 'emoji' | 'image';
    } | null;
}
export declare const useEditorState: () => {
    editorState: EditorState | null;
    setEditorState: import("react").Dispatch<import("react").SetStateAction<EditorState | null>>;
    textEditing: TextEditingState;
    setTextEditing: import("react").Dispatch<import("react").SetStateAction<TextEditingState>>;
    uiState: EditorUIState;
    setUIState: import("react").Dispatch<import("react").SetStateAction<EditorUIState>>;
};
export {};
//# sourceMappingURL=useEditorState.d.ts.map