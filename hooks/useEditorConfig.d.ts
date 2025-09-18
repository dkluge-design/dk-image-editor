/**
 * 编辑器配置处理 Hook
 *
 * 处理所有配置相关的数据转换和处理
 */
interface UseEditorConfigProps {
    utils: string[];
    filterOptions: Array<[string, string]>;
    cropSelectPresetOptions: Array<[number | undefined, string]>;
}
export declare const useEditorConfig: ({ utils, filterOptions, cropSelectPresetOptions, }: UseEditorConfigProps) => {
    tools: {
        name?: string | undefined;
        icon?: React.ReactNode;
        id: string;
    }[];
    filters: {
        id: string;
        name: string;
    }[];
    cropPresets: {
        ratio: number | undefined;
        name: string;
    }[];
};
export {};
//# sourceMappingURL=useEditorConfig.d.ts.map