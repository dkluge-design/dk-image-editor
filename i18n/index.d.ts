import React from 'react';
import { Language, Translations } from './types';
import { defaultTranslations } from './translations';
interface I18nContextValue {
    t: (key: string, params?: Record<string, string | number>) => string;
    language: Language;
}
interface I18nProviderProps {
    language?: Language;
    translations?: Translations;
    children: React.ReactNode;
}
export declare const I18nProvider: React.FC<I18nProviderProps>;
export declare const useTranslation: () => I18nContextValue;
export * from './types';
export { defaultTranslations };
//# sourceMappingURL=index.d.ts.map