import { TextEditingState, UIState } from '../context/EditorContext';
import { EditorState } from '../core/EditorCore';
export declare const useEditorContext: () => import("../context/EditorContext").EditorContextType;
export declare const useEditorState: () => EditorState | null;
export declare const useTextEditing: () => TextEditingState;
export declare const useUIState: () => UIState;
export declare const useImageLoading: () => boolean;
export declare const useEditorActions: () => {
    setEditorState: (payload: EditorState | null) => void;
    updateTextEditing: (payload: Partial<TextEditingState>) => void;
    updateUIState: (payload: Partial<UIState>) => void;
    setImageLoading: (payload: boolean) => void;
    resetAllState: () => void;
};
export declare const useEditorRefs: () => {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    editorRef: React.RefObject<any>;
    cropPluginRef: React.RefObject<any>;
    filterPluginRef: React.RefObject<any>;
    annotatePluginRef: React.RefObject<any>;
    stickerPluginRef: React.RefObject<any>;
    finetunePluginRef: React.RefObject<any>;
    imagePluginRef: React.RefObject<any>;
    selectionPluginRef: React.RefObject<any>;
    advancedFilterPluginRef: React.RefObject<any>;
};
//# sourceMappingURL=useEditorContext.d.ts.map