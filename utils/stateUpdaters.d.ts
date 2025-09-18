/**
 * 状态更新工具函数
 *
 * 提供简洁的状态更新接口，减少重复代码
 */
type StateUpdater<T> = (updater: (prev: T) => T) => void;
export declare const createStateUpdaters: <UI, Text>(setUIState: StateUpdater<UI>, setTextEditing: StateUpdater<Text>) => {
    updateUI: (updates: Partial<UI>) => void;
    updateTextEditing: (updates: Partial<Text>) => void;
};
export {};
//# sourceMappingURL=stateUpdaters.d.ts.map