import React from 'react';
interface FilterPreviewProps {
    filterId: string;
    name: string;
    isActive: boolean;
    onClick: () => void;
    isLoading?: boolean;
    filterType?: 'toggle' | 'apply';
    clickCount?: number;
}
export declare const FilterPreview: React.FC<FilterPreviewProps>;
export {};
//# sourceMappingURL=FilterPreview.d.ts.map