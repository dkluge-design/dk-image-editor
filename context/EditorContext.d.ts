import React, { ReactNode } from 'react';
import { EditorState, Annotation } from '../core/EditorCore';
export interface TextEditingState {
    editingText: {
        id: string;
        x: number;
        y: number;
        rotation?: number;
    } | null;
    editingValue: string;
    editingTextItem: Annotation | null;
}
export interface UIState {
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
export interface EditorContextState {
    editorState: EditorState | null;
    textEditing: TextEditingState;
    uiState: UIState;
    isImageLoading: boolean;
}
export type EditorAction = {
    type: 'SET_EDITOR_STATE';
    payload: EditorState | null;
} | {
    type: 'UPDATE_TEXT_EDITING';
    payload: Partial<TextEditingState>;
} | {
    type: 'UPDATE_UI_STATE';
    payload: Partial<UIState>;
} | {
    type: 'SET_IMAGE_LOADING';
    payload: boolean;
} | {
    type: 'RESET_ALL_STATE';
};
export interface EditorContextType {
    state: EditorContextState;
    dispatch: React.Dispatch<EditorAction>;
    refs: {
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
}
export declare const EditorContext: React.Context<EditorContextType | null>;
interface EditorProviderProps {
    children: ReactNode;
}
export declare const EditorProvider: React.FC<EditorProviderProps>;
export {};
//# sourceMappingURL=EditorContext.d.ts.map