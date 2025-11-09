import { Annotation } from '../types/annotation';
export declare const createDefaultAnnotation: (type: Annotation["type"], color: string, strokeWidth: number, fontSize?: number) => Annotation;
export declare const updateAnnotationProperty: <K extends keyof Annotation>(annotation: Annotation | null, key: K, value: Annotation[K], defaults?: Partial<Annotation>) => Annotation;
//# sourceMappingURL=annotationHelpers.d.ts.map