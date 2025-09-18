import React from 'react';
import { EditorState } from '../core/EditorCore';
interface CropPreset {
    ratio?: number;
    name: string;
}
interface Filter {
    id: string;
    name: string;
}
interface ControlPanelsProps {
    cropPresets: CropPreset[];
    filters: Filter[];
    annotateTools: Array<[string, string]>;
    finetuneOptions: Array<[string, string]>;
    onStateChange: (updates: Partial<EditorState>) => void;
    applyAdvancedFilter: (imageData: ImageData, filterType: string) => Promise<ImageData>;
}
declare const ControlPanels: React.FC<ControlPanelsProps>;
export default ControlPanels;
//# sourceMappingURL=ControlPanels.d.ts.map