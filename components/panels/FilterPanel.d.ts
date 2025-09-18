import React from 'react';
import '../../styles/filter-preview.css';
import { EditorRef, EditorState, Filter } from '../../types/editor';
interface FilterPanelProps {
    editorState: EditorState;
    filters: Filter[];
    editorRef: React.RefObject<EditorRef>;
    filterCounts: Record<string, number>;
    onStateChange: (updates: Partial<EditorState>) => void;
    setFilterCounts: (counts: Record<string, number>) => void;
    applyAdvancedFilter: (imageData: ImageData, filterType: string) => Promise<ImageData>;
}
export declare const FilterPanel: React.FC<FilterPanelProps>;
export {};
//# sourceMappingURL=FilterPanel.d.ts.map