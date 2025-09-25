import './DkSlider.scss';
interface DkSliderProps {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    step?: number;
    className?: string;
    disabled?: boolean;
    width?: string;
    showValue?: boolean;
    showLabel?: boolean;
    label?: string;
}
export default function DkSlider({ min, max, value, onChange, step, className, disabled, width, showValue, showLabel, label, }: DkSliderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DkSlider.d.ts.map