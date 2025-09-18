/**
 * 键盘快捷键 Hook
 *
 * 处理所有键盘快捷键操作：
 * - Ctrl+Z / Cmd+Z: 撤销
 * - Ctrl+Y / Cmd+Shift+Z: 重做
 * - Delete / Backspace: 删除选中元素
 * - Ctrl+V / Cmd+V: 粘贴图片
 */
interface UseKeyboardShortcutsProps {
    onUndo: () => void;
    onRedo: () => void;
    selectionPluginRef: React.MutableRefObject<any>;
    imagePluginRef: React.MutableRefObject<any>;
    setHasSelection: (hasSelection: boolean) => void;
}
export declare const useKeyboardShortcuts: ({ onUndo, onRedo, selectionPluginRef, imagePluginRef, setHasSelection, }: UseKeyboardShortcutsProps) => void;
export {};
//# sourceMappingURL=useKeyboardShortcuts.d.ts.map