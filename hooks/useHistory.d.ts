export declare const useHistory: <T>(initialState: T, maxHistorySize?: number) => {
    state: T;
    set: (newPresent: T) => void;
    reset: (newState: T) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
};
//# sourceMappingURL=useHistory.d.ts.map