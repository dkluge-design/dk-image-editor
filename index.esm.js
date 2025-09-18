import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import React, { createContext, useMemo, useContext, useState, useEffect, useCallback, memo, useReducer, useRef } from 'react';

const ROTATION_ANGLES = {
    QUARTER_TURN: 90,
    NEGATIVE_QUARTER_TURN: -90,
};
const SLIDER_RANGES = {
    FINETUNE: { min: -100, max: 100 },
    STROKE_WIDTH: { min: 1, max: 20 },
    FONT_SIZE: { min: 12, max: 72 },
};
const DEBOUNCE_DELAY = {
    RENDER: 10,
    FILTER_RESET: 50};

const IconLock = ({ size = 16, color = 'currentColor' }) => {
    return (jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", children: [jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }), jsx("circle", { cx: "12", cy: "16", r: "1" }), jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })] }));
};

const IconUnlock = ({ size = 16, color = 'currentColor' }) => {
    return (jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", children: [jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }), jsx("circle", { cx: "12", cy: "16", r: "1" }), jsx("path", { d: "M7 11V7a5 5 0 0 1 9.9-1" })] }));
};

function IconReset(props) {
    const width = props.size || props.width || 20;
    const height = props.size || props.height || 20;
    return (jsxs("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { d: "M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8" }), jsx("path", { d: "M21 3v5h-5" }), jsx("path", { d: "M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16" }), jsx("path", { d: "M3 21v-5h5" })] }));
}

const en = {
    // Header actions
    'header.upload': 'Upload Image',
    'header.undo': 'Undo',
    'header.redo': 'Redo',
    'header.download': 'Download',
    'header.confirm': 'Confirm',
    'header.close': 'Close',
    'header.zoom.in': 'Zoom In',
    'header.zoom.out': 'Zoom Out',
    'header.zoom.reset': 'Reset Zoom',
    'header.close.confirm': 'Are you sure you want to close? Any unsaved changes will be lost.',
    // Tools
    'tool.select': 'Select',
    'tool.crop': 'Crop',
    'tool.filter': 'Filter',
    'tool.annotate': 'Annotate',
    'tool.sticker': 'Sticker',
    'tool.finetune': 'Finetune',
    'tool.frame': 'Frame',
    // Crop panel
    'crop.original': 'Original',
    'crop.lock.ratio': 'Lock Aspect Ratio',
    'crop.unlock.ratio': 'Unlock Aspect Ratio',
    'crop.rotation': 'Rotation',
    'crop.scale': 'Scale',
    'crop.skew': 'Skew',
    'crop.reset': 'Reset All Adjustments',
    // Finetune options
    'finetune.brightness': 'Brightness',
    'finetune.contrast': 'Contrast',
    'finetune.saturation': 'Saturation',
    'finetune.exposure': 'Exposure',
    'finetune.gamma': 'Gamma',
    'finetune.vignette': 'Vignette',
    'finetune.reset': 'Reset All Finetune Settings',
    // Annotate tools
    'annotate.sharpie': 'Sharpie',
    'annotate.draw': 'Draw',
    'annotate.line': 'Line',
    'annotate.arrow': 'Arrow',
    'annotate.rectangle': 'Rectangle',
    'annotate.ellipse': 'Ellipse',
    'annotate.text': 'Text',
    'annotate.color': 'Color',
    'annotate.stroke': 'Stroke',
    'annotate.fill': 'Fill',
    'annotate.width': 'Width',
    'annotate.size': 'Size',
    'annotate.clear.fill': 'Clear Fill',
    // Filter categories
    'filter.basic': 'Basic Filters',
    'filter.artistic': 'Artistic Filters',
    'filter.enhance': 'Enhance Filters',
    'filter.reset': 'Reset Filters',
    // Sticker categories
    'sticker.faces': 'Faces',
    'sticker.hands': 'Hands',
    'sticker.hearts': 'Hearts',
    'sticker.animals': 'Animals',
    'sticker.fruits': 'Fruits',
    'sticker.food': 'Food',
    'sticker.transport': 'Transport',
    'sticker.nature': 'Nature',
    'sticker.numbers': 'Numbers',
    'sticker.stickers': 'Stickers',
    'sticker.symbols': 'Symbols',
    'sticker.upload': 'Upload',
    // Toolbar actions
    'toolbar.delete': 'Delete Selected',
    'toolbar.copy': 'Copy Selected',
    'toolbar.front': 'Bring to Front',
    'toolbar.back': 'Send to Back',
    'toolbar.forward': 'Move Forward',
    'toolbar.backward': 'Move Backward',
    'toolbar.bold': 'Bold',
    'toolbar.italic': 'Italic',
    'toolbar.underline': 'Underline',
    'toolbar.strikethrough': 'Strikethrough',
    'toolbar.font.smaller': 'Smaller Font',
    'toolbar.font.larger': 'Larger Font',
    'toolbar.text.color': 'Text Color',
    'toolbar.stroke.color': 'Stroke Color',
    'toolbar.fill.color': 'Fill Color',
    'toolbar.stroke.width': 'Stroke Width',
    'toolbar.clear.fill': 'Clear Fill',
    // Loading
    'loading.image': 'Loading image...',
    // Frame names
    'frame.none': 'None',
    'frame.solidSharp': 'Solid Sharp',
    'frame.solidRound': 'Solid Round',
    'frame.lineSingle': 'Single Line',
    'frame.lineMultiple': 'Multiple Lines',
    'frame.edgeCross': 'Edge Cross',
    'frame.edgeSeparate': 'Edge Separate',
    'frame.edgeOverlap': 'Edge Overlap',
    'frame.hook': 'Hook',
    'frame.polaroid': 'Polaroid',
    // Multi-selection messages
    'toolbar.delete.multi': 'Delete {count} selected items',
    'toolbar.copy.multi': 'Copy {count} selected items',
    'toolbar.selected.count': '{count} items selected',
    // Common
    'common.none': 'None',
    'common.width': 'Width',
    'common.height': 'Height',
    'common.color': 'Color',
    'common.size': 'Size',
};
const zh = {
    // Header actions
    'header.upload': '上传图片',
    'header.undo': '撤销',
    'header.redo': '重做',
    'header.download': '下载',
    'header.confirm': '确认',
    'header.close': '关闭',
    'header.zoom.in': '放大',
    'header.zoom.out': '缩小',
    'header.zoom.reset': '重置缩放',
    'header.close.confirm': '确定要关闭吗？未保存的更改将丢失。',
    // Tools
    'tool.select': '选择',
    'tool.crop': '裁剪',
    'tool.filter': '滤镜',
    'tool.annotate': '标注',
    'tool.sticker': '贴纸',
    'tool.finetune': '微调',
    'tool.frame': '边框',
    // Crop panel
    'crop.original': '原始',
    'crop.lock.ratio': '锁定宽高比',
    'crop.unlock.ratio': '解锁宽高比',
    'crop.rotation': '旋转',
    'crop.scale': '缩放',
    'crop.skew': '倾斜',
    'crop.reset': '重置所有调整',
    // Finetune options
    'finetune.brightness': '亮度',
    'finetune.contrast': '对比度',
    'finetune.saturation': '饱和度',
    'finetune.exposure': '曝光',
    'finetune.gamma': '伽马',
    'finetune.vignette': '暗角',
    'finetune.reset': '重置所有微调设置',
    // Annotate tools
    'annotate.sharpie': '马克笔',
    'annotate.draw': '绘制',
    'annotate.line': '直线',
    'annotate.arrow': '箭头',
    'annotate.rectangle': '矩形',
    'annotate.ellipse': '椭圆',
    'annotate.text': '文本',
    'annotate.color': '颜色',
    'annotate.stroke': '描边',
    'annotate.fill': '填充',
    'annotate.width': '宽度',
    'annotate.size': '大小',
    'annotate.clear.fill': '透明填充',
    // Filter categories
    'filter.basic': '基础滤镜',
    'filter.artistic': '艺术滤镜',
    'filter.enhance': '增强滤镜',
    'filter.reset': '重置滤镜',
    // Sticker categories
    'sticker.faces': '表情',
    'sticker.hands': '手势',
    'sticker.hearts': '爱心',
    'sticker.animals': '动物',
    'sticker.fruits': '水果',
    'sticker.food': '食物',
    'sticker.transport': '交通',
    'sticker.nature': '植物',
    'sticker.numbers': '数字',
    'sticker.stickers': '贴纸',
    'sticker.symbols': '符号',
    'sticker.upload': '上传',
    // Toolbar actions
    'toolbar.delete': '删除选中',
    'toolbar.copy': '复制选中',
    'toolbar.front': '移到最上层',
    'toolbar.back': '移到最下层',
    'toolbar.forward': '上移一层',
    'toolbar.backward': '下移一层',
    'toolbar.bold': '加粗',
    'toolbar.italic': '斜体',
    'toolbar.underline': '下划线',
    'toolbar.strikethrough': '删除线',
    'toolbar.font.smaller': '字号-',
    'toolbar.font.larger': '字号+',
    'toolbar.text.color': '文本颜色',
    'toolbar.stroke.color': '描边颜色',
    'toolbar.fill.color': '填充颜色',
    'toolbar.stroke.width': '描边宽度',
    'toolbar.clear.fill': '清除填充',
    // Loading
    'loading.image': '加载图片中...',
    // Frame names
    'frame.none': '无边框',
    'frame.solidSharp': '实线方框',
    'frame.solidRound': '实线圆角',
    'frame.lineSingle': '单线边框',
    'frame.lineMultiple': '多线边框',
    'frame.edgeCross': '交叉边框',
    'frame.edgeSeparate': '分离边框',
    'frame.edgeOverlap': '重叠边框',
    'frame.hook': '钩形边框',
    'frame.polaroid': '拍立得',
    // Multi-selection messages
    'toolbar.delete.multi': '删除选中的 {count} 个元素',
    'toolbar.copy.multi': '复制选中的 {count} 个元素',
    'toolbar.selected.count': '已选中 {count} 个元素',
    // Common
    'common.none': '无',
    'common.width': '宽度',
    'common.height': '高度',
    'common.color': '颜色',
    'common.size': '大小',
};
const defaultTranslations = { en, zh };

const I18nContext = createContext(null);
const I18nProvider = ({ language = 'en', translations, children }) => {
    const value = useMemo(() => {
        // 合并用户自定义翻译和默认翻译
        const mergedTranslations = translations
            ? {
                ...defaultTranslations,
                ...Object.keys(translations).reduce((acc, lang) => {
                    acc[lang] = {
                        ...(defaultTranslations[lang] || defaultTranslations['en'] || {}),
                        ...translations[lang],
                    };
                    return acc;
                }, {}),
            }
            : defaultTranslations;
        const currentTranslations = mergedTranslations[language] || mergedTranslations.en || defaultTranslations.en;
        return {
            t: (key, params) => {
                let translation = currentTranslations?.[key] || key;
                if (params) {
                    Object.entries(params).forEach(([param, value]) => {
                        translation = translation.replace(`{${param}}`, String(value));
                    });
                }
                return translation;
            },
            language,
        };
    }, [language, translations]);
    return React.createElement(I18nContext.Provider, { value }, children);
};
const useTranslation = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useTranslation must be used within I18nProvider');
    }
    return context;
};

const CropPanel = ({ editorState, cropPresets, editorRef, onStateChange }) => {
    const { t } = useTranslation();
    // 宽高比锁定状态
    const [isAspectLocked, setIsAspectLocked] = useState(false);
    // 基于原图尺寸的裁剪宽高（用于输入框显示）
    const [cropWidth, setCropWidth] = useState('');
    const [cropHeight, setCropHeight] = useState('');
    // 当裁剪区域变化时，计算并更新基于原图尺寸的宽高值
    useEffect(() => {
        if (!editorState.crop || !editorRef.current)
            return;
        const editor = editorRef.current;
        const imageDisplay = editor.getImageDisplay(); // 画布上的显示尺寸
        const originalImageSize = editor.getOriginalImageSize(); // 原图实际尺寸
        const { crop } = editorState;
        if (!originalImageSize.width || !imageDisplay.width)
            return;
        // 计算裁剪区域相对于显示区域的比例
        const cropRatioW = crop.width / imageDisplay.width;
        const cropRatioH = crop.height / imageDisplay.height;
        // 将比例应用到原图尺寸，得到实际输出尺寸
        const actualWidth = Math.round(originalImageSize.width * cropRatioW);
        const actualHeight = Math.round(originalImageSize.height * cropRatioH);
        setCropWidth(actualWidth.toString());
        setCropHeight(actualHeight.toString());
    }, [editorState.crop, editorRef.current]);
    // 重新计算图片在画布上的显示位置和尺寸
    const recalculateImageDisplay = useCallback(() => {
        const editor = editorRef.current;
        if (editor && editor.recalculateImageDisplay) {
            editor.recalculateImageDisplay();
        }
    }, [editorRef]);
    // 重置所有变换（旋转、翻转）并将裁剪区域设为整张图片
    const handleReset = useCallback(() => {
        const editor = editorRef.current;
        if (!editor)
            return;
        // 重置变换状态
        onStateChange({ rotation: 0, flipX: false, flipY: false, scale: 1, skewX: 0, skewY: 0 });
        // 延迟执行以确保变换重置完成
        setTimeout(() => {
            // 只在重置时重新计算显示区域，因为需要重新设置裁剪区域
            recalculateImageDisplay();
            const imageDisplay = editor.getImageDisplay();
            onStateChange({
                crop: { x: imageDisplay.x, y: imageDisplay.y, width: imageDisplay.width, height: imageDisplay.height },
            });
        }, 50);
    }, [editorRef, onStateChange, recalculateImageDisplay]);
    // 处理裁剪预设点击（如1:1、16:9等比例）
    const handlePresetClick = useCallback((preset) => {
        if (!preset.ratio) {
            handleReset(); // 重置按钮
            return;
        }
        const editor = editorRef.current;
        if (!editor)
            return;
        const imageDisplay = editor.getImageDisplay();
        const state = editor.getState();
        // 获取所有变换参数
        const rotation = ((state.rotation || 0) * Math.PI) / 180;
        const scale = state.scale || 1;
        const skewX = state.skewX || 0;
        const skewY = state.skewY || 0;
        // 计算变换后的边界框
        const cos = Math.abs(Math.cos(rotation));
        const sin = Math.abs(Math.sin(rotation));
        // 考虑缩放和倾斜的影响
        const scaledWidth = imageDisplay.width * scale;
        const scaledHeight = imageDisplay.height * scale;
        // 倾斜会影响边界框大小
        const skewWidthEffect = Math.abs(skewX) * scaledHeight;
        const skewHeightEffect = Math.abs(skewY) * scaledWidth;
        const transformedWidth = (scaledWidth + skewWidthEffect) * cos + (scaledHeight + skewHeightEffect) * sin;
        const transformedHeight = (scaledHeight + skewHeightEffect) * cos + (scaledWidth + skewWidthEffect) * sin;
        // 计算变换后图片的中心点
        const centerX = imageDisplay.x + imageDisplay.width / 2;
        const centerY = imageDisplay.y + imageDisplay.height / 2;
        const canvas = editor.canvas;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        // 计算变换后的有效边界，限制在画布范围内
        const transformedBounds = {
            x: Math.max(0, Math.min(canvasWidth - transformedWidth, centerX - transformedWidth / 2)),
            y: Math.max(0, Math.min(canvasHeight - transformedHeight, centerY - transformedHeight / 2)),
            width: Math.min(transformedWidth, canvasWidth),
            height: Math.min(transformedHeight, canvasHeight),
        };
        const { width: maxWidth, height: maxHeight } = transformedBounds;
        let newWidth, newHeight;
        // 根据预设比例计算最大可能的裁剪尺寸
        if (preset.ratio >= maxWidth / maxHeight) {
            newWidth = maxWidth * 0.8; // 留出一些边距
            newHeight = newWidth / preset.ratio;
        }
        else {
            newHeight = maxHeight * 0.8; // 留出一些边距
            newWidth = newHeight * preset.ratio;
        }
        // 居中定位裁剪区域
        const x = transformedBounds.x + (transformedBounds.width - newWidth) / 2;
        const y = transformedBounds.y + (transformedBounds.height - newHeight) / 2;
        onStateChange({ crop: { x, y, width: newWidth, height: newHeight } });
    }, [editorRef, onStateChange, handleReset]);
    // 处理旋转操作
    const handleRotation = useCallback((angle) => {
        onStateChange({ rotation: (editorState.rotation || 0) + angle });
        // 移除recalculateImageDisplay调用，避免图片大小变化
    }, [editorState.rotation, onStateChange]);
    // 处理翻转操作（水平/垂直）
    const handleFlip = useCallback((axis) => {
        const key = `flip${axis}`;
        onStateChange({ [key]: !editorState[key] });
    }, [editorState, onStateChange]);
    // 将原图尺寸转换为显示尺寸并更新裁剪区域
    const updateCropSize = useCallback((newWidth, newHeight) => {
        const editor = editorRef.current;
        const imageDisplay = editor.getImageDisplay();
        const originalImageSize = editor.getOriginalImageSize();
        // 将原图尺寸转换为画布显示尺寸
        const displayWidth = (newWidth / originalImageSize.width) * imageDisplay.width;
        const displayHeight = (newHeight / originalImageSize.height) * imageDisplay.height;
        onStateChange({
            crop: { ...editorState.crop, width: displayWidth, height: displayHeight },
        });
    }, [editorState.crop, onStateChange]);
    // 处理宽度输入变化
    const handleWidthChange = useCallback((value) => {
        setCropWidth(value);
        const newWidth = parseInt(value) || 0;
        if (newWidth <= 0)
            return;
        let newHeight = parseInt(cropHeight) || 0;
        // 如果锁定宽高比，根据当前比例计算新高度
        if (isAspectLocked && parseInt(cropWidth) > 0 && parseInt(cropHeight) > 0) {
            newHeight = Math.round(newWidth / (parseInt(cropWidth) / parseInt(cropHeight)));
            setCropHeight(newHeight.toString());
        }
        updateCropSize(newWidth, newHeight);
    }, [cropWidth, cropHeight, isAspectLocked, updateCropSize]);
    // 处理高度输入变化
    const handleHeightChange = useCallback((value) => {
        setCropHeight(value);
        const newHeight = parseInt(value) || 0;
        if (newHeight <= 0)
            return;
        let newWidth = parseInt(cropWidth) || 0;
        // 如果锁定宽高比，根据当前比例计算新宽度
        if (isAspectLocked && parseInt(cropWidth) > 0 && parseInt(cropHeight) > 0) {
            newWidth = Math.round(newHeight * (parseInt(cropWidth) / parseInt(cropHeight)));
            setCropWidth(newWidth.toString());
        }
        updateCropSize(newWidth, newHeight);
    }, [cropWidth, cropHeight, isAspectLocked, updateCropSize]);
    return (jsxs("div", { className: "dk-image-editor__crop-controls", children: [jsxs("div", { className: "dk-image-editor__actions", children: [jsx("button", { className: "dk-image-editor__preset-btn", onClick: () => handlePresetClick({ name: 'Original' }), children: jsx(IconReset, { size: 14 }) }), jsx("select", { className: "dk-image-editor__preset-select", onChange: (e) => {
                            const preset = cropPresets.find((p) => p.name === e.target.value);
                            if (preset)
                                handlePresetClick(preset);
                        }, defaultValue: "", children: cropPresets.map((preset) => (jsx("option", { value: preset.name, children: preset.name }, preset.name))) }), jsx("button", { onClick: () => handleRotation(ROTATION_ANGLES.NEGATIVE_QUARTER_TURN), children: "-90\u00B0" }), jsx("button", { onClick: () => handleRotation(ROTATION_ANGLES.QUARTER_TURN), children: "+90\u00B0" }), jsx("button", { onClick: () => handleFlip('X'), children: "\u21C4" }), jsx("button", { onClick: () => handleFlip('Y'), children: "\u21C5" }), jsxs("div", { className: "dk-image-editor__size-inputs", children: [jsx("input", { type: "number", value: cropWidth, onChange: (e) => handleWidthChange(e.target.value), min: "1", placeholder: "W" }), jsx("button", { className: `dk-image-editor__lock-btn ${isAspectLocked ? 'locked' : ''}`, onClick: () => setIsAspectLocked(!isAspectLocked), title: isAspectLocked ? t('crop.unlock.ratio') : t('crop.lock.ratio'), children: isAspectLocked ? jsx(IconLock, { size: 14 }) : jsx(IconUnlock, { size: 14 }) }), jsx("input", { type: "number", value: cropHeight, onChange: (e) => handleHeightChange(e.target.value), min: "1", placeholder: "H" })] })] }), jsxs("div", { className: "dk-image-editor__rotation-controls", children: [jsxs("div", { className: "dk-image-editor__slider", children: [jsx("label", { children: t('crop.rotation') }), jsx("input", { type: "range", min: "-180", max: "180", value: editorState.rotation || 0, onChange: (e) => onStateChange({ rotation: Number(e.target.value) }) }), jsxs("span", { children: [editorState?.rotation || 0, "\u00B0"] })] }), jsxs("div", { className: "dk-image-editor__slider", children: [jsx("label", { children: t('crop.scale') }), jsx("input", { type: "range", min: "0.1", max: "3", step: "0.1", value: editorState.scale || 1, onChange: (e) => onStateChange({ scale: Number(e.target.value) }) }), jsxs("span", { children: [(editorState?.scale || 1).toFixed(1), "x"] })] }), jsxs("div", { className: "dk-image-editor__slider", children: [jsx("label", { children: t('crop.skew') }), jsx("input", { type: "range", min: "0", max: "360", step: "5", value: (() => {
                                    const skewX = editorState.skewX || 0;
                                    const skewY = editorState.skewY || 0;
                                    if (skewX === 0 && skewY === 0)
                                        return 0;
                                    const angle = (Math.atan2(skewY, skewX) * 180) / Math.PI;
                                    return angle < 0 ? angle + 360 : angle;
                                })(), onChange: (e) => {
                                    const angle = Number(e.target.value);
                                    if (angle === 0) {
                                        onStateChange({ skewX: 0, skewY: 0 });
                                    }
                                    else {
                                        const radians = (angle * Math.PI) / 180;
                                        const intensity = 0.5; // 固定合理强度
                                        onStateChange({
                                            skewX: Math.cos(radians) * intensity,
                                            skewY: Math.sin(radians) * intensity,
                                        });
                                    }
                                } }), jsx("span", { children: (() => {
                                    const skewX = editorState.skewX || 0;
                                    const skewY = editorState.skewY || 0;
                                    if (skewX === 0 && skewY === 0)
                                        return t('common.none');
                                    const angle = (Math.atan2(skewY, skewX) * 180) / Math.PI;
                                    return Math.round(angle < 0 ? angle + 360 : angle) + '°';
                                })() })] })] })] }));
};

function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

function IconAnnotate(props) {
    const width = props.size || props.width || 20;
    const height = props.size || props.height || 20;
    return (jsx("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: jsx("path", { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" }) }));
}

function IconCrop(props) {
    const width = props.size || props.width || 20;
    const height = props.size || props.height || 20;
    return (jsxs("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { d: "M6.13 1L6 16a2 2 0 002 2h15" }), jsx("path", { d: "M1 6.13L16 6a2 2 0 012 2v15" })] }));
}

function IconFilter(props) {
    const width = props.size || props.width || 20;
    const height = props.size || props.height || 20;
    return (jsx("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: jsx("path", { d: "M18.347 9.907a6.5 6.5 0 1 0-1.872 3.306M3.26 11.574a6.5 6.5 0 1 0 2.815-1.417 M10.15 17.897A6.503 6.503 0 0 0 16.5 23a6.5 6.5 0 1 0-6.183-8.51" }) }));
}

function IconFinetune(props) {
    const width = props.size || props.width || 20;
    const height = props.size || props.height || 20;
    return (jsxs("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("line", { x1: "4", y1: "21", x2: "4", y2: "14" }), jsx("line", { x1: "4", y1: "10", x2: "4", y2: "3" }), jsx("line", { x1: "12", y1: "21", x2: "12", y2: "12" }), jsx("line", { x1: "12", y1: "8", x2: "12", y2: "3" }), jsx("line", { x1: "20", y1: "21", x2: "20", y2: "16" }), jsx("line", { x1: "20", y1: "12", x2: "20", y2: "3" }), jsx("line", { x1: "1", y1: "14", x2: "7", y2: "14" }), jsx("line", { x1: "9", y1: "8", x2: "15", y2: "8" }), jsx("line", { x1: "17", y1: "16", x2: "23", y2: "16" })] }));
}

const IconFrame = ({ size = 16, className = '' }) => {
    return (jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className, children: [jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }), jsx("rect", { x: "7", y: "7", width: "10", height: "10" })] }));
};

function IconSelect(props) {
    const width = props.size || props.width || 20;
    const height = props.size || props.height || 20;
    return (jsx("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: jsx("path", { d: "M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" }) }));
}

function IconSticker(props) {
    const width = props.size || props.width || 20;
    const height = props.size || props.height || 20;
    return (jsxs("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 1024 1024", fill: "currentColor", children: [jsx("path", { d: "M670.64 403.2c-5.04-18.776-14.808-34.984-27.056-45.696-12.16-10.712-27.904-16.856-43.816-12.584-15.872 4.264-26.456 17.448-31.576 32.768-5.248 15.44-5.632 34.304-0.6 53.16 5.04 18.776 14.808 34.984 27.056 45.696 12.16 10.712 27.904 16.856 43.776 12.584 15.92-4.264 26.448-17.408 31.656-32.768 5.2-15.44 5.592-34.304 0.56-53.12V403.2z m-247.384 66.264c-4.992-18.776-14.768-34.992-27.008-45.744-12.16-10.664-27.904-16.808-43.776-12.584-15.92 4.264-26.456 17.496-31.664 32.856-5.2 15.4-5.584 34.256-0.552 53.072 5.04 18.816 14.8 34.992 27.048 45.744 12.16 10.664 27.904 16.848 43.776 12.584 15.92-4.264 26.456-17.448 31.664-32.808 5.2-15.408 5.584-34.304 0.56-53.12h-0.048z" }), jsx("path", { d: "M512 32C246.912 32 32 246.912 32 512c0 265.088 214.912 480 480 480 42.024 0 78.936-19.376 105.384-45.816l328.8-328.8C972.624 590.984 992 554.024 992 512c0-265.088-214.912-480-480-480zM119.28 512a392.872 392.872 0 0 1 43.104-179.192 395.456 395.456 0 0 1 28.864-47.712 394 394 0 0 1 48.424-56.352A392.616 392.616 0 0 1 416.688 130.72a393.344 393.344 0 0 1 110.656-11.44 391.096 391.096 0 0 1 55.424 6.128 392.736 392.736 0 0 1 319.56 342.944c-91.072 0.224-150.2 2.096-200.16 19.6a350.928 350.928 0 0 0-43.248 18.48 355.96 355.96 0 0 0-20.592 11.376 352.52 352.52 0 0 0-32.464 21.968 359.096 359.096 0 0 0-18.224 14.88 354.48 354.48 0 0 0-22.664 21.68 354.992 354.992 0 0 0-20.624 23.64 352.992 352.992 0 0 0-18.416 25.384 355.52 355.52 0 0 0-12.28 20.072 310.4 310.4 0 0 1-55.176 4.544 307.424 307.424 0 0 1-39.464-2.816 308.056 308.056 0 0 1-31.12-5.872 44.656 44.656 0 0 0-8.488-1.32 44.784 44.784 0 0 0-8.584 0.368 45.48 45.48 0 0 0-6.304 1.384 43.888 43.888 0 0 0-13.408 6.688 45.064 45.064 0 0 0-4.896 4.2 44.728 44.728 0 0 0-5.464 6.632 44.032 44.032 0 0 0-5.52 11.624 45.416 45.416 0 0 0-1.408 6.288 46.728 46.728 0 0 0-0.416 4.28 43.848 43.848 0 0 0 2.536 16.912 43.48 43.48 0 0 0 15.24 20.384 43.792 43.792 0 0 0 15.504 7.216c35.352 8.856 73.096 12.648 111.84 10.816-8.768 42.896-9.992 94.472-10.12 165.56C272 880.64 119.272 714.168 119.272 512z m611.68 58.344c32.432-11.352 72.44-13.968 153.392-14.576l-328.584 328.584c0.56-80.952 3.224-120.96 14.576-153.384a261.104 261.104 0 0 1 21.616-46.544 267.28 267.28 0 0 1 11.976-18.48 268.08 268.08 0 0 1 13.488-17.4 268.664 268.664 0 0 1 14.904-16.216 266.92 266.92 0 0 1 16.208-14.904 261.096 261.096 0 0 1 48.744-32.568 268.624 268.624 0 0 1 19.968-9.28 259.544 259.544 0 0 1 13.72-5.232z" })] }));
}

const TOOL_MAP = {
    select: { name: 'Select', icon: jsx(IconSelect, {}) },
    crop: { name: 'Crop', icon: jsx(IconCrop, {}) },
    finetune: { name: 'Finetune', icon: jsx(IconFinetune, {}) },
    filter: { name: 'Filter', icon: jsx(IconFilter, {}) },
    annotate: { name: 'Annotate', icon: jsx(IconAnnotate, {}) },
    sticker: { name: 'Sticker', icon: jsx(IconSticker, {}) },
    frame: { name: 'Frame', icon: jsx(IconFrame, {}) },
    'advanced-filter': { name: 'Advanced', icon: '🎭' },
    image: { name: 'Image', icon: '🖼️' },
    resize: { name: 'Resize', icon: '📏' },
    fill: { name: 'Fill', icon: '🎯' },
};
const DEFAULT_CROP_PRESETS = [
    [undefined, 'Original'],
    [1, '1:1'],
    [4 / 3, '4:3'],
    [16 / 9, '16:9'],
    [3 / 2, '3:2'],
];
const DEFAULT_ANNOTATE_TOOLS = [
    ['sharpie', 'Draw'],
    ['line', 'Line'],
    ['arrow', 'Arrow'],
    ['rectangle', 'Rectangle'],
    ['ellipse', 'Ellipse'],
    ['text', 'Text'],
];
const DEFAULT_FILTER_OPTIONS = [
    // 基础滤镜
    ['chrome', 'Chrome'],
    ['fade', 'Fade'],
    ['cold', 'Cold'],
    ['warm', 'Warm'],
    ['monoDefault', 'Mono'],
    ['sepiaDefault', 'Sepia'],
    // 艺术效果
    ['blur', 'Blur'],
    ['sharpen', 'Sharpen'],
    ['emboss', 'Emboss'],
    ['oil', 'Oil Paint'],
    // 新增滤镜
    ['vintage', 'Vintage'],
    ['dramatic', 'Dramatic'],
    ['vivid', 'Vivid'],
    ['noir', 'Noir'],
    ['sunset', 'Sunset'],
    ['ocean', 'Ocean'],
];
const DEFAULT_FINETUNE_OPTIONS = [
    ['brightness', 'Brightness'],
    ['contrast', 'Contrast'],
    ['saturation', 'Saturation'],
    ['exposure', 'Exposure'],
    ['gamma', 'Gamma'],
    ['vignette', 'Vignette'],
];
const DEFAULT_FRAME_OPTIONS = [
    ['none', 'None'],
    ['solidSharp', 'Mat'],
    ['solidRound', 'Bevel'],
    ['lineSingle', 'Line'],
    ['lineMultiple', 'Zebra'],
    ['edgeCross', 'Lumber'],
    ['edgeSeparate', 'Inset'],
    ['edgeOverlap', 'Plus'],
    ['hook', 'Hook'],
    ['polaroid', 'Polaroid'],
];
// UI 常量
const UI_CONSTANTS = {
    ANIMATION_DURATION: 300,
    DEFAULT_STROKE_WIDTH: 2,
    DEFAULT_FONT_SIZE: 24,
    EMOJI_LIST: [
        // 笑脸
        '😀',
        '😂',
        '🤣',
        '😊',
        '😍',
        '🥰',
        '😘',
        '😋',
        '🤔',
        '😎',
        '🤩',
        '🥳',
        // 手势
        '👍',
        '👎',
        '👌',
        '✌️',
        '🤞',
        '🤟',
        '🤘',
        '👏',
        '🙌',
        '🤝',
        '💪',
        '🦾',
        // 心形
        '❤️',
        '🧡',
        '💛',
        '💚',
        '💙',
        '💜',
        '🖤',
        '🤍',
        '🤎',
        '💕',
        '💖',
        '💗',
        // 狗头
        '🐶',
        '🐕',
        '🦮',
        '🐕‍🦺',
        '🐩',
        '🐺',
        '🦊',
        '🦝',
        '🐱',
        '🐈',
        '🐈‍⬛',
        '🦁',
        // 符号
        '🔥',
        '⭐',
        '✨',
        '🎉',
        '💯',
        '💥',
        '⚡',
        '🌟',
        '🎊',
        '🎈',
        '🎁',
        '🏆',
    ],
    FINETUNE_SHORTCUTS: {
        brightness: 'BR',
        contrast: 'CO',
        saturation: 'SA',
        exposure: 'EX',
        gamma: 'GA',
        vignette: 'VI',
    },
};

const IconBrightness = ({ size = 16, color = 'currentColor' }) => {
    return (jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsx("circle", { cx: "12", cy: "12", r: "4", fill: color }), jsx("path", { d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41", stroke: color, strokeWidth: "2", strokeLinecap: "round" })] }));
};

const IconContrast = ({ size = 16, color = 'currentColor' }) => {
    return (jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsx("circle", { cx: "12", cy: "12", r: "9", stroke: color, strokeWidth: "2" }), jsx("path", { d: "M12 3a9 9 0 0 1 0 18z", fill: color })] }));
};

const IconExposure = ({ size = 16, color = 'currentColor' }) => {
    return (jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsx("circle", { cx: "12", cy: "12", r: "9", stroke: color, strokeWidth: "2" }), jsx("path", { d: "M8 8h8M8 12h8M8 16h4", stroke: color, strokeWidth: "2", strokeLinecap: "round" }), jsx("path", { d: "M16 16l2-2M18 18l-2-2", stroke: color, strokeWidth: "2", strokeLinecap: "round" })] }));
};

const IconGamma = ({ size = 16, color = 'currentColor' }) => {
    return (jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsx("path", { d: "M3 21h18l-9-18z", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }), jsx("path", { d: "M12 3v18", stroke: color, strokeWidth: "2", strokeLinecap: "round" }), jsx("path", { d: "M7.5 15h9", stroke: color, strokeWidth: "2", strokeLinecap: "round" })] }));
};

const IconSaturation = ({ size = 16, color = 'currentColor' }) => {
    return (jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsx("path", { d: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z", fill: color }) }));
};

const IconVignette = ({ size = 16, color = 'currentColor' }) => {
    return (jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", stroke: color, strokeWidth: "2" }), jsx("circle", { cx: "12", cy: "12", r: "6", fill: "none", stroke: color, strokeWidth: "2", strokeDasharray: "2 2" }), jsx("circle", { cx: "12", cy: "12", r: "3", fill: color })] }));
};

const FinetunePanel = ({ editorState, selectedFinetuneOption, finetuneOptions, editorRef, onStateChange, setSelectedFinetuneOption, }) => {
    const { t } = useTranslation();
    const { FINETUNE_SHORTCUTS } = UI_CONSTANTS;
    const optionsMap = useMemo(() => {
        return new Map(finetuneOptions);
    }, [finetuneOptions]);
    const debouncedRender = useMemo(() => {
        return debounce(() => editorRef.current?.render(), DEBOUNCE_DELAY.RENDER);
    }, [editorRef]);
    const handleSliderChange = useCallback((value) => {
        onStateChange({ [selectedFinetuneOption]: value });
        debouncedRender();
    }, [selectedFinetuneOption, onStateChange, debouncedRender]);
    const handleReset = useCallback(() => {
        const resetValues = {};
        finetuneOptions.forEach(([key]) => {
            resetValues[key] = 0;
        });
        onStateChange(resetValues);
        debouncedRender();
    }, [finetuneOptions, onStateChange, debouncedRender]);
    const currentValue = editorState?.[selectedFinetuneOption] || 0;
    const currentLabel = t(`finetune.${selectedFinetuneOption}`) || optionsMap.get(selectedFinetuneOption) || 'Brightness';
    return (jsxs("div", { className: "dk-image-editor__finetune-controls", children: [jsxs("div", { className: "dk-image-editor__slider", children: [jsx("label", { children: currentLabel }), jsx("input", { type: "range", min: SLIDER_RANGES.FINETUNE.min, max: SLIDER_RANGES.FINETUNE.max, value: currentValue, onChange: (e) => handleSliderChange(Number(e.target.value)) }), jsx("span", { children: currentValue })] }), jsxs("div", { className: "dk-image-editor__finetune-options", children: [jsx("button", { className: "dk-image-editor__finetune-option", onClick: handleReset, title: t('finetune.reset'), children: jsx(IconReset, { size: 14 }) }), finetuneOptions.map(([key, label]) => {
                        const getIcon = () => {
                            switch (key) {
                                case 'brightness':
                                    return jsx(IconBrightness, { size: 14 });
                                case 'contrast':
                                    return jsx(IconContrast, { size: 14 });
                                case 'saturation':
                                    return jsx(IconSaturation, { size: 14 });
                                case 'exposure':
                                    return jsx(IconExposure, { size: 14 });
                                case 'gamma':
                                    return jsx(IconGamma, { size: 14 });
                                case 'vignette':
                                    return jsx(IconVignette, { size: 14 });
                                default:
                                    return FINETUNE_SHORTCUTS[key] || key.substring(0, 2).toUpperCase();
                            }
                        };
                        return (jsx("button", { className: `dk-image-editor__finetune-option ${selectedFinetuneOption === key ? 'dk-image-editor__finetune-option--active' : ''}`, onClick: () => setSelectedFinetuneOption(key), title: t(`finetune.${key}`), children: getIcon() }, key));
                    })] })] }));
};

const IconArrow = ({ size = 16, width, height, style }) => {
    return (jsxs("svg", { width: width || size, height: height || size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: style, children: [jsx("line", { x1: "7", y1: "17", x2: "17", y2: "7" }), jsx("polyline", { points: "7,7 17,7 17,17" })] }));
};

const IconDraw = ({ size = 16, width, height, style }) => {
    return (jsx("svg", { width: width || size, height: height || size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: style, children: jsx("path", { d: "M3 17c3-3 6-6 9-3s6 6 9 3" }) }));
};

const IconEllipse = ({ size = 16, width, height, style }) => {
    return (jsx("svg", { width: width || size, height: height || size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: style, children: jsx("circle", { cx: "12", cy: "12", r: "10" }) }));
};

const IconLine = ({ size = 16, width, height, style }) => {
    return (jsx("svg", { width: width || size, height: height || size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: style, children: jsx("line", { x1: "7", y1: "17", x2: "17", y2: "7" }) }));
};

const IconRectangle = ({ size = 16, width, height, style }) => {
    return (jsx("svg", { width: width || size, height: height || size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: style, children: jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }) }));
};

const IconText = ({ size = 16, width, height, style }) => {
    return (jsxs("svg", { width: width || size, height: height || size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: style, children: [jsx("polyline", { points: "4,7 4,4 20,4 20,7" }), jsx("line", { x1: "9", y1: "20", x2: "15", y2: "20" }), jsx("line", { x1: "12", y1: "4", x2: "12", y2: "20" })] }));
};

const createDefaultAnnotation = (type, color, strokeWidth, fontSize) => ({
    id: '',
    type,
    x: 0,
    y: 0,
    color,
    strokeWidth,
    fontSize: type === 'text' ? fontSize : undefined,
    fillColor: (type === 'rectangle' || type === 'ellipse') ? 'transparent' : undefined,
    strokeColor: type !== 'text' ? color : undefined,
});
const updateAnnotationProperty = (annotation, key, value, defaults = {}) => {
    if (annotation) {
        return { ...annotation, [key]: value };
    }
    return { ...createDefaultAnnotation('rectangle', '#000000', 2), ...defaults, [key]: value };
};

const ColorPicker = memo(({ value, onChange, title }) => {
    const handleColorPickerClick = useCallback((e) => {
        e.preventDefault();
        const colorInput = e.currentTarget.querySelector('input[type="color"]');
        colorInput?.click();
    }, []);
    const handleColorChange = useCallback((e) => {
        e.stopPropagation();
        onChange(e.target.value);
    }, [onChange]);
    return (jsx("button", { className: "dk-image-editor__color-button", onClick: handleColorPickerClick, children: jsx("div", { className: "dk-image-editor__color-picker", children: jsx("input", { type: "color", value: value, onChange: handleColorChange, title: title, onClick: (e) => {
                    console.log('🎨 Color input clicked');
                    e.stopPropagation();
                } }) }) }));
});
ColorPicker.displayName = 'ColorPicker';

const AnnotatePanel = ({ currentAnnotation, lastAnnotateColor, annotateTools, setCurrentAnnotation, setLastAnnotateColor, }) => {
    const { t } = useTranslation();
    const { DEFAULT_STROKE_WIDTH, DEFAULT_FONT_SIZE } = UI_CONSTANTS;
    // Set default tool to Draw (sharpie) when component mounts
    useEffect(() => {
        if (!currentAnnotation) {
            setCurrentAnnotation(createDefaultAnnotation('sharpie', lastAnnotateColor, DEFAULT_STROKE_WIDTH, DEFAULT_FONT_SIZE));
        }
    }, [currentAnnotation, lastAnnotateColor, setCurrentAnnotation, DEFAULT_STROKE_WIDTH, DEFAULT_FONT_SIZE]);
    const handleColorChange = useCallback((color) => {
        setLastAnnotateColor(color);
        if (currentAnnotation) {
            const updatedAnnotation = updateAnnotationProperty(currentAnnotation, 'color', color);
            // 同时更新strokeColor以保持一致性
            setCurrentAnnotation(updateAnnotationProperty(updatedAnnotation, 'strokeColor', color));
        }
    }, [currentAnnotation, setCurrentAnnotation, setLastAnnotateColor]);
    const handleStrokeWidthChange = useCallback((width) => {
        setCurrentAnnotation(updateAnnotationProperty(currentAnnotation, 'strokeWidth', width, { color: lastAnnotateColor }));
    }, [currentAnnotation, lastAnnotateColor, setCurrentAnnotation]);
    const handleFontSizeChange = useCallback((size) => {
        setCurrentAnnotation(updateAnnotationProperty(currentAnnotation, 'fontSize', size));
    }, [currentAnnotation, setCurrentAnnotation]);
    const handleFillColorChange = useCallback((color) => {
        setCurrentAnnotation(updateAnnotationProperty(currentAnnotation, 'fillColor', color));
    }, [currentAnnotation, setCurrentAnnotation]);
    const handleStrokeColorChange = useCallback((color) => {
        setCurrentAnnotation(updateAnnotationProperty(currentAnnotation, 'strokeColor', color));
    }, [currentAnnotation, setCurrentAnnotation]);
    const handleToolSelect = useCallback((tool) => {
        setCurrentAnnotation(createDefaultAnnotation(tool, lastAnnotateColor, currentAnnotation?.strokeWidth || DEFAULT_STROKE_WIDTH, currentAnnotation?.fontSize || DEFAULT_FONT_SIZE));
    }, [currentAnnotation, lastAnnotateColor, setCurrentAnnotation, DEFAULT_STROKE_WIDTH, DEFAULT_FONT_SIZE]);
    const FontSizeSlider = currentAnnotation?.type === 'text' ? (jsxs("div", { className: "dk-image-editor__compact-slider", children: [jsxs("label", { children: [t('annotate.size'), ":"] }), jsx("input", { type: "range", min: SLIDER_RANGES.FONT_SIZE.min, max: SLIDER_RANGES.FONT_SIZE.max, value: currentAnnotation.fontSize || DEFAULT_FONT_SIZE, onChange: (e) => handleFontSizeChange(Number(e.target.value)) }), jsx("span", { children: currentAnnotation.fontSize || DEFAULT_FONT_SIZE })] })) : null;
    const FillColorPicker = currentAnnotation?.type === 'rectangle' || currentAnnotation?.type === 'ellipse' ? (jsx(Fragment, { children: jsxs("div", { className: "dk-image-editor__color-box", children: [jsxs("label", { children: [t('annotate.fill'), ": "] }), jsx(ColorPicker, { value: currentAnnotation.fillColor || '#000000', onChange: handleFillColorChange, title: "Fill Color" }), currentAnnotation.fillColor && currentAnnotation.fillColor !== 'transparent' && (jsx("button", { onClick: () => handleFillColorChange('transparent'), className: "dk-image-editor__clear-fill", title: t('annotate.clear.fill'), children: "\u2715" }))] }) })) : null;
    return (jsxs("div", { className: "dk-image-editor__annotate-controls", children: [jsxs("div", { className: "dk-image-editor__annotate-settings", children: [currentAnnotation?.type === 'text' ? (jsxs("div", { className: "dk-image-editor__color-box", children: [jsxs("label", { children: [t('annotate.color'), ": "] }), jsx(ColorPicker, { value: lastAnnotateColor, onChange: handleColorChange, title: t('toolbar.text.color') })] })) : (jsxs("div", { className: "dk-image-editor__color-box", children: [jsxs("label", { children: [t('annotate.stroke'), ": "] }), jsx(ColorPicker, { value: currentAnnotation?.strokeColor || lastAnnotateColor, onChange: handleStrokeColorChange, title: t('toolbar.stroke.color') })] })), FillColorPicker, currentAnnotation?.type !== 'text' && (jsxs("div", { className: "dk-image-editor__compact-slider", children: [jsxs("label", { children: [t('annotate.width'), ":"] }), jsx("input", { type: "range", min: SLIDER_RANGES.STROKE_WIDTH.min, max: SLIDER_RANGES.STROKE_WIDTH.max, value: currentAnnotation?.strokeWidth || DEFAULT_STROKE_WIDTH, onChange: (e) => handleStrokeWidthChange(Number(e.target.value)) }), jsx("span", { children: currentAnnotation?.strokeWidth || DEFAULT_STROKE_WIDTH })] })), FontSizeSlider] }), jsx("div", { className: "dk-image-editor__toolbar", children: annotateTools.map(([tool, name]) => {
                    const getIcon = () => {
                        switch (tool) {
                            case 'sharpie':
                                return jsx(IconDraw, { size: 16 });
                            case 'line':
                                return jsx(IconLine, { size: 16 });
                            case 'arrow':
                                return jsx(IconArrow, { size: 16 });
                            case 'rectangle':
                                return jsx(IconRectangle, { size: 16 });
                            case 'ellipse':
                                return jsx(IconEllipse, { size: 16 });
                            case 'text':
                                return jsx(IconText, { size: 16 });
                            default:
                                return null;
                        }
                    };
                    return (jsxs("button", { onClick: () => handleToolSelect(tool), className: `dk-image-editor__tool-button ${currentAnnotation?.type === tool ? 'dk-image-editor__unified-button--active' : ''}`, children: [getIcon(), t(`annotate.${tool}`)] }, tool));
                }) })] }));
};

function classNames(...args) {
    const classes = [];
    for (const arg of args) {
        if (!arg)
            continue;
        if (typeof arg === 'string' || typeof arg === 'number') {
            classes.push(String(arg));
        }
        else if (Array.isArray(arg)) {
            const result = classNames(...arg);
            if (result)
                classes.push(result);
        }
        else if (typeof arg === 'object') {
            for (const key in arg) {
                if (arg[key])
                    classes.push(key);
            }
        }
    }
    return classes.join(' ');
}

const StickerPanel = ({ editorRef, stickerPluginRef, selectionPluginRef, imagePluginRef, zoomLevel, setHasSelection, currentSticker, setCurrentSticker, }) => {
    const { t } = useTranslation();
    const { EMOJI_LIST} = UI_CONSTANTS;
    const [selectedCategory, setSelectedCategory] = useState('faces');
    const [loadingStickers, setLoadingStickers] = useState(new Set());
    const stickerImages = useMemo(() => [
        'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f60d.png',
        'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f602.png',
        'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f60e.png',
        'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f973.png',
        'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f970.png',
        'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f60b.png',
        'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f929.png',
        'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f60a.png',
        'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f618.png',
        'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f44d.png',
    ], []);
    const categories = useMemo(() => ({
        faces: EMOJI_LIST.slice(0, 12),
        hands: EMOJI_LIST.slice(12, 24),
        hearts: EMOJI_LIST.slice(24, 36),
        fruits: ['🍉', '🍊', '🍎', '🍋', '🍌', '🍇', '🍓', '🫐', '🍈', '🍑', '🍒', '🥭'],
        food: ['🍕', '🍔', '🍟', '🌭', '🥪', '🌮', '🌯', '🥙', '🧆', '🥚', '🍳', '🥞'],
        transport: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚'],
        nature: ['🌸', '🌺', '🌻', '🌷', '🌹', '🥀', '🌾', '🌿', '🍀', '🍃', '🌱', '🌲'],
        animals: EMOJI_LIST.slice(36, 48),
        numbers: ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '#️⃣'],
        stickers: stickerImages,
        symbols: EMOJI_LIST.slice(48),
    }), [EMOJI_LIST, stickerImages]);
    // 默认选中第一个表情
    useEffect(() => {
        if (!currentSticker) {
            const firstEmoji = categories.faces[0] ?? '😀';
            setCurrentSticker({ content: firstEmoji, type: 'emoji' });
        }
    }, [currentSticker, setCurrentSticker, categories.faces]);
    const handleFileUpload = useCallback((file) => {
        if (file && imagePluginRef.current) {
            imagePluginRef.current.addImageFromFile(file);
        }
    }, [imagePluginRef]);
    const handleStickerSelect = useCallback((content, type = 'emoji') => {
        setCurrentSticker({ content, type });
    }, [setCurrentSticker]);
    return (jsxs("div", { className: "dk-image-editor__sticker-controls", children: [jsx("div", { className: "d-flex align-items-center gap-2", children: Object.keys(categories).map((category) => {
                    const getIcon = () => {
                        const categoryItems = categories[category];
                        if (category === 'stickers') {
                            const firstItem = categoryItems[0];
                            return firstItem ? jsx("img", { src: firstItem, alt: "sticker", style: { width: '16px', height: '16px' } }) : null;
                        }
                        const firstItem = categoryItems[0];
                        return firstItem ? jsx("span", { style: { fontSize: '16px' }, children: firstItem }) : null;
                    };
                    return (jsxs("button", { className: `dk-image-editor__tool-button ${selectedCategory === category ? 'active' : ''}`, onClick: () => {
                            setSelectedCategory(category);
                            const firstItem = categories[category][0];
                            if (firstItem) {
                                setCurrentSticker({
                                    content: firstItem,
                                    type: category === 'stickers' ? 'image' : 'emoji',
                                });
                            }
                        }, children: [getIcon(), t(`sticker.${category}`)] }, category));
                }) }), jsxs("div", { className: "dk-image-editor__toolbar", children: [jsxs("label", { className: "dk-image-editor__upload-button", children: [jsx("input", { type: "file", accept: "image/*", style: { display: 'none' }, onChange: (e) => {
                                    const file = e.target.files?.[0];
                                    if (file)
                                        handleFileUpload(file);
                                } }), jsx("span", { className: "dk-image-editor__upload-icon", children: "+" }), jsx("span", { className: "dk-image-editor__upload-text", children: t('sticker.upload') })] }), categories[selectedCategory].map((item, index) => {
                        const isSelected = currentSticker?.content === item;
                        return (jsx("button", { onClick: () => handleStickerSelect(item, selectedCategory === 'stickers' ? 'image' : 'emoji'), className: classNames('dk-image-editor__tool-button', {
                                'css-loading': loadingStickers.has(item),
                                'dk-image-editor__unified-button--active': isSelected,
                            }), style: { height: selectedCategory === 'stickers' ? 'auto' : '' }, children: selectedCategory === 'stickers' ? (jsx("img", { src: item, alt: "sticker", style: { width: '32px', height: '32px' } })) : (jsx("span", { style: { fontSize: '24px' }, children: item })) }, typeof item === 'string' ? item : index));
                    })] })] }));
};

const applyVintageFilter = (imageData) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i] ?? 0;
        const g = data[i + 1] ?? 0;
        const b = data[i + 2] ?? 0;
        // 复古效果：使用sepia算法 + 暖色调增强
        const sepia = 0.393 * r + 0.769 * g + 0.189 * b;
        const sepiaG = 0.349 * r + 0.686 * g + 0.168 * b;
        const sepiaB = 0.272 * r + 0.534 * g + 0.131 * b;
        // 增强暖色调和对比度
        data[i] = Math.min(255, sepia * 1.2 + 25);
        data[i + 1] = Math.min(255, sepiaG * 1.1 + 15);
        data[i + 2] = Math.min(255, sepiaB * 0.9 + 5);
    }
    console.log('imageData', imageData);
    return imageData;
};
const applyDramaticFilter = (imageData) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i] ?? 0;
        const g = data[i + 1] ?? 0;
        const b = data[i + 2] ?? 0;
        // 戏剧效果：极高对比度 + 高饱和度
        const contrast = 2.5;
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        // 增强对比度
        let newR = Math.max(0, Math.min(255, factor * (r - 128) + 128));
        let newG = Math.max(0, Math.min(255, factor * (g - 128) + 128));
        let newB = Math.max(0, Math.min(255, factor * (b - 128) + 128));
        // 增强饱和度
        const gray = 0.299 * newR + 0.587 * newG + 0.114 * newB;
        const saturation = 1.8;
        newR = Math.max(0, Math.min(255, gray + saturation * (newR - gray)));
        newG = Math.max(0, Math.min(255, gray + saturation * (newG - gray)));
        newB = Math.max(0, Math.min(255, gray + saturation * (newB - gray)));
        // 增加阴影和高光的对比
        const luminance = 0.299 * newR + 0.587 * newG + 0.114 * newB;
        if (luminance < 128) {
            newR *= 0.7;
            newG *= 0.7;
            newB *= 0.7;
        }
        else {
            newR = Math.min(255, newR * 1.3);
            newG = Math.min(255, newG * 1.3);
            newB = Math.min(255, newB * 1.3);
        }
        data[i] = newR;
        data[i + 1] = newG;
        data[i + 2] = newB;
    }
    return imageData;
};
const applyVividFilter = (imageData) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i] ?? 0;
        const g = data[i + 1] ?? 0;
        const b = data[i + 2] ?? 0;
        // 鲜艳效果：增强饱和度
        const saturation = 1.6;
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        data[i] = Math.max(0, Math.min(255, gray + saturation * (r - gray)));
        data[i + 1] = Math.max(0, Math.min(255, gray + saturation * (g - gray)));
        data[i + 2] = Math.max(0, Math.min(255, gray + saturation * (b - gray)));
    }
    return imageData;
};
const applyNoirFilter = (imageData) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i] ?? 0;
        const g = data[i + 1] ?? 0;
        const b = data[i + 2] ?? 0;
        // 黑白效果：高对比度黑白
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        const contrast = gray > 128 ? Math.min(255, gray * 1.3) : Math.max(0, gray * 0.7);
        data[i] = contrast;
        data[i + 1] = contrast;
        data[i + 2] = contrast;
    }
    return imageData;
};
const applySunsetFilter = (imageData) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i] ?? 0;
        const g = data[i + 1] ?? 0;
        const b = data[i + 2] ?? 0;
        // 日落效果：橙红色调
        data[i] = Math.min(255, r * 1.3 + 40); // 红色大幅增强
        data[i + 1] = Math.min(255, g * 1.1 + 25); // 绿色轻微增强
        data[i + 2] = Math.max(0, b * 0.6); // 蓝色大幅减弱
    }
    return imageData;
};
const applyOceanFilter = (imageData) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i] ?? 0;
        const g = data[i + 1] ?? 0;
        const b = data[i + 2] ?? 0;
        // 海洋效果：蓝绿色调
        data[i] = Math.max(0, r * 0.7); // 红色减弱
        data[i + 1] = Math.min(255, g * 1.2 + 20); // 绿色增强
        data[i + 2] = Math.min(255, b * 1.4 + 30); // 蓝色大幅增强
    }
    return imageData;
};

const FILTER_PREVIEWS = {
    chrome: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("rect", { width: "40", height: "40", fill: "#FFFFFF", rx: "8" }), jsx("rect", { x: "6", y: "8", width: "28", height: "12", fill: "#1966FF", rx: "2" }), jsx("rect", { x: "10", y: "16", width: "24", height: "16", fill: "#00C87F", rx: "2" }), jsx("text", { x: "20", y: "26", textAnchor: "middle", fill: "#FFFFFF", fontSize: "8", fontWeight: "bold", children: "HD" })] })),
    fade: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("defs", { children: jsxs("linearGradient", { id: "fade-grad", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [jsx("stop", { offset: "0%", stopColor: "#333333", stopOpacity: "1" }), jsx("stop", { offset: "50%", stopColor: "#666666", stopOpacity: "0.6" }), jsx("stop", { offset: "100%", stopColor: "#cccccc", stopOpacity: "0.2" })] }) }), jsx("rect", { width: "40", height: "40", fill: "#f5f5f5", rx: "6" }), jsx("rect", { x: "5", y: "15", width: "30", height: "10", fill: "url(#fade-grad)", rx: "2" })] })),
    cold: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("defs", { children: jsxs("linearGradient", { id: "cold-grad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [jsx("stop", { offset: "0%", stopColor: "#e6f7ff" }), jsx("stop", { offset: "50%", stopColor: "#91d5ff" }), jsx("stop", { offset: "100%", stopColor: "#40a9ff" })] }) }), jsx("rect", { width: "40", height: "40", fill: "url(#cold-grad)", rx: "4" }), jsx("path", { d: "M20 8 L24 16 L20 24 L16 16 Z", fill: "#fff", opacity: "0.7" }), jsx("path", { d: "M8 20 L16 24 L24 20 L16 16 Z", fill: "#fff", opacity: "0.5" })] })),
    warm: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("defs", { children: jsxs("radialGradient", { id: "warm-grad", children: [jsx("stop", { offset: "0%", stopColor: "#fff7e6" }), jsx("stop", { offset: "50%", stopColor: "#ffd591" }), jsx("stop", { offset: "100%", stopColor: "#fa8c16" })] }) }), jsx("rect", { width: "40", height: "40", fill: "url(#warm-grad)", rx: "4" }), jsx("circle", { cx: "20", cy: "15", r: "6", fill: "#ffec3d", opacity: "0.8" }), jsx("path", { d: "M20 21 Q15 25 10 30 Q20 28 20 21", fill: "#ff7a45", opacity: "0.6" }), jsx("path", { d: "M20 21 Q25 25 30 30 Q20 28 20 21", fill: "#ff7a45", opacity: "0.6" })] })),
    monoDefault: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("rect", { width: "40", height: "40", fill: "#f0f0f0" }), jsx("rect", { width: "20", height: "40", fill: "#333" }), jsx("rect", { x: "10", y: "10", width: "20", height: "20", fill: "#666" }), jsx("rect", { x: "15", y: "15", width: "10", height: "10", fill: "#999" })] })),
    sepiaDefault: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("defs", { children: jsxs("linearGradient", { id: "sepia-grad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [jsx("stop", { offset: "0%", stopColor: "#f4e4bc" }), jsx("stop", { offset: "50%", stopColor: "#d2b48c" }), jsx("stop", { offset: "100%", stopColor: "#8b7355" })] }) }), jsx("rect", { width: "40", height: "40", fill: "url(#sepia-grad)", rx: "4" }), jsx("circle", { cx: "12", cy: "12", r: "4", fill: "#deb887", opacity: "0.8" }), jsx("circle", { cx: "28", cy: "28", r: "6", fill: "#cd853f", opacity: "0.6" })] })),
    blur: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("defs", { children: jsx("filter", { id: "blur-effect", children: jsx("feGaussianBlur", { in: "SourceGraphic", stdDeviation: "2" }) }) }), jsx("rect", { width: "40", height: "40", fill: "#f0f8ff" }), jsx("circle", { cx: "15", cy: "15", r: "8", fill: "#4169e1", filter: "url(#blur-effect)", opacity: "0.7" }), jsx("circle", { cx: "25", cy: "25", r: "6", fill: "#1e90ff", filter: "url(#blur-effect)", opacity: "0.5" })] })),
    sharpen: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("rect", { width: "40", height: "40", fill: "#fafafa" }), jsx("polygon", { points: "20,5 30,20 20,35 10,20", fill: "#ff4d4f", stroke: "#fff", strokeWidth: "2" }), jsx("polygon", { points: "20,10 25,20 20,30 15,20", fill: "#fff", opacity: "0.8" })] })),
    emboss: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("defs", { children: jsxs("linearGradient", { id: "emboss-grad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [jsx("stop", { offset: "0%", stopColor: "#ffffff" }), jsx("stop", { offset: "50%", stopColor: "#cccccc" }), jsx("stop", { offset: "100%", stopColor: "#666666" })] }) }), jsx("rect", { width: "40", height: "40", fill: "#e8e8e8" }), jsx("rect", { x: "8", y: "8", width: "24", height: "24", fill: "url(#emboss-grad)", rx: "2" }), jsx("rect", { x: "10", y: "10", width: "20", height: "20", fill: "none", stroke: "#999", strokeWidth: "1" })] })),
    oil: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("rect", { width: "40", height: "40", fill: "#2c3e50" }), jsx("circle", { cx: "12", cy: "15", r: "5", fill: "#e74c3c", opacity: "0.8" }), jsx("circle", { cx: "28", cy: "12", r: "4", fill: "#f39c12", opacity: "0.7" }), jsx("circle", { cx: "25", cy: "28", r: "6", fill: "#3498db", opacity: "0.6" }), jsx("circle", { cx: "15", cy: "30", r: "3", fill: "#2ecc71", opacity: "0.9" }), jsx("path", { d: "M10 25 Q20 20 30 25 Q25 30 15 28", fill: "#9b59b6", opacity: "0.5" })] })),
    vintage: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("defs", { children: jsxs("radialGradient", { id: "vintage-grad", children: [jsx("stop", { offset: "0%", stopColor: "#f5e6d3" }), jsx("stop", { offset: "70%", stopColor: "#d4a574" }), jsx("stop", { offset: "100%", stopColor: "#8b6914" })] }) }), jsx("rect", { width: "40", height: "40", fill: "url(#vintage-grad)", rx: "6" }), jsx("circle", { cx: "20", cy: "20", r: "12", fill: "none", stroke: "#8b6914", strokeWidth: "2", opacity: "0.6" }), jsx("rect", { x: "16", y: "8", width: "8", height: "4", fill: "#8b6914", opacity: "0.8" })] })),
    dramatic: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("defs", { children: jsxs("linearGradient", { id: "dramatic-grad", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [jsx("stop", { offset: "0%", stopColor: "#000000" }), jsx("stop", { offset: "50%", stopColor: "#666666" }), jsx("stop", { offset: "100%", stopColor: "#ffffff" })] }) }), jsx("rect", { width: "40", height: "40", fill: "url(#dramatic-grad)" }), jsx("polygon", { points: "20,8 28,20 20,32 12,20", fill: "#fff", opacity: "0.3" })] })),
    vivid: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("defs", { children: jsxs("radialGradient", { id: "vivid-grad", children: [jsx("stop", { offset: "0%", stopColor: "#ff6b6b" }), jsx("stop", { offset: "33%", stopColor: "#4ecdc4" }), jsx("stop", { offset: "66%", stopColor: "#45b7d1" }), jsx("stop", { offset: "100%", stopColor: "#96ceb4" })] }) }), jsx("rect", { width: "40", height: "40", fill: "url(#vivid-grad)", rx: "8" }), jsx("circle", { cx: "15", cy: "15", r: "4", fill: "#fff", opacity: "0.4" }), jsx("circle", { cx: "25", cy: "25", r: "3", fill: "#fff", opacity: "0.6" })] })),
    noir: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("rect", { width: "40", height: "40", fill: "#1a1a1a" }), jsx("rect", { x: "5", y: "15", width: "30", height: "2", fill: "#ffffff" }), jsx("rect", { x: "5", y: "23", width: "30", height: "2", fill: "#cccccc" }), jsx("circle", { cx: "12", cy: "12", r: "3", fill: "#ffffff" }), jsx("circle", { cx: "28", cy: "28", r: "4", fill: "#888888" }), jsx("rect", { x: "18", y: "18", width: "4", height: "4", fill: "#ffffff" })] })),
    sunset: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("defs", { children: jsxs("linearGradient", { id: "sunset-grad", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [jsx("stop", { offset: "0%", stopColor: "#ff9a56" }), jsx("stop", { offset: "50%", stopColor: "#ff6b35" }), jsx("stop", { offset: "100%", stopColor: "#f7931e" })] }) }), jsx("rect", { width: "40", height: "40", fill: "url(#sunset-grad)", rx: "4" }), jsx("circle", { cx: "20", cy: "12", r: "6", fill: "#fff59d", opacity: "0.9" }), jsx("ellipse", { cx: "20", cy: "32", rx: "15", ry: "4", fill: "#ff5722", opacity: "0.6" }), jsx("path", { d: "M5 25 Q20 20 35 25", stroke: "#ffcc02", strokeWidth: "2", fill: "none", opacity: "0.8" })] })),
    ocean: (jsxs("svg", { width: "40", height: "40", viewBox: "0 0 40 40", children: [jsx("defs", { children: jsxs("linearGradient", { id: "ocean-grad", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [jsx("stop", { offset: "0%", stopColor: "#87ceeb" }), jsx("stop", { offset: "50%", stopColor: "#4682b4" }), jsx("stop", { offset: "100%", stopColor: "#191970" })] }) }), jsx("rect", { width: "40", height: "40", fill: "url(#ocean-grad)", rx: "4" }), jsx("path", { d: "M0 30 Q10 25 20 30 T40 30 V40 H0 Z", fill: "#1e88e5", opacity: "0.7" }), jsx("path", { d: "M0 35 Q15 32 30 35 T40 35 V40 H0 Z", fill: "#0d47a1", opacity: "0.5" }), jsx("circle", { cx: "30", cy: "10", r: "2", fill: "#ffffff", opacity: "0.8" })] })),
};
const FilterPreview = ({ filterId, name, isActive, onClick, isLoading = false, filterType = 'toggle', clickCount, }) => {
    return (jsxs("button", { className: classNames('dk-image-editor__filter-preview', `dk-image-editor__filter-preview--${filterType}`, {
            'dk-image-editor__unified-button--active': isActive,
            'dk-image-editor__filter-preview--loading': isLoading,
            'css-loading': isLoading,
        }), onClick: onClick, disabled: isLoading, children: [jsx("div", { className: 'dk-image-editor__filter-icon', children: FILTER_PREVIEWS[filterId] || (jsx("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '24px' }, children: "\uD83C\uDFA8" })) }), jsxs("span", { className: "dk-image-editor__filter-name", children: [name, filterType === 'apply' && clickCount !== undefined && clickCount > 0 && jsx("span", { className: "dk-filter-count", children: clickCount })] })] }));
};

const FilterPanel = ({ editorState, filters, editorRef, filterCounts, onStateChange, setFilterCounts, applyAdvancedFilter, }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('basic');
    // 区分两种类型的滤镜
    const filterTypes = useMemo(() => ({
        toggle: ['chrome', 'fade', 'cold', 'warm', 'monoDefault', 'sepiaDefault', 'blur'],
        apply: ['sharpen', 'emboss', 'oil', 'vintage', 'dramatic', 'vivid', 'noir', 'sunset', 'ocean'],
    }), []);
    const { toggle: toggleFilters, apply: applyFilters } = filterTypes;
    // 特殊处理：Original 滤镜用于重置
    const resetToOriginal = useCallback((filter) => {
        if (filter.name === 'Original' || filter.id === 'original') {
            onStateChange({ filter: null });
            setTimeout(() => editorRef.current?.render(), DEBOUNCE_DELAY.FILTER_RESET);
            return true;
        }
        return false;
    }, [onStateChange, editorRef]);
    // 应用自定义滤镜
    const applyCustomFilter = useCallback((imageData, filterId) => {
        switch (filterId) {
            case 'vintage':
                return applyVintageFilter(imageData);
            case 'dramatic':
                return applyDramaticFilter(imageData);
            case 'vivid':
                return applyVividFilter(imageData);
            case 'noir':
                return applyNoirFilter(imageData);
            case 'sunset':
                return applySunsetFilter(imageData);
            case 'ocean':
                return applyOceanFilter(imageData);
            default:
                return imageData;
        }
    }, []);
    // 重新应用所有滤镜
    const reapplyAllFilters = useCallback(async (excludeFilterId) => {
        if (!editorRef.current)
            return;
        let currentImageData = editorRef.current.getImageData();
        if (!currentImageData)
            return;
        for (const [filterId, count] of Object.entries(filterCounts)) {
            if (filterId !== excludeFilterId && count > 0 && applyFilters.includes(filterId)) {
                for (let i = 0; i < count; i++) {
                    if (['sharpen', 'emboss', 'oil'].includes(filterId)) {
                        currentImageData = await applyAdvancedFilter(currentImageData, filterId);
                    }
                    else {
                        currentImageData = applyCustomFilter(currentImageData, filterId);
                    }
                }
            }
        }
        editorRef.current.setImageData(currentImageData);
    }, [filterCounts, setFilterCounts, applyFilters, applyAdvancedFilter, applyCustomFilter, editorRef]);
    const handleToggleFilter = useCallback((filterId) => {
        const isActive = editorState?.filter === filterId;
        onStateChange({ filter: isActive ? null : filterId });
        setTimeout(() => editorRef.current?.render(), DEBOUNCE_DELAY.FILTER_RESET);
    }, [editorState?.filter, onStateChange, editorRef]);
    const handleApplyFilter = useCallback(async (filter) => {
        const currentCount = filterCounts[filter.id] || 0;
        const newCount = currentCount >= 3 ? 0 : currentCount + 1;
        const newFilterCounts = { ...filterCounts, [filter.id]: newCount };
        setFilterCounts(newFilterCounts);
        if (currentCount >= 3) {
            const newAppliedFilters = (editorState?.appliedFilters || []).filter((f) => f.type !== filter.id);
            onStateChange({ appliedFilters: newAppliedFilters });
            if (editorRef.current) {
                editorRef.current.resetToOriginal();
                await reapplyAllFilters(filter.id);
            }
            return;
        }
        setIsLoading(filter.id);
        try {
            if (!editorRef.current)
                return;
            const imageData = editorRef.current.getImageData();
            if (!imageData)
                return;
            let filtered;
            if (['sharpen', 'emboss', 'oil'].includes(filter.id)) {
                try {
                    await new Promise((resolve) => setTimeout(resolve, 100));
                    filtered = await applyAdvancedFilter(imageData, filter.id);
                }
                catch (error) {
                    console.error(`Failed to apply ${filter.id} filter:`, error);
                    return;
                }
            }
            else {
                filtered = applyCustomFilter(imageData, filter.id);
            }
            editorRef.current.setImageData(filtered);
            const newAppliedFilters = [...(editorState?.appliedFilters || []), { type: filter.id, value: 1 }];
            onStateChange({ appliedFilters: newAppliedFilters });
        }
        finally {
            setIsLoading(null);
        }
    }, [
        filterCounts,
        setFilterCounts,
        editorState?.appliedFilters,
        onStateChange,
        editorRef,
        applyAdvancedFilter,
        applyCustomFilter,
        reapplyAllFilters,
    ]);
    const handleFilterClick = useCallback(async (filter) => {
        if (resetToOriginal(filter))
            return;
        if (toggleFilters.includes(filter.id)) {
            handleToggleFilter(filter.id);
        }
        else if (applyFilters.includes(filter.id)) {
            await handleApplyFilter(filter);
        }
    }, [resetToOriginal, toggleFilters, applyFilters, handleToggleFilter, handleApplyFilter]);
    // 滤镜分类
    const categories = useMemo(() => {
        const basicFilters = filters.filter((f) => toggleFilters.includes(f.id));
        const artisticFilters = filters.filter((f) => ['vintage', 'dramatic', 'vivid', 'noir', 'sunset', 'ocean'].includes(f.id));
        const enhanceFilters = filters.filter((f) => ['sharpen', 'emboss', 'oil'].includes(f.id));
        return {
            reset: [],
            all: filters.filter((f) => f.name !== 'Original' && f.id !== 'original'),
            basic: basicFilters,
            artistic: artisticFilters,
            enhance: enhanceFilters,
        };
    }, [filters, toggleFilters]);
    const handleResetClick = useCallback(() => {
        onStateChange({ filter: null, appliedFilters: [] });
        setFilterCounts({});
        if (editorRef.current) {
            editorRef.current.resetToOriginal?.();
        }
    }, [onStateChange, setFilterCounts, editorRef]);
    const getCurrentFilters = useCallback(() => {
        return categories[selectedCategory] || [];
    }, [categories, selectedCategory]);
    return (jsxs("div", { className: "dk-image-editor__filter-controls", children: [jsxs("div", { className: "d-flex align-items-center gap-2 mb-2", children: [(editorState?.filter || Object.values(filterCounts).some((count) => count > 0)) && (jsx("button", { className: "dk-image-editor__tool-button", onClick: handleResetClick, children: jsx(IconReset, { size: 14 }) })), jsx("button", { className: `dk-image-editor__tool-button ${selectedCategory === 'basic' ? 'active' : ''}`, onClick: () => setSelectedCategory('basic'), children: t('filter.basic') }), jsx("button", { className: `dk-image-editor__tool-button ${selectedCategory === 'artistic' ? 'active' : ''}`, onClick: () => setSelectedCategory('artistic'), children: t('filter.artistic') }), jsx("button", { className: `dk-image-editor__tool-button ${selectedCategory === 'enhance' ? 'active' : ''}`, onClick: () => setSelectedCategory('enhance'), children: t('filter.enhance') })] }), jsx("div", { className: "dk-image-editor__toolbar", children: getCurrentFilters().map((filter) => {
                    const isToggleFilter = toggleFilters.includes(filter.id);
                    const isApplyFilter = applyFilters.includes(filter.id);
                    return (jsx(FilterPreview, { filterId: filter.id, name: filter.name, isActive: isToggleFilter && editorState?.filter === filter.id, onClick: () => handleFilterClick(filter), isLoading: isLoading === filter.id, filterType: isApplyFilter ? 'apply' : 'toggle', clickCount: isApplyFilter ? filterCounts[filter.id] || 0 : undefined }, filter.id));
                }) })] }));
};

const FramePanel = ({ editorState, editorRef, onStateChange }) => {
    const { t } = useTranslation();
    const FRAME_OPTIONS = DEFAULT_FRAME_OPTIONS.map(([id]) => ({
        id,
        name: t(`frame.${id}`),
        svg: id === 'none' ? null : id === 'solidSharp' ? (jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", strokeWidth: "1", stroke: "currentColor", fill: "none", children: jsx("rect", { strokeWidth: "5", x: "0", y: "0", width: "100%", height: "100%" }) })) : id === 'solidRound' ? (jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", strokeWidth: "1", stroke: "currentColor", fill: "none", children: jsx("rect", { strokeWidth: "5", x: "0", y: "0", width: "100%", height: "100%", rx: "12%" }) })) : id === 'lineSingle' ? (jsx("div", { style: { inset: '0.5em', boxShadow: 'currentcolor 0px 0px 0px 1px inset' } })) : id === 'lineMultiple' ? (jsx("div", { style: { border: '3px double #eee' } })) : id === 'edgeCross' ? (jsxs(Fragment, { children: [jsx("div", { style: {
                        inset: '-0.5em 0.5em',
                        boxShadow: 'currentcolor 0px 0px 0px 1px inset',
                        position: 'absolute',
                        width: 'initial',
                        height: 'initial',
                    } }), jsx("div", { style: {
                        inset: '0.5em -0.5em',
                        boxShadow: 'currentcolor 0px 0px 0px 1px inset',
                        position: 'absolute',
                        width: 'initial',
                        height: 'initial',
                    } })] })) : id === 'edgeSeparate' ? (jsxs(Fragment, { children: [jsx("div", { style: {
                        height: 'initial',
                        width: 'initial',
                        position: 'absolute',
                        top: '0.75em',
                        left: '0.5em',
                        bottom: '0.75em',
                        borderLeft: '1px solid',
                    } }), jsx("div", { style: {
                        height: 'initial',
                        width: 'initial',
                        position: 'absolute',
                        top: '0.75em',
                        right: '0.5em',
                        bottom: '0.75em',
                        borderRight: '1px solid',
                    } }), jsx("div", { style: {
                        height: 'initial',
                        width: 'initial',
                        position: 'absolute',
                        top: '0.5em',
                        left: '0.75em',
                        right: '0.75em',
                        borderTop: '1px solid',
                    } }), jsx("div", { style: {
                        height: 'initial',
                        width: 'initial',
                        position: 'absolute',
                        bottom: '0.5em',
                        left: '0.75em',
                        right: '0.75em',
                        borderBottom: '1px solid',
                    } })] })) : id === 'edgeOverlap' ? (jsxs(Fragment, { children: [jsx("div", { style: {
                        height: 'initial',
                        width: 'initial',
                        position: 'absolute',
                        top: '0.3125em',
                        left: '0.5em',
                        bottom: '0.3125em',
                        borderLeft: '1px solid',
                    } }), jsx("div", { style: {
                        height: 'initial',
                        width: 'initial',
                        position: 'absolute',
                        top: '0.3125em',
                        right: '0.5em',
                        bottom: '0.3125em',
                        borderRight: '1px solid',
                    } }), jsx("div", { style: {
                        height: 'initial',
                        width: 'initial',
                        position: 'absolute',
                        top: '0.5em',
                        left: '0.3125em',
                        right: '0.3125em',
                        borderTop: '1px solid',
                    } }), jsx("div", { style: {
                        height: 'initial',
                        width: 'initial',
                        position: 'absolute',
                        bottom: '0.5em',
                        left: '0.3125em',
                        right: '0.3125em',
                        borderBottom: '1px solid',
                    } })] })) : id === 'hook' ? (jsxs(Fragment, { children: [jsx("div", { style: {
                        position: 'absolute',
                        top: '0.5em',
                        left: '0.5em',
                        width: '0.75em',
                        height: '0.75em',
                        borderLeft: '1px solid',
                        borderTop: '1px solid',
                    } }), jsx("div", { style: {
                        position: 'absolute',
                        top: '0.5em',
                        right: '0.5em',
                        width: '0.75em',
                        height: '0.75em',
                        borderRight: '1px solid',
                        borderTop: '1px solid',
                    } }), jsx("div", { style: {
                        position: 'absolute',
                        bottom: '0.5em',
                        left: '0.5em',
                        width: '0.75em',
                        height: '0.75em',
                        borderLeft: '1px solid',
                        borderBottom: '1px solid',
                    } }), jsx("div", { style: {
                        position: 'absolute',
                        bottom: '0.5em',
                        right: '0.5em',
                        width: '0.75em',
                        height: '0.75em',
                        borderRight: '1px solid',
                        borderBottom: '1px solid',
                    } })] })) : id === 'polaroid' ? (jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", strokeWidth: "1", stroke: "currentColor", fill: "none", children: jsx("rect", { strokeWidth: "20%", x: "-5%", y: "-5%", width: "110%", height: "96%" }) })) : null,
    }));
    const handleFrameSelect = useCallback((frameId) => {
        onStateChange({ frame: frameId });
        setTimeout(() => editorRef.current?.render(), 50);
    }, [onStateChange, editorRef]);
    useCallback(() => {
        onStateChange({ frame: 'none' });
        setTimeout(() => editorRef.current?.render(), 50);
    }, [onStateChange, editorRef]);
    return (jsx("div", { className: "dk-image-editor__frame-controls", children: jsx("div", { className: "dk-image-editor__frame-list", children: FRAME_OPTIONS.map((frame) => (jsxs("div", { className: `dk-image-editor__frame-option ${editorState?.frame === frame.id ? 'active' : ''}`, onClick: () => handleFrameSelect(frame.id), children: [jsx("div", { className: "dk-image-editor__frame-preview", children: frame.svg || jsx("span", {}) }), jsx("span", { className: "dk-image-editor__frame-name", children: frame.name })] }, frame.id))) }) }));
};

// 初始状态
const initialState = {
    editorState: null,
    textEditing: {
        editingText: null,
        editingValue: '',
        editingTextItem: null,
    },
    uiState: {
        activeTool: 'crop',
        isVisible: true,
        hasSelection: false,
        selectedFinetuneOption: 'brightness',
        lastAnnotateColor: '#ff0000',
        zoomLevel: 1,
        currentAnnotation: null,
        currentSticker: null,
    },
    isImageLoading: false,
};
// Reducer
function editorReducer(state, action) {
    switch (action.type) {
        case 'SET_EDITOR_STATE':
            return { ...state, editorState: action.payload };
        case 'UPDATE_TEXT_EDITING':
            return { ...state, textEditing: { ...state.textEditing, ...action.payload } };
        case 'UPDATE_UI_STATE':
            return { ...state, uiState: { ...state.uiState, ...action.payload } };
        case 'SET_IMAGE_LOADING':
            return { ...state, isImageLoading: action.payload };
        case 'RESET_ALL_STATE':
            return initialState;
        default:
            return state;
    }
}
// Context
const EditorContext = createContext(null);
const EditorProvider = ({ children }) => {
    const [state, dispatch] = useReducer(editorReducer, initialState);
    // 创建所有必要的 refs
    const canvasRef = useRef(null);
    const editorRef = useRef(null);
    const cropPluginRef = useRef(null);
    const filterPluginRef = useRef(null);
    const annotatePluginRef = useRef(null);
    const stickerPluginRef = useRef(null);
    const finetunePluginRef = useRef(null);
    const imagePluginRef = useRef(null);
    const selectionPluginRef = useRef(null);
    const advancedFilterPluginRef = useRef(null);
    const refs = useMemo(() => ({
        canvasRef,
        editorRef,
        cropPluginRef,
        filterPluginRef,
        annotatePluginRef,
        stickerPluginRef,
        finetunePluginRef,
        imagePluginRef,
        selectionPluginRef,
        advancedFilterPluginRef,
    }), []);
    const contextValue = useMemo(() => ({ state, dispatch, refs }), [state, dispatch, refs]);
    return (jsx(EditorContext.Provider, { value: contextValue, children: children }));
};

const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditorContext must be used within EditorProvider');
    }
    return context;
};
// 便捷的状态访问 hooks
const useEditorState = () => {
    const { state } = useEditorContext();
    return state.editorState;
};
const useTextEditing = () => {
    const { state } = useEditorContext();
    return state.textEditing;
};
const useUIState = () => {
    const { state } = useEditorContext();
    return state.uiState;
};
const useImageLoading = () => {
    const { state } = useEditorContext();
    return state.isImageLoading;
};
// 便捷的状态更新 hooks
const useEditorActions = () => {
    const { dispatch } = useEditorContext();
    return useMemo(() => ({
        setEditorState: (payload) => dispatch({ type: 'SET_EDITOR_STATE', payload }),
        updateTextEditing: (payload) => dispatch({ type: 'UPDATE_TEXT_EDITING', payload }),
        updateUIState: (payload) => dispatch({ type: 'UPDATE_UI_STATE', payload }),
        setImageLoading: (payload) => dispatch({ type: 'SET_IMAGE_LOADING', payload }),
        resetAllState: () => dispatch({ type: 'RESET_ALL_STATE' }),
    }), [dispatch]);
};
// 便捷的 refs 访问
const useEditorRefs = () => {
    const { refs } = useEditorContext();
    return refs;
};

const ControlPanels = ({ cropPresets, filters, annotateTools, finetuneOptions, onStateChange, applyAdvancedFilter, }) => {
    const { activeTool, selectedFinetuneOption, lastAnnotateColor, zoomLevel, currentAnnotation, currentSticker } = useUIState();
    const editorState = useEditorState();
    const { editorRef, stickerPluginRef, selectionPluginRef, imagePluginRef } = useEditorRefs();
    const { updateUIState } = useEditorActions();
    const filterCounts = editorState?.filterCounts || {};
    const setCurrentAnnotation = (annotation) => updateUIState({ currentAnnotation: annotation });
    const setSelectedFinetuneOption = (option) => updateUIState({ selectedFinetuneOption: option });
    const setLastAnnotateColor = (color) => updateUIState({ lastAnnotateColor: color });
    const setHasSelection = (hasSelection) => updateUIState({ hasSelection });
    const setFilterCounts = (counts) => onStateChange({ filterCounts: counts });
    const setCurrentSticker = (sticker) => updateUIState({ currentSticker: sticker });
    // Create default editor state if null
    const defaultEditorState = {
        crop: { x: 0, y: 0, width: 0, height: 0 },
        rotation: 0,
        flipX: false,
        flipY: false,
        scale: 1,
        skewX: 0,
        skewY: 0,
        brightness: 0,
        contrast: 0,
        saturation: 0,
        exposure: 0,
        gamma: 0,
        vignette: 0,
        filter: 'none',
        appliedFilters: [],
        annotations: [],
        stickers: [],
        images: [],
        backgroundColor: 'transparent',
        frame: 'none',
        filterCounts: {},
    };
    const safeEditorState = editorState || defaultEditorState;
    const panelProps = useMemo(() => ({
        editorState: safeEditorState,
        editorRef,
        onStateChange: onStateChange,
    }), [safeEditorState, editorRef, onStateChange]);
    return !activeTool || activeTool === 'select' ? (jsx(Fragment, {})) : (jsxs("div", { className: "dk-image-editor__controls", children: [activeTool === 'crop' && jsx(CropPanel, { ...panelProps, cropPresets: cropPresets }), activeTool === 'finetune' && (jsx(FinetunePanel, { ...panelProps, selectedFinetuneOption: selectedFinetuneOption, finetuneOptions: finetuneOptions, setSelectedFinetuneOption: setSelectedFinetuneOption })), activeTool === 'annotate' && (jsx(AnnotatePanel, { currentAnnotation: currentAnnotation, lastAnnotateColor: lastAnnotateColor, annotateTools: annotateTools, setCurrentAnnotation: setCurrentAnnotation, setLastAnnotateColor: setLastAnnotateColor })), activeTool === 'sticker' && (jsx(StickerPanel, { editorRef: editorRef, stickerPluginRef: stickerPluginRef, selectionPluginRef: selectionPluginRef, imagePluginRef: imagePluginRef, zoomLevel: zoomLevel, setHasSelection: setHasSelection, currentSticker: currentSticker, setCurrentSticker: setCurrentSticker })), activeTool === 'filter' && (jsx(FilterPanel, { ...panelProps, filters: filters, filterCounts: filterCounts, setFilterCounts: setFilterCounts, applyAdvancedFilter: applyAdvancedFilter })), activeTool === 'frame' && (jsx(FramePanel, { ...panelProps }))] }));
};

function IconBringToFront(props) {
    const width = props.size || props.width || 16;
    const height = props.size || props.height || 16;
    return (jsxs("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { d: "M8 8h8v8H8V8z" }), jsx("path", { d: "M4 12V4h8" }), jsx("path", { d: "M12 20h8v-8" })] }));
}

function IconCopy(props) {
    const width = props.size || props.width || 16;
    const height = props.size || props.height || 16;
    return (jsxs("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }), jsx("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })] }));
}

function IconDelete(props) {
    const width = props.size || props.width || 16;
    const height = props.size || props.height || 16;
    return (jsx("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: jsx("path", { d: "M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" }) }));
}

function IconMoveDown(props) {
    const width = props.size || props.width || 16;
    const height = props.size || props.height || 16;
    return (jsxs("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { d: "M7 10l5 5 5-5" }), jsx("path", { d: "M12 5v10" })] }));
}

function IconMoveUp(props) {
    const width = props.size || props.width || 16;
    const height = props.size || props.height || 16;
    return (jsxs("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { d: "M7 14l5-5 5 5" }), jsx("path", { d: "M12 19V9" })] }));
}

function IconSendToBack(props) {
    const width = props.size || props.width || 16;
    const height = props.size || props.height || 16;
    return (jsxs("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { d: "M8 8h8v8H8V8z", opacity: "0.5" }), jsx("path", { d: "M4 4h8v8H4V4z" }), jsx("path", { d: "M12 12h8v8h-8v-8z" })] }));
}

const TEXT_CONFIG = {
    MIN_FONT_SIZE: 12,
    MAX_FONT_SIZE: 72,
    FONT_SIZE_STEP: 2,
    FOCUS_DELAY: 10,
};
const FloatingToolbar = ({ visible, editingText, editingTextItem, selectionPluginRef, onDelete, onCopy, onMoveToFront, onMoveToBack, onMoveUp, onMoveDown, onTextItemChange, }) => {
    const { t } = useTranslation();
    const isMultiSelect = selectionPluginRef.current?.isMultipleSelection() || false;
    const selectedCount = selectionPluginRef.current?.getSelectedCount() || 0;
    const selectedItem = selectionPluginRef.current?.getSelectedItem();
    const isTextSelected = selectedItem && selectedItem.type === 'text' && !editingText;
    const isGraphicSelected = selectedItem && !editingText && selectedItem.type !== 'text';
    const focusEditor = () => {
        setTimeout(() => document.querySelector('[contenteditable]')?.focus(), TEXT_CONFIG.FOCUS_DELAY);
    };
    const updateTextItem = (updates) => {
        if (editingTextItem) {
            onTextItemChange({ ...editingTextItem, ...updates });
            focusEditor();
        }
    };
    const updateSelectedTextItem = (updates) => {
        if (selectedItem && selectedItem.type === 'text') {
            selectionPluginRef.current?.updateSelectedItemColors(updates.color, undefined);
            // 更新其他文本属性
            const updatedItem = { ...selectedItem, ...updates };
            selectionPluginRef.current?.updateSelectedTextProperties(updatedItem);
        }
    };
    const handleStrokeColorChange = (color) => {
        selectionPluginRef.current?.updateSelectedItemColors(color, undefined);
    };
    const handleFillColorChange = (color) => {
        selectionPluginRef.current?.updateSelectedItemColors(undefined, color);
    };
    const handleClearFill = () => {
        selectionPluginRef.current?.updateSelectedItemColors(undefined, 'transparent');
    };
    const handleStrokeWidthChange = (width) => {
        selectionPluginRef.current?.updateSelectedItemStrokeWidth(width);
    };
    if (!visible)
        return null;
    return (jsxs("div", { className: "dk-image-editor__floating-toolbar floatingToolbar", children: [jsx("button", { onClick: onDelete, className: "dk-image-editor__toolbar-button", title: isMultiSelect ? t('toolbar.delete.multi', { count: selectedCount }) : t('toolbar.delete'), children: jsx(IconDelete, {}) }), jsx("button", { onClick: onCopy, className: "dk-image-editor__toolbar-button", title: isMultiSelect ? t('toolbar.copy.multi', { count: selectedCount }) : t('toolbar.copy'), children: jsx(IconCopy, {}) }), !isMultiSelect && (jsxs(Fragment, { children: [jsx("button", { onClick: onMoveToFront, className: "dk-image-editor__toolbar-button", title: t('toolbar.front'), children: jsx(IconBringToFront, {}) }), jsx("button", { onClick: onMoveToBack, className: "dk-image-editor__toolbar-button", title: t('toolbar.back'), children: jsx(IconSendToBack, {}) }), jsx("button", { onClick: onMoveUp, className: "dk-image-editor__toolbar-button", title: t('toolbar.forward'), children: jsx(IconMoveUp, {}) }), jsx("button", { onClick: onMoveDown, className: "dk-image-editor__toolbar-button", title: t('toolbar.backward'), children: jsx(IconMoveDown, {}) })] })), isMultiSelect && (jsx("span", { className: "d-flex align-items-center", style: { color: 'white', fontSize: '12px', padding: '0 8px' }, children: t('toolbar.selected.count', { count: selectedCount }) })), editingText && editingTextItem && (jsxs(Fragment, { children: [jsx("div", { style: { width: '1px', height: '24px', background: 'rgba(255,255,255,0.3)', margin: '0 4px' } }), jsx("button", { className: "dk-image-editor__toolbar-button", title: t('toolbar.bold'), onClick: () => updateTextItem({ fontWeight: editingTextItem.fontWeight === 'bold' ? 'normal' : 'bold' }), children: jsx("strong", { children: "B" }) }), jsx("button", { className: "dk-image-editor__toolbar-button", title: t('toolbar.italic'), onClick: () => updateTextItem({ fontStyle: editingTextItem.fontStyle === 'italic' ? 'normal' : 'italic' }), children: jsx("em", { children: "I" }) }), jsx("button", { className: "dk-image-editor__toolbar-button", title: t('toolbar.underline'), onClick: () => updateTextItem({ textDecoration: editingTextItem.textDecoration === 'underline' ? 'none' : 'underline' }), children: jsx("u", { children: "U" }) }), jsx("button", { className: "dk-image-editor__toolbar-button", title: t('toolbar.strikethrough'), onClick: () => updateTextItem({ textDecoration: editingTextItem.textDecoration === 'line-through' ? 'none' : 'line-through' }), children: jsx("s", { children: "S" }) }), jsx("button", { className: "dk-image-editor__toolbar-button", title: t('toolbar.font.smaller'), onClick: () => updateTextItem({
                            fontSize: Math.max(TEXT_CONFIG.MIN_FONT_SIZE, (editingTextItem.fontSize || UI_CONSTANTS.DEFAULT_FONT_SIZE) - TEXT_CONFIG.FONT_SIZE_STEP),
                        }), children: "A-" }), jsx("button", { className: "dk-image-editor__toolbar-button", title: t('toolbar.font.larger'), onClick: () => updateTextItem({
                            fontSize: Math.min(TEXT_CONFIG.MAX_FONT_SIZE, (editingTextItem.fontSize || UI_CONSTANTS.DEFAULT_FONT_SIZE) + TEXT_CONFIG.FONT_SIZE_STEP),
                        }), children: "A+" }), jsx(ColorPicker, { value: editingTextItem.color || '#000000', onChange: (color) => updateTextItem({ color }), title: t('toolbar.text.color') })] })), isTextSelected && !isMultiSelect && (jsxs(Fragment, { children: [jsx("div", { style: { width: '1px', height: '24px', background: 'rgba(255,255,255,0.3)', margin: '0 4px' } }), jsx("button", { className: "dk-image-editor__toolbar-button", title: t('toolbar.bold'), onClick: () => updateSelectedTextItem({ fontWeight: selectedItem.fontWeight === 'bold' ? 'normal' : 'bold' }), children: jsx("strong", { children: "B" }) }), jsx("button", { className: "dk-image-editor__toolbar-button", title: t('toolbar.italic'), onClick: () => updateSelectedTextItem({ fontStyle: selectedItem.fontStyle === 'italic' ? 'normal' : 'italic' }), children: jsx("em", { children: "I" }) }), jsx("button", { className: "dk-image-editor__toolbar-button", title: t('toolbar.underline'), onClick: () => updateSelectedTextItem({ textDecoration: selectedItem.textDecoration === 'underline' ? 'none' : 'underline' }), children: jsx("u", { children: "U" }) }), jsx("button", { className: "dk-image-editor__toolbar-button", title: t('toolbar.strikethrough'), onClick: () => updateSelectedTextItem({ textDecoration: selectedItem.textDecoration === 'line-through' ? 'none' : 'line-through' }), children: jsx("s", { children: "S" }) }), jsx("button", { className: "dk-image-editor__toolbar-button", title: t('toolbar.font.smaller'), onClick: () => updateSelectedTextItem({
                            fontSize: Math.max(TEXT_CONFIG.MIN_FONT_SIZE, (selectedItem.fontSize || UI_CONSTANTS.DEFAULT_FONT_SIZE) - TEXT_CONFIG.FONT_SIZE_STEP),
                        }), children: "A-" }), jsx("button", { className: "dk-image-editor__toolbar-button", title: t('toolbar.font.larger'), onClick: () => updateSelectedTextItem({
                            fontSize: Math.min(TEXT_CONFIG.MAX_FONT_SIZE, (selectedItem.fontSize || UI_CONSTANTS.DEFAULT_FONT_SIZE) + TEXT_CONFIG.FONT_SIZE_STEP),
                        }), children: "A+" }), jsx(ColorPicker, { value: selectedItem.color || '#000000', onChange: (color) => updateSelectedTextItem({ color }), title: t('toolbar.text.color') })] })), isGraphicSelected && !isMultiSelect && (jsxs(Fragment, { children: [jsx("div", { style: { width: '1px', height: '24px', background: 'rgba(255,255,255,0.3)', margin: '0 4px' } }), jsx(ColorPicker, { value: selectedItem?.strokeColor || selectedItem?.color || '#000000', onChange: handleStrokeColorChange, title: t('toolbar.stroke.color') }), jsx("select", { value: selectedItem?.strokeWidth || 2, onChange: (e) => handleStrokeWidthChange(Number(e.target.value)), style: {
                            background: 'transparent',
                            border: '#ffffff20',
                            borderRadius: '4px',
                            color: 'white',
                            fontSize: '12px',
                        }, title: t('toolbar.stroke.width'), children: [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((width) => (jsxs("option", { value: width, style: { background: '#333', color: 'white' }, children: [width, "px"] }, width))) }), selectedItem?.type !== 'line' && selectedItem?.type !== 'sharpie' && selectedItem?.type !== 'path' && (jsxs("div", { className: "d-flex align-items-center gap-50", children: [jsx(ColorPicker, { value: selectedItem?.fillColor || '#ffffff', onChange: handleFillColorChange, title: t('toolbar.fill.color') }), selectedItem?.fillColor && selectedItem?.fillColor !== 'transparent' && (jsx("span", { className: "text-white hover", onClick: handleClearFill, title: t('toolbar.clear.fill'), children: "\u2715" }))] }))] }))] }));
};

const TextEditor = ({ editingText, editingValue, editingTextItem, canvasRef, zoomLevel, onValueChange, onBlur, }) => {
    if (!editingText || !canvasRef.current)
        return null;
    const canvas = canvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    const parentRect = canvas.parentElement?.getBoundingClientRect();
    const canvasScale = canvasRect.width / canvas.width;
    const left = (editingText.x / canvas.width) * canvasRect.width + (canvasScale > 1 ? 0 : (canvasRect.left || 0) - (parentRect?.left || 0));
    const top = (editingText.y / canvas.height) * canvasRect.height +
        (canvasScale > 1 ? 0 : (canvasRect.top || 0) - (parentRect?.top || 0)) -
        (editingTextItem?.fontSize || UI_CONSTANTS.DEFAULT_FONT_SIZE) * canvasScale;
    return (jsx("div", { contentEditable: true, suppressContentEditableWarning: true, onInput: (e) => onValueChange(e.currentTarget.textContent || ''), onBlur: (e) => {
            if (e.relatedTarget && e.relatedTarget.closest('.floatingToolbar')) {
                return;
            }
            onBlur();
        }, onKeyDown: (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.blur();
            }
        }, ref: (el) => {
            if (el && editingText) {
                el.textContent = editingValue;
                el.focus();
                const range = document.createRange();
                range.selectNodeContents(el);
                const selection = window.getSelection();
                selection?.removeAllRanges();
                selection?.addRange(range);
            }
        }, style: {
            position: 'absolute',
            left,
            top,
            zIndex: 1000,
            padding: '0',
            border: '1px solid #007bff',
            borderRadius: '2px',
            background: 'transparent',
            color: editingTextItem?.color || 'white',
            fontSize: `${(editingTextItem?.fontSize || UI_CONSTANTS.DEFAULT_FONT_SIZE) * zoomLevel}px`,
            fontWeight: editingTextItem?.fontWeight || 'normal',
            fontStyle: editingTextItem?.fontStyle || 'normal',
            textDecoration: editingTextItem?.textDecoration || 'none',
            minWidth: `${100 * zoomLevel}px`,
            outline: 'none',
            whiteSpace: 'nowrap',
            transform: editingText.rotation ? `rotate(${editingText.rotation}deg)` : 'none',
            transformOrigin: 'left baseline',
            lineHeight: '1',
        } }));
};

const EditorCanvas = ({ onMouseDown, onMouseMove, onMouseUp, onDoubleClick, }) => {
    const { activeTool, hasSelection, zoomLevel } = useUIState();
    const { editingText, editingValue, editingTextItem } = useTextEditing();
    const { canvasRef, selectionPluginRef, editorRef } = useEditorRefs();
    const { updateTextEditing, updateUIState } = useEditorActions();
    const handleTextItemChange = (item) => {
        updateTextEditing({ editingTextItem: item });
    };
    const handleValueChange = (value) => {
        updateTextEditing({ editingValue: value });
    };
    const handleTextBlur = () => {
        // 文本编辑完成：保存文本并清理编辑状态
        if (editingTextItem && editingTextItem.id) {
            const state = editorRef.current?.getState();
            if (state) {
                const updatedText = {
                    ...editingTextItem,
                    text: editingValue,
                    id: editingTextItem.id,
                    type: editingTextItem.type || 'text',
                    x: editingTextItem.x || 0,
                    y: editingTextItem.y || 0,
                    color: editingTextItem.color || '#000000',
                    strokeWidth: editingTextItem.strokeWidth || 1,
                };
                const annotations = [...(state.annotations || []), updatedText];
                editorRef.current?.setState({ annotations });
                updateTextEditing({ editingText: null, editingValue: '', editingTextItem: null });
                updateUIState({ hasSelection: false });
                editorRef.current?.render();
            }
        }
    };
    const handleLayerAction = (action) => {
        const selectedItem = selectionPluginRef.current?.selectedItem;
        if (selectedItem && editorRef.current) {
            const methodMap = {
                front: 'moveToFront',
                back: 'moveToBack',
                forward: 'moveForward',
                backward: 'moveBackward'
            };
            editorRef.current[methodMap[action]](selectedItem.id);
        }
    };
    return (jsxs("div", { className: "dk-image-editor__canvas", children: [jsx(FloatingToolbar, { visible: hasSelection || !!editingText, editingText: editingText, editingTextItem: editingTextItem, selectionPluginRef: selectionPluginRef, onDelete: () => selectionPluginRef.current?.deleteSelected(), onCopy: () => selectionPluginRef.current?.copySelected(), onMoveToFront: () => handleLayerAction('front'), onMoveToBack: () => handleLayerAction('back'), onMoveUp: () => handleLayerAction('forward'), onMoveDown: () => handleLayerAction('backward'), onTextItemChange: handleTextItemChange }), jsx(TextEditor, { editingText: editingText, editingValue: editingValue, editingTextItem: editingTextItem, canvasRef: canvasRef, zoomLevel: zoomLevel, onValueChange: handleValueChange, onBlur: handleTextBlur }), jsx("canvas", { ref: canvasRef, className: `dk-image-editor__image-canvas dk-image-editor__image-canvas--${activeTool}`, onMouseDown: onMouseDown, onMouseMove: onMouseMove, onMouseUp: onMouseUp, onDoubleClick: onDoubleClick })] }));
};

function IconRedo(props) {
    const width = props.size || props.width || 16;
    const height = props.size || props.height || 16;
    return (jsxs("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { d: "M21 7v6h-6" }), jsx("path", { d: "M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7" })] }));
}

function IconUndo(props) {
    const width = props.size || props.width || 16;
    const height = props.size || props.height || 16;
    return (jsxs("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { d: "M3 7v6h6" }), jsx("path", { d: "M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" })] }));
}

function IconUpload(props) {
    const width = props.size || props.width || 16;
    const height = props.size || props.height || 16;
    return (jsxs("svg", { ...props, width: width, height: height, className: props.className, style: props.style, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), jsx("polyline", { points: "7,10 12,5 17,10" }), jsx("line", { x1: "12", y1: "5", x2: "12", y2: "15" })] }));
}

const IconZoomIn = ({ size = 16, className = '' }) => {
    return (jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className, children: [jsx("circle", { cx: "11", cy: "11", r: "8" }), jsx("path", { d: "m21 21-4.35-4.35" }), jsx("line", { x1: "11", y1: "8", x2: "11", y2: "14" }), jsx("line", { x1: "8", y1: "11", x2: "14", y2: "11" })] }));
};

const IconZoomOut = ({ size = 16, className = '' }) => {
    return (jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className, children: [jsx("circle", { cx: "11", cy: "11", r: "8" }), jsx("path", { d: "m21 21-4.35-4.35" }), jsx("line", { x1: "8", y1: "11", x2: "14", y2: "11" })] }));
};

const ZOOM_CONFIG = {
    MIN_ZOOM: 0.5,
    MAX_ZOOM: 3,
    ZOOM_IN_FACTOR: 1.2,
    ZOOM_OUT_FACTOR: 0.8,
    TRANSITION_DURATION: 200,
};
const ZoomControls = () => {
    const { zoomLevel } = useUIState();
    const { updateUIState } = useEditorActions();
    const { canvasRef, selectionPluginRef } = useEditorRefs();
    const { t } = useTranslation();
    const timeoutRef = useRef(null);
    const toggleOverlayVisibility = (visible) => {
        document.querySelectorAll('.dk-img-editor-selection-overlay').forEach((overlay) => {
            overlay.style.display = visible ? '' : 'none';
        });
    };
    const refreshSelection = () => {
        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            selectionPluginRef.current?.refreshSelection?.();
            toggleOverlayVisibility(true);
        }, ZOOM_CONFIG.TRANSITION_DURATION);
    };
    const applyZoom = (newScale, shouldRefresh = true) => {
        const canvas = canvasRef.current;
        const container = canvas?.parentElement;
        if (!canvas || !container)
            return;
        toggleOverlayVisibility(false);
        const containerRect = container.getBoundingClientRect();
        const scaledWidth = canvas.width * newScale;
        const scaledHeight = canvas.height * newScale;
        canvas.style.transform = `scale(${newScale})`;
        // canvas.style.transition = 'transform 0.2s ease'
        updateUIState({ zoomLevel: newScale });
        if (newScale <= 1 || (scaledWidth <= containerRect.width && scaledHeight <= containerRect.height)) {
            canvas.style.transformOrigin = 'center';
            container.scrollTo({ left: 0, top: 0 });
        }
        else {
            const viewportCenterX = (container.scrollLeft + containerRect.width / 2) / zoomLevel;
            const viewportCenterY = (container.scrollTop + containerRect.height / 2) / zoomLevel;
            const newScrollX = viewportCenterX * newScale - containerRect.width / 2;
            const newScrollY = viewportCenterY * newScale - containerRect.height / 2;
            canvas.style.transformOrigin = '0 0';
            container.scrollTo({
                left: Math.max(0, newScrollX),
                top: Math.max(0, newScrollY),
            });
        }
        if (shouldRefresh)
            refreshSelection();
    };
    const handleZoomIn = () => {
        const newScale = Math.min(ZOOM_CONFIG.MAX_ZOOM, zoomLevel * ZOOM_CONFIG.ZOOM_IN_FACTOR);
        applyZoom(newScale);
    };
    const handleZoomReset = () => applyZoom(1);
    const handleZoomOut = () => {
        const newScale = Math.max(ZOOM_CONFIG.MIN_ZOOM, zoomLevel * ZOOM_CONFIG.ZOOM_OUT_FACTOR);
        applyZoom(newScale);
    };
    return (jsxs(Fragment, { children: [jsx("button", { onClick: handleZoomIn, className: "dk-image-editor__action-btn", title: t('header.zoom.in'), children: jsx(IconZoomIn, { size: 16 }) }), jsxs("button", { onClick: handleZoomReset, className: "dk-image-editor__action-btn", title: t('header.zoom.reset'), children: [Math.round(zoomLevel * 100), "%"] }), jsx("button", { onClick: handleZoomOut, className: "dk-image-editor__action-btn", title: t('header.zoom.out'), children: jsx(IconZoomOut, { size: 16 }) })] }));
};

const EditorHeader = ({ onClose, onConfirm, onUndo, onRedo, onSave, onUpload, showCloseButton = true, showDownloadButton = true, }) => {
    const { t } = useTranslation();
    const { canvasRef, selectionPluginRef } = useEditorRefs();
    const fileInputRef = useRef(null);
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file && onUpload) {
            onUpload(file);
        }
        // Reset input value to allow selecting the same file again
        event.target.value = '';
    };
    return (jsxs("div", { className: "dk-image-editor__header", children: [jsxs("div", { className: "dk-image-editor__header-left", children: [jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleFileChange, style: { display: 'none' } }), jsx("button", { onClick: handleUploadClick, className: "dk-image-editor__action-btn", title: t('header.upload'), children: jsx(IconUpload, {}) }), jsx("button", { onClick: () => {
                            onUndo();
                            selectionPluginRef.current?.clearSelection();
                        }, className: "dk-image-editor__action-btn", title: t('header.undo'), children: jsx(IconUndo, {}) }), jsx("button", { onClick: () => {
                            onRedo();
                            selectionPluginRef.current?.clearSelection();
                        }, className: "dk-image-editor__action-btn", title: t('header.redo'), children: jsx(IconRedo, {}) }), jsx(ZoomControls, {})] }), jsxs("div", { className: "dk-image-editor__header-right ms-2", children: [showDownloadButton && (jsx("button", { onClick: onSave, className: "dk-image-editor__save-btn", children: t('header.download') })), onConfirm && (jsx("button", { onClick: onConfirm, className: "dk-image-editor__confirm-btn", children: t('header.confirm') })), showCloseButton && (jsx("button", { onClick: () => {
                            if (confirm(t('header.close.confirm'))) {
                                onClose();
                            }
                        }, className: "dk-image-editor__action-btn", children: t('header.close') }))] })] }));
};

const ToolSidebar = ({ tools }) => {
    const { activeTool } = useUIState();
    const { updateUIState } = useEditorActions();
    const { t } = useTranslation();
    return (jsx("div", { className: "dk-image-editor__sidebar", children: tools.map((tool) => (jsxs("button", { className: `dk-image-editor__tool-btn ${activeTool === tool.id ? 'dk-image-editor__tool-btn--active' : ''}`, onClick: () => updateUIState({ activeTool: tool.id }), children: [jsx("span", { className: "dk-image-editor__tool-icon", children: tool.icon }), jsx("span", { className: "dk-image-editor__tool-name", children: t(`tool.${tool.id}`) })] }, tool.id))) }));
};

const useEditorPlugins = () => {
    const { editorRef, cropPluginRef, filterPluginRef, annotatePluginRef, stickerPluginRef, finetunePluginRef, imagePluginRef, selectionPluginRef, advancedFilterPluginRef, } = useEditorRefs();
    const applyAdvancedFilter = async (imageData, filterType) => {
        if (!advancedFilterPluginRef.current) {
            throw new Error('AdvancedFilterPlugin not initialized');
        }
        console.log(' advancedFilterPluginRef.current', advancedFilterPluginRef.current, imageData, filterType);
        return await advancedFilterPluginRef.current.applyAdvancedFilter(imageData, filterType);
    };
    return {
        editorRef,
        cropPluginRef,
        filterPluginRef,
        annotatePluginRef,
        stickerPluginRef,
        finetunePluginRef,
        imagePluginRef,
        selectionPluginRef,
        advancedFilterPluginRef,
        applyAdvancedFilter,
    };
};

class EditorCore {
    constructor(canvas) {
        this.image = null;
        this.originalImage = null;
        this.imageDisplay = { x: 0, y: 0, width: 0, height: 0 };
        this.history = [];
        this.historyIndex = -1;
        this.plugins = new Map();
        this.eventListeners = new Map();
        this.resizeObserver = null;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.state = this.getInitialState();
        this.setupCanvasResize();
    }
    isSticker(item) {
        return 'sticker' in item;
    }
    setupCanvasResize() {
        this.resizeObserver = new ResizeObserver(() => this.updateCanvasSize());
        this.canvas.parentElement && this.resizeObserver.observe(this.canvas.parentElement);
    }
    updateCanvasSize() {
        const container = this.canvas.parentElement;
        if (!container)
            return;
        const rect = container.getBoundingClientRect();
        this.canvas.width = Math.floor(rect.width);
        this.canvas.height = Math.floor(rect.height);
        if (this.image) {
            this.calculateImageDisplay();
            this.render();
        }
    }
    calculateImageDisplay() {
        if (!this.image)
            return;
        const imageAspect = this.image.width / this.image.height;
        const canvasAspect = this.canvas.width / this.canvas.height;
        const scale = 0.8;
        const [displayWidth, displayHeight] = imageAspect > canvasAspect
            ? [this.canvas.width * scale, (this.canvas.width * scale) / imageAspect]
            : [this.canvas.height * scale * imageAspect, this.canvas.height * scale];
        const offsetX = (this.canvas.width - displayWidth) / 2;
        const offsetY = (this.canvas.height - displayHeight) / 2;
        const isFirstTime = this.imageDisplay.width === 0;
        this.imageDisplay = { x: offsetX, y: offsetY, width: displayWidth, height: displayHeight };
        if (isFirstTime) {
            this.setState({ crop: { x: offsetX, y: offsetY, width: displayWidth, height: displayHeight } }, false);
        }
    }
    getInitialState() {
        return {
            crop: { x: 0, y: 0, width: 0, height: 0 },
            rotation: 0,
            flipX: false,
            flipY: false,
            scale: 1,
            skewX: 0,
            skewY: 0,
            brightness: 0,
            contrast: 0,
            saturation: 0,
            exposure: 0,
            gamma: 0,
            vignette: 0,
            filter: 'none',
            appliedFilters: [],
            annotations: [],
            stickers: [],
            images: [],
            backgroundColor: 'transparent',
            frame: 'none',
            filterCounts: {},
        };
    }
    on(event, callback) {
        if (!this.eventListeners.has(event))
            this.eventListeners.set(event, []);
        this.eventListeners.get(event).push(callback);
    }
    off(event, callback) {
        const listeners = this.eventListeners.get(event);
        if (!listeners)
            return;
        const index = listeners.indexOf(callback);
        if (index > -1)
            listeners.splice(index, 1);
    }
    emit(event, data) {
        this.eventListeners.get(event)?.forEach((callback) => callback(data));
    }
    addPlugin(plugin) {
        this.plugins.set(plugin.name, plugin);
        plugin.init?.(this.canvas, this.ctx);
        plugin.initialize?.(this);
        plugin.updateStickers?.(this.state.stickers);
        plugin.updateAnnotations?.(this.state.annotations);
    }
    removePlugin(name) {
        const plugin = this.plugins.get(name);
        if (plugin) {
            plugin.destroy();
            this.plugins.delete(name);
        }
    }
    getState() {
        return { ...this.state };
    }
    getImageDisplay() {
        return { ...this.imageDisplay };
    }
    getOriginalImageSize() {
        return this.image ? { width: this.image.width, height: this.image.height } : { width: 0, height: 0 };
    }
    setState(updates, saveToHistory = true) {
        const addCanvasState = (item) => item.canvasRotation === undefined
            ? {
                ...item,
                canvasRotation: this.state.rotation,
                canvasFlipX: this.state.flipX,
                canvasFlipY: this.state.flipY,
                canvasScale: this.state.scale,
                canvasSkewX: this.state.skewX,
                canvasSkewY: this.state.skewY,
            }
            : item;
        if (updates.stickers)
            updates.stickers = updates.stickers.map(addCanvasState);
        if (updates.annotations)
            updates.annotations = updates.annotations.map(addCanvasState);
        if (updates.images)
            updates.images = updates.images.map(addCanvasState);
        const newState = { ...this.state, ...updates };
        if (saveToHistory)
            this.saveToHistory(newState);
        this.state = newState;
        this.plugins.forEach((plugin) => {
            if (updates.stickers)
                plugin.updateStickers?.(updates.stickers);
            if (updates.annotations)
                plugin.updateAnnotations?.(updates.annotations);
        });
        this.emit('stateChange', newState);
        this.render();
    }
    saveToHistory(state) {
        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(JSON.parse(JSON.stringify(state)));
        this.historyIndex++;
        if (this.history.length > 50) {
            this.history.shift();
            this.historyIndex--;
        }
    }
    restoreState(index) {
        this.historyIndex = index;
        const state = this.history[index];
        if (!state)
            return;
        this.state = state;
        this.emit('stateChange', this.state);
        this.render();
    }
    undo() {
        if (this.historyIndex > 0)
            this.restoreState(this.historyIndex - 1);
    }
    redo() {
        if (this.historyIndex < this.history.length - 1)
            this.restoreState(this.historyIndex + 1);
    }
    async loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                this.image = img;
                this.originalImage = img.cloneNode();
                this.updateCanvasSize();
                this.calculateImageDisplay();
                this.emit('imageLoaded', img);
                resolve();
            };
            img.onerror = reject;
            if (typeof src === 'string') {
                img.src = src;
            }
            else {
                img.src = URL.createObjectURL(src);
            }
        });
    }
    render() {
        if (!this.image)
            return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // 绘制背景
        if (this.state.backgroundColor !== 'transparent') {
            this.ctx.fillStyle = this.state.backgroundColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        // 检查是否有crop插件激活
        const cropPlugin = this.plugins.get('crop');
        const isCropActive = cropPlugin && cropPlugin.isActive;
        this.ctx.save();
        // 只在非crop模式下应用裁剪蒙版
        if (!isCropActive && this.state.crop) {
            this.ctx.beginPath();
            this.ctx.rect(this.state.crop.x, this.state.crop.y, this.state.crop.width, this.state.crop.height);
            this.ctx.clip();
        }
        // 应用变换到图片中心
        const centerX = this.imageDisplay.x + this.imageDisplay.width / 2;
        const centerY = this.imageDisplay.y + this.imageDisplay.height / 2;
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate((this.state.rotation * Math.PI) / 180);
        this.ctx.scale((this.state.flipX ? -1 : 1) * this.state.scale, (this.state.flipY ? -1 : 1) * this.state.scale);
        this.ctx.transform(1, this.state.skewY, this.state.skewX, 1, 0, 0);
        this.applyFilters();
        this.ctx.drawImage(this.image, -this.imageDisplay.width / 2, -this.imageDisplay.height / 2, this.imageDisplay.width, this.imageDisplay.height);
        // 应用暗角效果
        if (this.state.vignette !== 0) {
            this.applyVignette(this.ctx, this.state.vignette);
        }
        this.ctx.restore();
        this.ctx.restore();
        // 为所有元素应用裁剪蒙版（始终应用）
        this.ctx.save();
        if (this.state.crop) {
            this.ctx.beginPath();
            this.ctx.rect(this.state.crop.x, this.state.crop.y, this.state.crop.width, this.state.crop.height);
            this.ctx.clip();
        }
        // 合并所有元素并按zIndex排序
        const allItems = this.getAllItems().sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
        // 按层级顺序绘制所有元素
        allItems.forEach((item) => {
            this.ctx.save();
            // 检查canvas变化并应用整体变换
            this.applyCanvasTransformForItem(item);
            if (this.isSticker(item)) {
                this.drawSticker(item);
            }
            else if (item.type === 'image') {
                this.drawImage(item);
            }
            else {
                this.drawAnnotation(item);
            }
        });
        this.ctx.restore();
        // 渲染插件（如裁剪框），但不包括selection插件
        this.plugins.forEach((plugin) => {
            if (plugin.render && plugin.name !== 'selection') {
                plugin.render(this.ctx);
            }
        });
        // 最后渲染选中框，确保在最上层
        const selectionPlugin = this.plugins.get('selection');
        if (selectionPlugin && selectionPlugin.render) {
            selectionPlugin.render(this.ctx);
        }
        // 先绘制框架，再绘制其他内容
        if (this.state.frame !== 'none') {
            this.drawFrame(this.state.frame);
        }
        this.emit('render');
    }
    applyFiltersToContext(ctx) {
        const { brightness, contrast, saturation, exposure, gamma, filter } = this.state;
        const filters = [];
        if (brightness)
            filters.push(`brightness(${100 + brightness}%)`);
        if (contrast)
            filters.push(`contrast(${100 + contrast}%)`);
        if (saturation)
            filters.push(`saturate(${100 + saturation}%)`);
        if (exposure)
            filters.push(`brightness(${100 + exposure * 0.5}%)`);
        if (gamma)
            filters.push(`contrast(${100 + gamma * 0.3}%)`);
        const filterMap = {
            monoDefault: 'grayscale(100%)',
            sepiaDefault: 'sepia(100%)',
            warm: 'sepia(20%) saturate(120%) hue-rotate(15deg)',
            cold: 'saturate(120%) hue-rotate(-15deg)',
            chrome: 'contrast(120%) saturate(150%) hue-rotate(10deg)',
            fade: 'contrast(80%) brightness(110%) saturate(80%)',
            blur: 'blur(3px)',
        };
        if (filterMap[filter])
            filters.push(filterMap[filter]);
        ctx.filter = filters.join(' ') || 'none';
    }
    applyFilters() {
        this.applyFiltersToContext(this.ctx);
    }
    applyVignette(ctx, intensity) {
        if (!intensity)
            return;
        const { width, height } = this.imageDisplay;
        const maxRadius = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
        const minRadius = maxRadius * 0.3;
        const gradient = ctx.createRadialGradient(0, 0, minRadius, 0, 0, maxRadius);
        const alpha = (Math.abs(intensity) / 100) * 0.8;
        if (intensity > 0) {
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
            gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
            gradient.addColorStop(1, `rgba(0, 0, 0, ${alpha})`);
        }
        else {
            gradient.addColorStop(0, `rgba(0, 0, 0, ${alpha})`);
            gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = gradient;
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.restore();
    }
    drawAnnotation(annotation) {
        const strokeColor = annotation.strokeColor || annotation.color;
        const fillColor = annotation.fillColor || (annotation.type === 'text' ? annotation.color : 'transparent');
        this.ctx.strokeStyle = strokeColor;
        this.ctx.fillStyle = annotation.type === 'text' ? annotation.color : fillColor;
        this.ctx.lineWidth = annotation.strokeWidth;
        this.applyRotation(annotation);
        this.drawAnnotationShape(annotation);
        this.ctx.restore();
    }
    applyRotation(annotation) {
        if (!annotation.rotation)
            return;
        const { x, y, width = 0, height = 0, fontSize = 24, type } = annotation;
        const [centerX, centerY] = type === 'text' ? [x + width / 2, y - fontSize / 2] : [x + width / 2, y + height / 2];
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate((annotation.rotation * Math.PI) / 180);
        this.ctx.translate(-centerX, -centerY);
    }
    drawAnnotationShape(annotation) {
        const { type, x, y, width = 0, height = 0 } = annotation;
        switch (type) {
            case 'text':
                this.drawText(annotation);
                break;
            case 'rectangle':
                this.drawRectangle(x, y, width, height);
                break;
            case 'ellipse':
                this.drawEllipse(x, y, width, height);
                break;
            case 'line':
                this.drawLine(x, y, width, height);
                break;
            case 'arrow':
                this.drawArrow(annotation);
                break;
            case 'sharpie':
            case 'path':
                this.drawPath(annotation.points);
                break;
        }
    }
    drawText(annotation) {
        if (!annotation.text || !annotation.fontSize)
            return;
        const fontWeight = annotation.fontWeight || 'normal';
        const fontStyle = annotation.fontStyle || 'normal';
        this.ctx.font = `${fontStyle} ${fontWeight} ${annotation.fontSize}px Arial`;
        const textWidth = this.ctx.measureText(annotation.text).width;
        const decorationLineWidth = Math.max(1, annotation.fontSize / 16);
        const textDecoration = annotation.textDecoration;
        if (textDecoration === 'underline') {
            this.drawTextDecoration(annotation.x, annotation.y + 2, textWidth, decorationLineWidth);
        }
        else if (textDecoration === 'line-through') {
            this.drawTextDecoration(annotation.x, annotation.y - annotation.fontSize / 3, textWidth, decorationLineWidth);
        }
        this.ctx.fillText(annotation.text, annotation.x, annotation.y);
    }
    drawTextDecoration(x, y, width, lineWidth) {
        const originalLineWidth = this.ctx.lineWidth;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + width, y);
        this.ctx.stroke();
        this.ctx.lineWidth = originalLineWidth;
    }
    drawRectangle(x, y, width, height) {
        if (!width || !height)
            return;
        const fillColor = this.ctx.fillStyle;
        if (fillColor !== 'transparent') {
            this.ctx.fillRect(x, y, width, height);
        }
        this.ctx.strokeRect(x, y, width, height);
    }
    drawEllipse(x, y, width, height) {
        if (!width || !height)
            return;
        this.ctx.beginPath();
        this.ctx.ellipse(x + width / 2, y + height / 2, Math.abs(width / 2), Math.abs(height / 2), 0, 0, 2 * Math.PI);
        const fillColor = this.ctx.fillStyle;
        if (fillColor !== 'transparent')
            this.ctx.fill();
        this.ctx.stroke();
    }
    drawLine(x, y, width, height) {
        if (!width || !height)
            return;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + width, y + height);
        this.ctx.stroke();
    }
    drawArrow(annotation) {
        const { x, y, width = 0, height = 0, strokeWidth } = annotation;
        if (!width || !height)
            return;
        const endX = x + width;
        const endY = y + height;
        const headSize = Math.max(8, strokeWidth * 2);
        const angle = Math.atan2(height, width);
        // Draw main line
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(endX - headSize * Math.cos(angle + Math.PI / 4), endY - headSize * Math.sin(angle + Math.PI / 4));
        this.ctx.lineTo(endX, endY);
        this.ctx.lineTo(endX - headSize * Math.cos(angle - Math.PI / 4), endY - headSize * Math.sin(angle - Math.PI / 4));
        this.ctx.stroke();
    }
    drawPath(points) {
        if (!points || points.length < 2)
            return;
        this.ctx.beginPath();
        const firstPoint = points[0];
        if (firstPoint) {
            this.ctx.moveTo(firstPoint.x, firstPoint.y);
            points.slice(1).forEach((point) => this.ctx.lineTo(point.x, point.y));
        }
        this.ctx.stroke();
    }
    drawImage(imageItem) {
        const { x, y, rotation, width, height, image } = imageItem;
        this.ctx.translate(x, y);
        this.ctx.rotate((rotation * Math.PI) / 180);
        this.ctx.drawImage(image, -width / 2, -height / 2, width, height);
        this.ctx.restore();
    }
    drawSticker(sticker) {
        const { x, y, rotation, size, type, content, image } = sticker;
        this.ctx.translate(x, y);
        this.ctx.rotate((rotation * Math.PI) / 180);
        if (type === 'emoji') {
            this.ctx.font = `${size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(content, 0, 0);
        }
        else if (type === 'image' && image) {
            this.ctx.drawImage(image, -size / 2, -size / 2, size, size);
        }
        this.ctx.restore();
    }
    drawFrame(frameType) {
        if (!this.state.crop)
            return;
        this.ctx.save();
        const { x, y, width, height } = this.state.crop;
        switch (frameType) {
            case 'undefined':
            case 'none':
                // No frame
                break;
            case 'solidSharp':
                // Mat frame
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 5;
                this.ctx.strokeRect(x, y, width, height);
                break;
            case 'solidRound':
                // Bevel frame - white border with rounded inner edge
                this.ctx.fillStyle = '#fff';
                const frameWidth = 5;
                const radius = width * 0.03;
                // Draw frame using path difference
                this.ctx.beginPath();
                // Outer rectangle
                this.ctx.rect(x - frameWidth, y - frameWidth, width + 2 * frameWidth, height + 2 * frameWidth);
                // Inner rounded rectangle (counter-clockwise to create hole)
                this.ctx.roundRect(x, y, width, height, radius);
                this.ctx.fill('evenodd');
                break;
            case 'lineSingle':
                // Line frame
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 3;
                const lineInset = width * 0.05;
                this.ctx.strokeRect(x + lineInset, y + lineInset, width - 2 * lineInset, height - 2 * lineInset);
                break;
            case 'lineMultiple':
                // Zebra frame
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 3;
                const inset = width * 0.075;
                this.ctx.strokeRect(x + inset, y + inset, width - 2 * inset, height - 2 * inset);
                this.ctx.strokeRect(x + inset * 0.5, y + inset * 0.5, width - inset, height - inset);
                break;
            case 'edgeCross':
                // Lumber frame
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 3;
                const crossInset = width * 0.05;
                // Only draw within crop area
                this.ctx.beginPath();
                // Top horizontal line
                this.ctx.moveTo(x, y + crossInset);
                this.ctx.lineTo(x + width, y + crossInset);
                // Bottom horizontal line
                this.ctx.moveTo(x, y + height - crossInset);
                this.ctx.lineTo(x + width, y + height - crossInset);
                // Left vertical line
                this.ctx.moveTo(x + crossInset, y);
                this.ctx.lineTo(x + crossInset, y + height);
                // Right vertical line
                this.ctx.moveTo(x + width - crossInset, y);
                this.ctx.lineTo(x + width - crossInset, y + height);
                this.ctx.stroke();
                break;
            case 'edgeOverlap':
                // edgeSeparate
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 3;
                const separateInset = width * 0.075;
                const cornerInset = width * 0.05;
                // Top
                this.ctx.beginPath();
                this.ctx.moveTo(x + cornerInset, y + separateInset);
                this.ctx.lineTo(x + width - cornerInset, y + separateInset);
                this.ctx.stroke();
                // Bottom
                this.ctx.beginPath();
                this.ctx.moveTo(x + cornerInset, y + height - separateInset);
                this.ctx.lineTo(x + width - cornerInset, y + height - separateInset);
                this.ctx.stroke();
                // Left
                this.ctx.beginPath();
                this.ctx.moveTo(x + separateInset, y + cornerInset);
                this.ctx.lineTo(x + separateInset, y + height - cornerInset);
                this.ctx.stroke();
                // Right
                this.ctx.beginPath();
                this.ctx.moveTo(x + width - separateInset, y + cornerInset);
                this.ctx.lineTo(x + width - separateInset, y + height - cornerInset);
                this.ctx.stroke();
                break;
            case 'edgeSeparate':
                // Inset frame
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 3;
                const overlapInset = width * 0.03125;
                const overlapCorner = width * 0.05;
                // Top
                this.ctx.beginPath();
                this.ctx.moveTo(x + overlapCorner, y + overlapInset);
                this.ctx.lineTo(x + width - overlapCorner, y + overlapInset);
                this.ctx.stroke();
                // Bottom
                this.ctx.beginPath();
                this.ctx.moveTo(x + overlapCorner, y + height - overlapInset);
                this.ctx.lineTo(x + width - overlapCorner, y + height - overlapInset);
                this.ctx.stroke();
                // Left
                this.ctx.beginPath();
                this.ctx.moveTo(x + overlapInset, y + overlapCorner);
                this.ctx.lineTo(x + overlapInset, y + height - overlapCorner);
                this.ctx.stroke();
                // Right
                this.ctx.beginPath();
                this.ctx.moveTo(x + width - overlapInset, y + overlapCorner);
                this.ctx.lineTo(x + width - overlapInset, y + height - overlapCorner);
                this.ctx.stroke();
                break;
            case 'hook':
                // Hook frame
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 3;
                const hookSize = width * 0.075;
                const hookInset = width * 0.05;
                // Top-left corner
                this.ctx.beginPath();
                this.ctx.moveTo(x + hookInset, y + hookInset + hookSize);
                this.ctx.lineTo(x + hookInset, y + hookInset);
                this.ctx.lineTo(x + hookInset + hookSize, y + hookInset);
                this.ctx.stroke();
                // Top-right corner
                this.ctx.beginPath();
                this.ctx.moveTo(x + width - hookInset - hookSize, y + hookInset);
                this.ctx.lineTo(x + width - hookInset, y + hookInset);
                this.ctx.lineTo(x + width - hookInset, y + hookInset + hookSize);
                this.ctx.stroke();
                // Bottom-left corner
                this.ctx.beginPath();
                this.ctx.moveTo(x + hookInset, y + height - hookInset - hookSize);
                this.ctx.lineTo(x + hookInset, y + height - hookInset);
                this.ctx.lineTo(x + hookInset + hookSize, y + height - hookInset);
                this.ctx.stroke();
                // Bottom-right corner
                this.ctx.beginPath();
                this.ctx.moveTo(x + width - hookInset - hookSize, y + height - hookInset);
                this.ctx.lineTo(x + width - hookInset, y + height - hookInset);
                this.ctx.lineTo(x + width - hookInset, y + height - hookInset - hookSize);
                this.ctx.stroke();
                break;
            case 'polaroid':
                // Polaroid frame - white border around image
                this.ctx.fillStyle = '#fff';
                const topMargin = width * 0.05;
                const sideMargin = width * 0.05;
                const bottomMargin = width * 0.1;
                // Draw white border around image with overlapping edges
                this.ctx.fillRect(x - sideMargin, y - topMargin, width + 2 * sideMargin, topMargin); // top
                this.ctx.fillRect(x - sideMargin, y - topMargin, sideMargin, height + topMargin + bottomMargin); // left
                this.ctx.fillRect(x + width, y - topMargin, sideMargin, height + topMargin + bottomMargin); // right
                this.ctx.fillRect(x - sideMargin, y + height, width + 2 * sideMargin, bottomMargin); // bottom
                break;
        }
        this.ctx.restore();
    }
    getImageData() {
        if (!this.image)
            return null;
        // 创建显示尺寸的临时画布（更小，处理更快）
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = Math.round(this.imageDisplay.width);
        tempCanvas.height = Math.round(this.imageDisplay.height);
        // 绘制当前图像到显示尺寸
        tempCtx.drawImage(this.image, 0, 0, tempCanvas.width, tempCanvas.height);
        return tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    }
    resetToOriginal() {
        if (this.originalImage) {
            this.image = this.originalImage.cloneNode();
            this.render();
        }
    }
    setImageData(imageData) {
        // 创建临时画布来替换当前图像
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = imageData.width;
        tempCanvas.height = imageData.height;
        tempCtx.putImageData(imageData, 0, 0);
        // 创建新的图像对象替换当前图像
        const newImage = new Image();
        newImage.onload = () => {
            this.image = newImage;
            this.render();
        };
        newImage.src = tempCanvas.toDataURL();
    }
    async export(format = 'blob', customWidth, customHeight) {
        if (!this.originalImage)
            throw new Error('No image loaded');
        // 计算导出尺寸（按原图Crop比例）
        const originalToDisplayScale = this.originalImage.width / this.imageDisplay.width;
        let exportWidth = customWidth || Math.round(this.state.crop.width * originalToDisplayScale);
        let exportHeight = customHeight || Math.round(this.state.crop.height * originalToDisplayScale);
        // Polaroid框架需要额外空间
        if (this.state.frame === 'polaroid') {
            const sideMargin = exportWidth * 0.05;
            const topMargin = exportWidth * 0.05;
            const bottomMargin = exportWidth * 0.1;
            exportWidth += 2 * sideMargin;
            exportHeight += topMargin + bottomMargin;
        }
        // 创建导出画布
        const exportCanvas = document.createElement('canvas');
        const exportCtx = exportCanvas.getContext('2d');
        exportCanvas.width = exportWidth;
        exportCanvas.height = exportHeight;
        exportCtx.imageSmoothingEnabled = false;
        // 渲染到导出画布（参照render方法）
        this.renderToExportCanvas(exportCtx, exportWidth, exportHeight);
        return format === 'dataURL'
            ? exportCanvas.toDataURL('image/png')
            : new Promise((resolve, reject) => {
                exportCanvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Failed to create blob'))), 'image/png');
            });
    }
    renderToExportCanvas(ctx, width, height) {
        if (!this.image)
            return;
        ctx.clearRect(0, 0, width, height);
        // 绘制背景
        if (this.state.backgroundColor !== 'transparent') {
            ctx.fillStyle = this.state.backgroundColor;
            ctx.fillRect(0, 0, width, height);
        }
        ctx.save();
        // 计算导出缩放比例
        const exportScale = width / this.state.crop.width;
        // 计算导出图像显示区域
        const exportImageDisplay = {
            x: (this.imageDisplay.x - this.state.crop.x) * exportScale,
            y: (this.imageDisplay.y - this.state.crop.y) * exportScale,
            width: this.imageDisplay.width * exportScale,
            height: this.imageDisplay.height * exportScale,
        };
        // 应用变换到图片中心
        const centerX = exportImageDisplay.x + exportImageDisplay.width / 2;
        const centerY = exportImageDisplay.y + exportImageDisplay.height / 2;
        ctx.translate(centerX, centerY);
        ctx.rotate((this.state.rotation * Math.PI) / 180);
        ctx.scale((this.state.flipX ? -1 : 1) * this.state.scale, (this.state.flipY ? -1 : 1) * this.state.scale);
        ctx.transform(1, this.state.skewY, this.state.skewX, 1, 0, 0);
        this.applyFiltersToContext(ctx);
        ctx.drawImage(this.image, -exportImageDisplay.width / 2, -exportImageDisplay.height / 2, exportImageDisplay.width, exportImageDisplay.height);
        // 应用暗角效果
        if (this.state.vignette !== 0) {
            this.applyVignetteToExport(ctx, this.state.vignette, exportImageDisplay.width, exportImageDisplay.height);
        }
        ctx.restore();
        // 绘制所有元素
        const allItems = this.getAllItems().sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
        allItems.forEach((item) => {
            ctx.save();
            // 应用canvas变换
            this.applyCanvasTransformForItemToExport(ctx, item, exportImageDisplay, exportScale);
            // 计算元素在导出画布中的位置
            const exportX = (item.x - this.state.crop.x) * exportScale;
            const exportY = (item.y - this.state.crop.y) * exportScale;
            // 检查元素是否在导出区域内
            if (exportX >= -100 && exportX <= width + 100 && exportY >= -100 && exportY <= height + 100) {
                if (this.isSticker(item)) {
                    this.drawStickerToExport(ctx, item, exportX, exportY, exportScale);
                }
                else if (item.type === 'image') {
                    this.drawImageToExport(ctx, item, exportX, exportY, exportScale);
                }
                else {
                    this.drawAnnotationToExport(ctx, item, exportX, exportY, exportScale);
                }
            }
            ctx.restore();
        });
        if (this.state.frame !== 'none') {
            if (this.state.frame === 'polaroid') {
                // Polaroid框架需要调整画布偏移
                const originalWidth = width / (1 + 0.1);
                const sideMargin = originalWidth * 0.05;
                const topMargin = originalWidth * 0.05;
                ctx.translate(sideMargin, topMargin);
                this.drawFrameToExport(ctx, this.state.frame, originalWidth, height - topMargin - originalWidth * 0.1);
                ctx.translate(-sideMargin, -topMargin);
            }
            else {
                this.drawFrameToExport(ctx, this.state.frame, width, height);
            }
        }
    }
    drawStickerToExport(ctx, sticker, x, y, scale) {
        ctx.translate(x, y);
        ctx.rotate((sticker.rotation * Math.PI) / 180);
        if (sticker.type === 'emoji') {
            ctx.font = `${sticker.size * scale}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(sticker.content, 0, 0);
        }
        else if (sticker.type === 'image' && sticker.image) {
            const size = sticker.size * scale;
            ctx.drawImage(sticker.image, -size / 2, -size / 2, size, size);
        }
    }
    drawImageToExport(ctx, imageItem, x, y, scale) {
        ctx.translate(x, y);
        ctx.rotate((imageItem.rotation * Math.PI) / 180);
        const width = imageItem.width * scale;
        const height = imageItem.height * scale;
        ctx.drawImage(imageItem.image, -width / 2, -height / 2, width, height);
    }
    drawAnnotationToExport(ctx, annotation, x, y, scale) {
        const strokeColor = annotation.strokeColor || annotation.color;
        const fillColor = annotation.fillColor || (annotation.type === 'text' ? annotation.color : 'transparent');
        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = annotation.type === 'text' ? annotation.color : fillColor;
        ctx.lineWidth = annotation.strokeWidth * scale;
        if (annotation.rotation) {
            if (annotation.type === 'text') {
                const textWidth = (annotation.width || 0) * scale;
                const textHeight = (annotation.fontSize || 24) * scale;
                const centerX = x + textWidth / 2;
                const centerY = y - textHeight / 2;
                ctx.translate(centerX, centerY);
                ctx.rotate((annotation.rotation * Math.PI) / 180);
                ctx.translate(-centerX, -centerY);
            }
            else {
                const width = (annotation.width || 0) * scale;
                const height = (annotation.height || 0) * scale;
                const centerX = x + width / 2;
                const centerY = y + height / 2;
                ctx.translate(centerX, centerY);
                ctx.rotate((annotation.rotation * Math.PI) / 180);
                ctx.translate(-centerX, -centerY);
            }
        }
        switch (annotation.type) {
            case 'text':
                if (annotation.text && annotation.fontSize) {
                    const fontSize = annotation.fontSize * scale;
                    const fontWeight = annotation.fontWeight || 'normal';
                    const fontStyle = annotation.fontStyle || 'normal';
                    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px Arial`;
                    ctx.fillText(annotation.text, x, y);
                }
                break;
            case 'rectangle':
                if (annotation.width && annotation.height) {
                    const width = annotation.width * scale;
                    const height = annotation.height * scale;
                    if (fillColor && fillColor !== 'transparent') {
                        ctx.fillRect(x, y, width, height);
                    }
                    ctx.strokeRect(x, y, width, height);
                }
                break;
            case 'ellipse':
                if (annotation.width && annotation.height) {
                    const width = annotation.width * scale;
                    const height = annotation.height * scale;
                    ctx.beginPath();
                    ctx.ellipse(x + width / 2, y + height / 2, Math.abs(width / 2), Math.abs(height / 2), 0, 0, 2 * Math.PI);
                    if (fillColor && fillColor !== 'transparent')
                        ctx.fill();
                    ctx.stroke();
                }
                break;
            case 'line':
                if (annotation.width && annotation.height) {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + annotation.width * scale, y + annotation.height * scale);
                    ctx.stroke();
                }
                break;
            case 'arrow':
                if (annotation.width && annotation.height) {
                    const width = annotation.width * scale;
                    const height = annotation.height * scale;
                    const endX = x + width;
                    const endY = y + height;
                    const headSize = Math.max(8, annotation.strokeWidth * 2) * scale;
                    const angle = Math.atan2(height, width);
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(endX, endY);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(endX - headSize * Math.cos(angle + Math.PI / 4), endY - headSize * Math.sin(angle + Math.PI / 4));
                    ctx.lineTo(endX, endY);
                    ctx.lineTo(endX - headSize * Math.cos(angle - Math.PI / 4), endY - headSize * Math.sin(angle - Math.PI / 4));
                    ctx.stroke();
                }
                break;
            case 'sharpie':
            case 'path':
                if (annotation.points && annotation.points.length > 1) {
                    ctx.beginPath();
                    const firstPoint = annotation.points[0];
                    if (firstPoint) {
                        ctx.moveTo((firstPoint.x - this.state.crop.x) * scale, (firstPoint.y - this.state.crop.y) * scale);
                        for (let i = 1; i < annotation.points.length; i++) {
                            const point = annotation.points[i];
                            if (point) {
                                ctx.lineTo((point.x - this.state.crop.x) * scale, (point.y - this.state.crop.y) * scale);
                            }
                        }
                    }
                    ctx.stroke();
                }
                break;
        }
    }
    drawFrameToExport(ctx, frameType, width, height) {
        ctx.save();
        switch (frameType) {
            case 'undefined':
            case 'none':
                // No frame
                break;
            case 'solidSharp':
                // Mat frame
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = Math.max(5, width * 0.01);
                ctx.strokeRect(0, 0, width, height);
                break;
            case 'solidRound':
                // Bevel frame - white border with rounded inner edge
                ctx.fillStyle = '#fff';
                const frameWidth = Math.max(5, width * 0.01);
                const radius = width * 0.12;
                // Draw frame using path difference
                ctx.beginPath();
                // Outer rectangle
                ctx.rect(-frameWidth, -frameWidth, width + 2 * frameWidth, height + 2 * frameWidth);
                // Inner rounded rectangle (counter-clockwise to create hole)
                ctx.roundRect(0, 0, width, height, radius);
                ctx.fill('evenodd');
                break;
            case 'lineSingle':
                // Line frame
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = Math.max(1, width * 0.002);
                const lineInset = width * 0.05;
                ctx.strokeRect(lineInset, lineInset, width - 2 * lineInset, height - 2 * lineInset);
                break;
            case 'lineMultiple':
                // Zebra frame
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = Math.max(3, width * 0.006);
                const inset = width * 0.075;
                ctx.strokeRect(inset, inset, width - 2 * inset, height - 2 * inset);
                ctx.strokeRect(inset * 0.5, inset * 0.5, width - inset, height - inset);
                break;
            case 'edgeCross':
                // Lumber frame
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = Math.max(1, width * 0.002);
                const crossInset = width * 0.05;
                // Only draw within export area
                ctx.beginPath();
                // Top horizontal line
                ctx.moveTo(0, crossInset);
                ctx.lineTo(width, crossInset);
                // Bottom horizontal line
                ctx.moveTo(0, height - crossInset);
                ctx.lineTo(width, height - crossInset);
                // Left vertical line
                ctx.moveTo(crossInset, 0);
                ctx.lineTo(crossInset, height);
                // Right vertical line
                ctx.moveTo(width - crossInset, 0);
                ctx.lineTo(width - crossInset, height);
                ctx.stroke();
                break;
            case 'edgeOverlap':
                // Inset frame
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = Math.max(1, width * 0.002);
                const separateInset = width * 0.075;
                const cornerInset = width * 0.05;
                // Top
                ctx.beginPath();
                ctx.moveTo(cornerInset, separateInset);
                ctx.lineTo(width - cornerInset, separateInset);
                ctx.stroke();
                // Bottom
                ctx.beginPath();
                ctx.moveTo(cornerInset, height - separateInset);
                ctx.lineTo(width - cornerInset, height - separateInset);
                ctx.stroke();
                // Left
                ctx.beginPath();
                ctx.moveTo(separateInset, cornerInset);
                ctx.lineTo(separateInset, height - cornerInset);
                ctx.stroke();
                // Right
                ctx.beginPath();
                ctx.moveTo(width - separateInset, cornerInset);
                ctx.lineTo(width - separateInset, height - cornerInset);
                ctx.stroke();
                break;
            case 'edgeSeparate':
                // Plus frame
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = Math.max(1, width * 0.002);
                const overlapInset = width * 0.03125;
                const overlapCorner = width * 0.05;
                // Top
                ctx.beginPath();
                ctx.moveTo(overlapCorner, overlapInset);
                ctx.lineTo(width - overlapCorner, overlapInset);
                ctx.stroke();
                // Bottom
                ctx.beginPath();
                ctx.moveTo(overlapCorner, height - overlapInset);
                ctx.lineTo(width - overlapCorner, height - overlapInset);
                ctx.stroke();
                // Left
                ctx.beginPath();
                ctx.moveTo(overlapInset, overlapCorner);
                ctx.lineTo(overlapInset, height - overlapCorner);
                ctx.stroke();
                // Right
                ctx.beginPath();
                ctx.moveTo(width - overlapInset, overlapCorner);
                ctx.lineTo(width - overlapInset, height - overlapCorner);
                ctx.stroke();
                break;
            case 'hook':
                // Hook frame
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = Math.max(1, width * 0.002);
                const hookSize = width * 0.075;
                const hookInset = width * 0.05;
                // Top-left corner
                ctx.beginPath();
                ctx.moveTo(hookInset, hookInset + hookSize);
                ctx.lineTo(hookInset, hookInset);
                ctx.lineTo(hookInset + hookSize, hookInset);
                ctx.stroke();
                // Top-right corner
                ctx.beginPath();
                ctx.moveTo(width - hookInset - hookSize, hookInset);
                ctx.lineTo(width - hookInset, hookInset);
                ctx.lineTo(width - hookInset, hookInset + hookSize);
                ctx.stroke();
                // Bottom-left corner
                ctx.beginPath();
                ctx.moveTo(hookInset, height - hookInset - hookSize);
                ctx.lineTo(hookInset, height - hookInset);
                ctx.lineTo(hookInset + hookSize, height - hookInset);
                ctx.stroke();
                // Bottom-right corner
                ctx.beginPath();
                ctx.moveTo(width - hookInset - hookSize, height - hookInset);
                ctx.lineTo(width - hookInset, height - hookInset);
                ctx.lineTo(width - hookInset, height - hookInset - hookSize);
                ctx.stroke();
                break;
            case 'polaroid':
                // Polaroid frame - white border around image
                ctx.fillStyle = '#fff';
                const topMargin = width * 0.05;
                const sideMargin = width * 0.05;
                const bottomMargin = width * 0.1;
                // Draw white border around image with overlapping edges
                ctx.fillRect(-sideMargin, -topMargin, width + 2 * sideMargin, topMargin); // top
                ctx.fillRect(-sideMargin, -topMargin, sideMargin, height + topMargin + bottomMargin); // left
                ctx.fillRect(width, -topMargin, sideMargin, height + topMargin + bottomMargin); // right
                ctx.fillRect(-sideMargin, height, width + 2 * sideMargin, bottomMargin); // bottom
                break;
        }
        ctx.restore();
    }
    applyVignetteToExport(ctx, intensity, width, height) {
        if (!intensity)
            return;
        const maxRadius = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
        const minRadius = maxRadius * 0.3;
        const gradient = ctx.createRadialGradient(0, 0, minRadius, 0, 0, maxRadius);
        const alpha = (Math.abs(intensity) / 100) * 0.8;
        if (intensity > 0) {
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
            gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
            gradient.addColorStop(1, `rgba(0, 0, 0, ${alpha})`);
        }
        else {
            gradient.addColorStop(0, `rgba(0, 0, 0, ${alpha})`);
            gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = gradient;
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.restore();
    }
    getAllItems() {
        return [...this.state.stickers, ...this.state.annotations, ...this.state.images];
    }
    moveToFront(itemId) {
        const maxZIndex = Math.max(...this.getAllItems().map((item) => item.zIndex || 0));
        this.updateItemZIndex(itemId, maxZIndex + 1);
    }
    moveToBack(itemId) {
        const minZIndex = Math.min(...this.getAllItems().map((item) => item.zIndex || 0));
        this.updateItemZIndex(itemId, minZIndex - 1);
    }
    moveForward(itemId) {
        const allItems = this.getAllItems();
        const item = allItems.find((i) => i.id === itemId);
        if (!item)
            return;
        const currentZ = item.zIndex || 0;
        const nextItem = allItems.filter((i) => (i.zIndex || 0) > currentZ).sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))[0];
        const nextZ = nextItem?.zIndex;
        if (nextZ !== undefined)
            this.updateItemZIndex(itemId, nextZ + 1);
    }
    moveBackward(itemId) {
        const allItems = this.getAllItems();
        const item = allItems.find((i) => i.id === itemId);
        if (!item)
            return;
        const currentZ = item.zIndex || 0;
        const prevItems = allItems.filter((i) => (i.zIndex || 0) < currentZ).sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0));
        const prevItem = prevItems[0];
        const prevZ = prevItem?.zIndex;
        if (prevZ !== undefined)
            this.updateItemZIndex(itemId, prevZ - 1);
    }
    updateItemZIndex(itemId, newZIndex) {
        const updateItem = (item) => (item.id === itemId ? { ...item, zIndex: newZIndex } : item);
        this.setState({
            stickers: this.state.stickers.map(updateItem),
            annotations: this.state.annotations.map(updateItem),
            images: this.state.images.map(updateItem),
        });
    }
    recalculateImageDisplay() {
        if (this.canvas.parentElement) {
            this.calculateImageDisplay();
            this.render();
        }
    }
    destroy() {
        this.plugins.forEach((plugin) => plugin.destroy());
        this.plugins.clear();
        this.eventListeners.clear();
        this.resizeObserver?.disconnect();
        this.resizeObserver = null;
    }
    applyCanvasTransformForItem(item) {
        if (item.canvasRotation === undefined || item.canvasFlipX === undefined)
            return;
        const rotationDiff = this.state.rotation - item.canvasRotation;
        const flipXChanged = this.state.flipX !== item.canvasFlipX;
        const flipYChanged = this.state.flipY !== (item.canvasFlipY || false);
        const scaleDiff = this.state.scale - (item.canvasScale || 1);
        const skewXDiff = this.state.skewX - (item.canvasSkewX || 0);
        const skewYDiff = this.state.skewY - (item.canvasSkewY || 0);
        if (!rotationDiff && !flipXChanged && !flipYChanged && !scaleDiff && !skewXDiff && !skewYDiff)
            return;
        const centerX = this.imageDisplay.x + this.imageDisplay.width / 2;
        const centerY = this.imageDisplay.y + this.imageDisplay.height / 2;
        this.ctx.translate(centerX, centerY);
        if (rotationDiff)
            this.ctx.rotate((rotationDiff * Math.PI) / 180);
        if (scaleDiff) {
            const scaleRatio = this.state.scale / (item.canvasScale || 1);
            this.ctx.scale(scaleRatio, scaleRatio);
        }
        if (skewXDiff || skewYDiff)
            this.ctx.transform(1, skewYDiff, skewXDiff, 1, 0, 0);
        if (flipXChanged || flipYChanged)
            this.ctx.scale(flipXChanged ? -1 : 1, flipYChanged ? -1 : 1);
        this.ctx.translate(-centerX, -centerY);
    }
    applyCanvasTransformForItemToExport(ctx, item, exportImageDisplay, exportScale) {
        if (item.canvasRotation === undefined || item.canvasFlipX === undefined)
            return;
        const rotationDiff = this.state.rotation - item.canvasRotation;
        const flipXChanged = this.state.flipX !== item.canvasFlipX;
        const flipYChanged = this.state.flipY !== (item.canvasFlipY || false);
        const scaleDiff = this.state.scale - (item.canvasScale || 1);
        const skewXDiff = this.state.skewX - (item.canvasSkewX || 0);
        const skewYDiff = this.state.skewY - (item.canvasSkewY || 0);
        if (!rotationDiff && !flipXChanged && !flipYChanged && !scaleDiff && !skewXDiff && !skewYDiff)
            return;
        const centerX = exportImageDisplay.x + exportImageDisplay.width / 2;
        const centerY = exportImageDisplay.y + exportImageDisplay.height / 2;
        ctx.translate(centerX, centerY);
        if (rotationDiff)
            ctx.rotate((rotationDiff * Math.PI) / 180);
        if (scaleDiff) {
            const scaleRatio = this.state.scale / (item.canvasScale || 1);
            ctx.scale(scaleRatio, scaleRatio);
        }
        if (skewXDiff || skewYDiff)
            ctx.transform(1, skewYDiff, skewXDiff, 1, 0, 0);
        if (flipXChanged || flipYChanged)
            ctx.scale(flipXChanged ? -1 : 1, flipYChanged ? -1 : 1);
        ctx.translate(-centerX, -centerY);
    }
}

const MEMORY_CONSTANTS = {
    RGBA_BYTES_PER_PIXEL: 4,
    DEFAULT_CHUNK_SIZE: 1024,
    MAX_CANVAS_POOL_SIZE: 10,
    CANVAS_RESET_SIZE: 1,
    ASYNC_DELAY: 0,
};
class MemoryManager {
    static setLimits(limits) {
        this.limits = { ...this.limits, ...limits };
    }
    static checkImageSize(width, height) {
        const pixels = width * height;
        const bytes = pixels * MEMORY_CONSTANTS.RGBA_BYTES_PER_PIXEL;
        return pixels <= this.limits.maxCanvasSize && bytes <= this.limits.maxImageSize;
    }
    static calculateOptimalSize(width, height) {
        const maxPixels = this.limits.maxCanvasSize;
        const currentPixels = width * height;
        if (currentPixels <= maxPixels) {
            return { width, height };
        }
        const scale = Math.sqrt(maxPixels / currentPixels);
        return {
            width: Math.floor(width * scale),
            height: Math.floor(height * scale)
        };
    }
    static async processLargeImage(imageData, processor, chunkSize = MEMORY_CONSTANTS.DEFAULT_CHUNK_SIZE) {
        const { width, height } = imageData;
        const result = new ImageData(width, height);
        for (let y = 0; y < height; y += chunkSize) {
            for (let x = 0; x < width; x += chunkSize) {
                const chunkWidth = Math.min(chunkSize, width - x);
                const chunkHeight = Math.min(chunkSize, height - y);
                const chunk = this.extractChunk(imageData, x, y, chunkWidth, chunkHeight);
                const processedChunk = processor(chunk);
                this.insertChunk(result, processedChunk, x, y);
                // Allow other tasks to run
                await new Promise(resolve => setTimeout(resolve, MEMORY_CONSTANTS.ASYNC_DELAY));
            }
        }
        return result;
    }
    static extractChunk(imageData, x, y, width, height) {
        const chunk = new ImageData(width, height);
        const sourceData = imageData.data;
        const chunkData = chunk.data;
        for (let cy = 0; cy < height; cy++) {
            for (let cx = 0; cx < width; cx++) {
                const sourceIdx = ((y + cy) * imageData.width + (x + cx)) * 4;
                const chunkIdx = (cy * width + cx) * 4;
                chunkData[chunkIdx] = sourceData[sourceIdx] ?? 0;
                chunkData[chunkIdx + 1] = sourceData[sourceIdx + 1] ?? 0;
                chunkData[chunkIdx + 2] = sourceData[sourceIdx + 2] ?? 0;
                chunkData[chunkIdx + 3] = sourceData[sourceIdx + 3] ?? 255;
            }
        }
        return chunk;
    }
    static insertChunk(target, chunk, x, y) {
        const targetData = target.data;
        const chunkData = chunk.data;
        for (let cy = 0; cy < chunk.height; cy++) {
            for (let cx = 0; cx < chunk.width; cx++) {
                const targetIdx = ((y + cy) * target.width + (x + cx)) * 4;
                const chunkIdx = (cy * chunk.width + cx) * 4;
                targetData[targetIdx] = chunkData[chunkIdx] ?? 0;
                targetData[targetIdx + 1] = chunkData[chunkIdx + 1] ?? 0;
                targetData[targetIdx + 2] = chunkData[chunkIdx + 2] ?? 0;
                targetData[targetIdx + 3] = chunkData[chunkIdx + 3] ?? 255;
            }
        }
    }
    static getCanvas(width, height) {
        const canvas = this.canvasPool.pop() || document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const memoryUsed = width * height * MEMORY_CONSTANTS.RGBA_BYTES_PER_PIXEL;
        this.memoryUsage += memoryUsed;
        return canvas;
    }
    static releaseCanvas(canvas) {
        const memoryUsed = canvas.width * canvas.height * MEMORY_CONSTANTS.RGBA_BYTES_PER_PIXEL;
        this.memoryUsage -= memoryUsed;
        if (this.canvasPool.length < MEMORY_CONSTANTS.MAX_CANVAS_POOL_SIZE) {
            canvas.width = MEMORY_CONSTANTS.CANVAS_RESET_SIZE;
            canvas.height = MEMORY_CONSTANTS.CANVAS_RESET_SIZE;
            this.canvasPool.push(canvas);
        }
    }
    static getMemoryUsage() {
        return this.memoryUsage;
    }
    static isMemoryAvailable(additionalBytes) {
        return this.memoryUsage + additionalBytes <= this.limits.maxMemoryUsage;
    }
    static cleanup() {
        this.canvasPool.forEach(canvas => {
            canvas.width = MEMORY_CONSTANTS.CANVAS_RESET_SIZE;
            canvas.height = MEMORY_CONSTANTS.CANVAS_RESET_SIZE;
        });
        this.canvasPool = [];
        this.memoryUsage = 0;
    }
}
MemoryManager.limits = {
    maxCanvasSize: 16777216, // 4096x4096
    maxImageSize: 50 * 1024 * 1024, // 50MB
    maxMemoryUsage: 200 * 1024 * 1024 // 200MB
};
MemoryManager.memoryUsage = 0;
MemoryManager.canvasPool = [];

/**
 * 像素处理工具函数
 *
 * 统一处理像素级别的图像操作
 */
/**
 * 安全的像素值设置，确保在 0-255 范围内
 */
const clampPixel = (value) => {
    return Math.max(0, Math.min(255, value));
};
/**
 * 批量处理像素数据
 */
const processPixelData = (data, processor) => {
    for (let i = 0; i < data.length; i += 4) {
        const [r, g, b, a] = processor(data[i] ?? 0, data[i + 1] ?? 0, data[i + 2] ?? 0, data[i + 3] ?? 255, i);
        data[i] = clampPixel(r);
        data[i + 1] = clampPixel(g);
        data[i + 2] = clampPixel(b);
        data[i + 3] = a;
    }
};
/**
 * 应用卷积核
 */
const applyConvolution = (data, width, height, kernel, kernelSize) => {
    const original = new Uint8ClampedArray(data);
    const half = Math.floor(kernelSize / 2);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0;
            for (let ky = 0; ky < kernelSize; ky++) {
                for (let kx = 0; kx < kernelSize; kx++) {
                    const py = Math.min(height - 1, Math.max(0, y + ky - half));
                    const px = Math.min(width - 1, Math.max(0, x + kx - half));
                    const idx = (py * width + px) * 4;
                    const weight = kernel[ky * kernelSize + kx] ?? 0;
                    r += (original[idx] ?? 0) * weight;
                    g += (original[idx + 1] ?? 0) * weight;
                    b += (original[idx + 2] ?? 0) * weight;
                }
            }
            const idx = (y * width + x) * 4;
            data[idx] = clampPixel(r);
            data[idx + 1] = clampPixel(g);
            data[idx + 2] = clampPixel(b);
        }
    }
};

class AdvancedFilterPlugin {
    constructor() {
        this.name = 'advancedFilter';
        this.canvas = null;
        this.ctx = null;
    }
    init(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    async applyAdvancedFilter(imageData, filterType, options = {}) {
        // Use chunked processing for large images
        if (!MemoryManager.checkImageSize(imageData.width, imageData.height)) {
            return this.applyFilterChunked(imageData, filterType, options);
        }
        return this.applyFilterDirect(imageData, filterType, options);
    }
    async applyFilterChunked(imageData, filterType, options) {
        return MemoryManager.processLargeImage(imageData, (chunk) => this.applyFilterDirect(chunk, filterType, options), 512);
    }
    applyFilterDirect(imageData, filterType, options) {
        const data = new Uint8ClampedArray(imageData.data);
        const { width, height } = imageData;
        switch (filterType) {
            case 'blur':
                this.applyGaussianBlur(data, width, height, options.radius || 5);
                break;
            case 'sharpen':
                this.applySharpen(data, width, height, options.intensity || 1);
                break;
            case 'emboss':
                this.applyEmboss(data, width, height);
                break;
            case 'edge':
                this.applyEdgeDetection(data, width, height);
                break;
            case 'oil':
                this.applyOilPainting(data, width, height, options.radius || 3);
                break;
            case 'vintage':
                this.applyVintage(data);
                break;
            case 'cross-process':
                this.applyCrossProcess(data);
                break;
            case 'lomo':
                this.applyLomo(data, width, height);
                break;
            default:
                return imageData;
        }
        return new ImageData(data, width, height);
    }
    applyGaussianBlur(data, width, height, radius) {
        const kernel = this.createGaussianKernel(radius);
        // Apply horizontal blur
        this.applyHorizontalBlur(data, width, height, kernel);
        // Apply vertical blur
        this.applyVerticalBlur(data, width, height, kernel);
    }
    applyHorizontalBlur(data, width, height, kernel) {
        const original = new Uint8ClampedArray(data);
        const half = Math.floor(kernel.length / 2);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let r = 0, g = 0, b = 0;
                for (let i = 0; i < kernel.length; i++) {
                    const px = Math.min(width - 1, Math.max(0, x + i - half));
                    const idx = (y * width + px) * 4;
                    const weight = kernel[i] ?? 0;
                    r += (original[idx] ?? 0) * weight;
                    g += (original[idx + 1] ?? 0) * weight;
                    b += (original[idx + 2] ?? 0) * weight;
                }
                const idx = (y * width + x) * 4;
                data[idx] = clampPixel(r);
                data[idx + 1] = clampPixel(g);
                data[idx + 2] = clampPixel(b);
            }
        }
    }
    applyVerticalBlur(data, width, height, kernel) {
        const original = new Uint8ClampedArray(data);
        const half = Math.floor(kernel.length / 2);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let r = 0, g = 0, b = 0;
                for (let i = 0; i < kernel.length; i++) {
                    const py = Math.min(height - 1, Math.max(0, y + i - half));
                    const idx = (py * width + x) * 4;
                    const weight = kernel[i] ?? 0;
                    r += (original[idx] ?? 0) * weight;
                    g += (original[idx + 1] ?? 0) * weight;
                    b += (original[idx + 2] ?? 0) * weight;
                }
                const idx = (y * width + x) * 4;
                data[idx] = clampPixel(r);
                data[idx + 1] = clampPixel(g);
                data[idx + 2] = clampPixel(b);
            }
        }
    }
    applySharpen(data, width, height, intensity) {
        const kernel = [
            0, -intensity, 0,
            -intensity, 1 + 4 * intensity, -intensity,
            0, -intensity, 0
        ];
        this.applyConvolution(data, width, height, kernel, 3);
    }
    applyEmboss(data, width, height) {
        const kernel = [-2, -1, 0, -1, 1, 1, 0, 1, 2];
        this.applyConvolution(data, width, height, kernel, 3);
    }
    applyEdgeDetection(data, width, height) {
        const kernel = [-1, -1, -1, -1, 8, -1, -1, -1, -1];
        this.applyConvolution(data, width, height, kernel, 3);
    }
    applyOilPainting(data, width, height, radius) {
        const original = new Uint8ClampedArray(data);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const intensityCount = new Array(256).fill(0);
                const avgR = new Array(256).fill(0);
                const avgG = new Array(256).fill(0);
                const avgB = new Array(256).fill(0);
                for (let dy = -radius; dy <= radius; dy++) {
                    for (let dx = -radius; dx <= radius; dx++) {
                        const nx = Math.max(0, Math.min(width - 1, x + dx));
                        const ny = Math.max(0, Math.min(height - 1, y + dy));
                        const idx = (ny * width + nx) * 4;
                        const r = original[idx] ?? 0;
                        const g = original[idx + 1] ?? 0;
                        const b = original[idx + 2] ?? 0;
                        const intensity = Math.floor((r + g + b) / 3);
                        intensityCount[intensity]++;
                        avgR[intensity] += r;
                        avgG[intensity] += g;
                        avgB[intensity] += b;
                    }
                }
                let maxCount = 0;
                let maxIndex = 0;
                for (let i = 0; i < 256; i++) {
                    if (intensityCount[i] > maxCount) {
                        maxCount = intensityCount[i];
                        maxIndex = i;
                    }
                }
                const idx = (y * width + x) * 4;
                data[idx] = avgR[maxIndex] / maxCount;
                data[idx + 1] = avgG[maxIndex] / maxCount;
                data[idx + 2] = avgB[maxIndex] / maxCount;
            }
        }
    }
    applyVintage(data) {
        processPixelData(data, (r, g, b, a) => [
            r * 0.9 + g * 0.5 + b * 0.1,
            r * 0.3 + g * 0.8 + b * 0.1,
            r * 0.2 + g * 0.3 + b * 0.5,
            a
        ]);
    }
    applyCrossProcess(data) {
        processPixelData(data, (r, g, b, a) => {
            const rNorm = r / 255;
            const gNorm = g / 255;
            const bNorm = b / 255;
            return [
                (rNorm * 1.4 - 0.2) * 255,
                (gNorm * 1.2 - 0.1) * 255,
                (bNorm * 0.8 + 0.2) * 255,
                a
            ];
        });
    }
    applyLomo(data, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                const vignette = 1 - (distance / maxDistance) * 0.6;
                const idx = (y * width + x) * 4;
                data[idx] = Math.max(0, Math.min(255, (data[idx] ?? 0) * vignette * 1.2));
                data[idx + 1] = Math.max(0, Math.min(255, (data[idx + 1] ?? 0) * vignette));
                data[idx + 2] = Math.max(0, Math.min(255, (data[idx + 2] ?? 0) * vignette * 0.8));
            }
        }
    }
    createGaussianKernel(radius) {
        const size = radius * 2 + 1;
        const kernel = new Array(size);
        const sigma = radius / 3;
        let sum = 0;
        for (let i = 0; i < size; i++) {
            const x = i - radius;
            kernel[i] = Math.exp(-(x * x) / (2 * sigma * sigma));
            sum += kernel[i];
        }
        for (let i = 0; i < size; i++) {
            kernel[i] /= sum;
        }
        return kernel;
    }
    applyConvolution(data, width, height, kernel, kernelSize) {
        applyConvolution(data, width, height, kernel, kernelSize);
    }
    initialize(editor) { }
    destroy() {
        this.canvas = null;
        this.ctx = null;
    }
}

/**
 * 坐标转换工具函数
 *
 * 统一处理鼠标坐标到画布坐标的转换
 */
/**
 * 将鼠标坐标转换为画布坐标
 */
const mouseToCanvas = (event, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    return {
        x: (mouseX / rect.width) * canvas.width,
        y: (mouseY / rect.height) * canvas.height,
    };
};
/**
 * 检查点是否在矩形区域内
 */
const isPointInRect = (point, rect) => {
    return (point.x >= rect.x &&
        point.x <= rect.x + rect.width &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.height);
};
/**
 * 生成唯一ID
 */
const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
};

class AnnotatePlugin {
    constructor() {
        this.name = 'annotate';
        this.isDrawing = false;
        this.currentAnnotation = null;
        this.canvasScale = 1;
    }
    initialize(editor) {
        this.editor = editor;
    }
    setAnnotationCompleteCallback(callback) {
        this.onAnnotationComplete = callback;
    }
    setCanvasScale(scale) {
        this.canvasScale = scale;
    }
    handleMouseDown(event, currentTool, toolSettings) {
        const canvas = this.editor.canvas;
        if (!canvas)
            return;
        const { x, y } = mouseToCanvas(event, canvas);
        const imageDisplay = this.editor.getImageDisplay();
        // 确保在图片区域内
        if (isPointInRect({ x, y }, imageDisplay)) {
            this.isDrawing = true;
            this.currentAnnotation = {
                rotation: 0,
                id: generateId(),
                type: currentTool,
                x: currentTool === 'text' ? imageDisplay.x + imageDisplay.width / 2 : x,
                y: currentTool === 'text' ? imageDisplay.y + imageDisplay.height / 2 : y,
                width: 0,
                height: 0,
                color: toolSettings.color || '#ff0000',
                strokeWidth: toolSettings.strokeWidth || 2,
                fontSize: toolSettings.fontSize || 24,
                text: toolSettings.text || (currentTool === 'text' ? 'Text' : undefined),
                points: currentTool === 'sharpie' ? [{ x, y }] : undefined,
                zIndex: Date.now(),
                fillColor: toolSettings.fillColor ||
                    (currentTool !== 'line' && currentTool !== 'sharpie' && currentTool !== 'path' && currentTool !== 'text'
                        ? 'transparent'
                        : undefined),
                strokeColor: toolSettings.strokeColor || toolSettings.color || '#ff0000',
            };
        }
    }
    handleMouseMove(event) {
        if (!this.isDrawing || !this.currentAnnotation)
            return;
        const canvas = this.editor.canvas;
        if (!canvas)
            return;
        const { x, y } = mouseToCanvas(event, canvas);
        // 实时绘制
        if (this.currentAnnotation.type === 'sharpie') {
            this.currentAnnotation.points?.push({ x, y });
        }
        else if (this.currentAnnotation.type !== 'text') {
            this.currentAnnotation.width = x - this.currentAnnotation.x;
            this.currentAnnotation.height = y - this.currentAnnotation.y;
        }
        this.editor.render();
    }
    handleMouseUp() {
        if (this.currentAnnotation && this.isDrawing) {
            const state = this.editor.getState();
            const annotations = [...state.annotations];
            let annotationAdded = false;
            // 只有在实际绘制了内容时才添加
            if (this.currentAnnotation.type === 'sharpie' && this.currentAnnotation.points && this.currentAnnotation.points.length > 1) {
                annotations.push(this.currentAnnotation);
                this.editor.setState({ annotations });
                annotationAdded = true;
            }
            else if (this.currentAnnotation.type !== 'sharpie' &&
                (Math.abs(this.currentAnnotation.width || 0) > 5 || Math.abs(this.currentAnnotation.height || 0) > 5)) {
                annotations.push(this.currentAnnotation);
                this.editor.setState({ annotations });
                annotationAdded = true;
            }
            else if (this.currentAnnotation.type === 'text') {
                annotations.push(this.currentAnnotation);
                this.editor.setState({ annotations });
                annotationAdded = true;
            }
            // 通知主组件注释完成
            if (annotationAdded && this.onAnnotationComplete) {
                this.onAnnotationComplete(this.currentAnnotation);
            }
        }
        this.isDrawing = false;
        this.currentAnnotation = null;
    }
    render(ctx) {
        // 只渲染正在绘制的注释，已完成的注释由EditorCore渲染
        if (this.currentAnnotation) {
            this.renderAnnotation(ctx, this.currentAnnotation);
        }
    }
    renderAnnotation(ctx, annotation) {
        ctx.save();
        const strokeColor = annotation.strokeColor || annotation.color;
        const fillColor = annotation.fillColor || (annotation.type === 'text' ? annotation.color : 'transparent');
        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = annotation.type === 'text' ? annotation.color : fillColor;
        ctx.lineWidth = annotation.strokeWidth;
        switch (annotation.type) {
            case 'rectangle':
                if (annotation.width && annotation.height) {
                    const fillColor = annotation.fillColor;
                    if (fillColor && fillColor !== 'transparent') {
                        ctx.fillStyle = fillColor;
                        ctx.fillRect(annotation.x, annotation.y, annotation.width, annotation.height);
                    }
                    ctx.strokeRect(annotation.x, annotation.y, annotation.width, annotation.height);
                }
                break;
            case 'ellipse':
                if (annotation.width && annotation.height) {
                    ctx.beginPath();
                    ctx.ellipse(annotation.x + annotation.width / 2, annotation.y + annotation.height / 2, Math.abs(annotation.width / 2), Math.abs(annotation.height / 2), 0, 0, 2 * Math.PI);
                    const fillColor = annotation.fillColor;
                    if (fillColor && fillColor !== 'transparent') {
                        ctx.fillStyle = fillColor;
                        ctx.fill();
                    }
                    ctx.stroke();
                }
                break;
            case 'line':
                if (annotation.width && annotation.height) {
                    ctx.beginPath();
                    ctx.moveTo(annotation.x, annotation.y);
                    ctx.lineTo(annotation.x + annotation.width, annotation.y + annotation.height);
                    ctx.stroke();
                }
                break;
            case 'arrow':
                if (annotation.width && annotation.height) {
                    this.drawArrow(ctx, annotation.x, annotation.y, annotation.x + annotation.width, annotation.y + annotation.height, annotation.strokeWidth);
                }
                break;
            case 'text':
                if (annotation.text && annotation.fontSize) {
                    const fontWeight = annotation.fontWeight || 'normal';
                    const fontStyle = annotation.fontStyle || 'normal';
                    ctx.font = `${fontStyle} ${fontWeight} ${annotation.fontSize}px Arial`;
                    // 应用文本装饰
                    const textWidth = ctx.measureText(annotation.text).width;
                    const decorationLineWidth = Math.max(1, annotation.fontSize / 16); // 基于字体大小的装饰线粗细
                    if (annotation.textDecoration === 'underline') {
                        const originalLineWidth = ctx.lineWidth;
                        ctx.lineWidth = decorationLineWidth;
                        ctx.beginPath();
                        ctx.moveTo(annotation.x, annotation.y + 2);
                        ctx.lineTo(annotation.x + textWidth, annotation.y + 2);
                        ctx.stroke();
                        ctx.lineWidth = originalLineWidth;
                    }
                    else if (annotation.textDecoration === 'line-through') {
                        const originalLineWidth = ctx.lineWidth;
                        ctx.lineWidth = decorationLineWidth;
                        ctx.beginPath();
                        ctx.moveTo(annotation.x, annotation.y - annotation.fontSize / 3);
                        ctx.lineTo(annotation.x + textWidth, annotation.y - annotation.fontSize / 3);
                        ctx.stroke();
                        ctx.lineWidth = originalLineWidth;
                    }
                    ctx.fillText(annotation.text, annotation.x, annotation.y);
                }
                break;
            case 'sharpie':
                if (annotation.points && annotation.points.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(annotation.points[0]?.x ?? 0, annotation.points[0]?.y ?? 0);
                    for (let i = 1; i < annotation.points.length; i++) {
                        ctx.lineTo(annotation.points[i]?.x ?? 0, annotation.points[i]?.y ?? 0);
                    }
                    ctx.stroke();
                }
                break;
        }
        ctx.restore();
    }
    drawArrow(ctx, x1, y1, x2, y2, strokeWidth = 2) {
        const headLength = Math.max(10, strokeWidth * 3);
        const angle = Math.atan2(y2 - y1, x2 - x1);
        // 缩短主线，留出箭头空间
        const lineEndX = x2 - headLength * 0.7 * Math.cos(angle);
        const lineEndY = y2 - headLength * 0.7 * Math.sin(angle);
        // 绘制主线
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(lineEndX, lineEndY);
        ctx.stroke();
        // 绘制填充三角形箭头
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - headLength * Math.cos(angle - Math.PI / 4), y2 - headLength * Math.sin(angle - Math.PI / 4));
        ctx.lineTo(x2 - headLength * Math.cos(angle + Math.PI / 4), y2 - headLength * Math.sin(angle + Math.PI / 4));
        ctx.closePath();
        ctx.fill();
    }
    updateAnnotations(annotations) {
        // 注释插件不需要维护选中状态
    }
    destroy() {
        this.editor = null;
        this.currentAnnotation = null;
    }
}

const CROP_CONFIG = {
    MIN_CROP_SIZE: 50,
    HANDLE_SIZE: 12,
    GRID_LINES: 3,
    STROKE_WIDTH: 2,
    OVERLAY_ALPHA: 0.6,
};
class CropPlugin {
    constructor() {
        this.name = 'crop';
        this.isDragging = false;
        this.dragMode = 'none';
        this.dragStart = { x: 0, y: 0 };
        this.initialCrop = { x: 0, y: 0, width: 0, height: 0 };
        this.initialAspectRatio = 1;
        this._isActive = false;
        this.isShiftPressed = false;
    }
    initialize(editor) {
        this.editor = editor;
        // 监听全局键盘事件
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }
    setActive(active) {
        this._isActive = active;
    }
    get isActive() {
        return this._isActive;
    }
    // 计算变换后的边界框（考虑旋转、缩放、倾斜）
    getTransformedBounds(canvas) {
        const state = this.editor.getState();
        const imageDisplay = this.editor.getImageDisplay();
        const rotation = ((state.rotation || 0) * Math.PI) / 180;
        const scale = state.scale || 1;
        const skewX = state.skewX || 0;
        const skewY = state.skewY || 0;
        const cos = Math.abs(Math.cos(rotation));
        const sin = Math.abs(Math.sin(rotation));
        // 考虑缩放和倾斜的影响
        const scaledWidth = imageDisplay.width * scale;
        const scaledHeight = imageDisplay.height * scale;
        // 倾斜会影响边界框大小
        const skewWidthEffect = Math.abs(skewX) * scaledHeight;
        const skewHeightEffect = Math.abs(skewY) * scaledWidth;
        const transformedWidth = (scaledWidth + skewWidthEffect) * cos + (scaledHeight + skewHeightEffect) * sin;
        const transformedHeight = (scaledHeight + skewHeightEffect) * cos + (scaledWidth + skewWidthEffect) * sin;
        const centerX = imageDisplay.x + imageDisplay.width / 2;
        const centerY = imageDisplay.y + imageDisplay.height / 2;
        return {
            x: Math.max(0, Math.min(canvas.width - transformedWidth, centerX - transformedWidth / 2)),
            y: Math.max(0, Math.min(canvas.height - transformedHeight, centerY - transformedHeight / 2)),
            width: Math.min(transformedWidth, canvas.width),
            height: Math.min(transformedHeight, canvas.height),
        };
    }
    render(ctx) {
        if (!this._isActive)
            return;
        const state = this.editor.getState();
        if (state.crop) {
            this.drawCropOverlay(ctx);
        }
    }
    drawCropOverlay(ctx) {
        const canvas = ctx.canvas;
        const state = this.editor.getState();
        const { crop } = state;
        ctx.save();
        const rotatedBounds = this.getTransformedBounds(canvas);
        // 确保裁剪区域在变换后的图片范围内
        const cropX = Math.max(rotatedBounds.x, Math.min(crop.x, rotatedBounds.x + rotatedBounds.width - CROP_CONFIG.MIN_CROP_SIZE));
        const cropY = Math.max(rotatedBounds.y, Math.min(crop.y, rotatedBounds.y + rotatedBounds.height - CROP_CONFIG.MIN_CROP_SIZE));
        const cropWidth = Math.min(crop.width, rotatedBounds.x + rotatedBounds.width - cropX);
        const cropHeight = Math.min(crop.height, rotatedBounds.y + rotatedBounds.height - cropY);
        // 绘制半透明遮罩层（裆剪框外的所有区域）
        ctx.fillStyle = `rgba(0, 0, 0, ${CROP_CONFIG.OVERLAY_ALPHA})`;
        // 使用路径创建复合形状：整个画布 - 裁剪区域
        ctx.beginPath();
        // 整个画布
        ctx.rect(0, 0, canvas.width, canvas.height);
        // 裁剪区域（反向）
        ctx.rect(cropX + cropWidth, cropY, -cropWidth, cropHeight);
        ctx.fill('evenodd');
        // 绘制裁剪框
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = CROP_CONFIG.STROKE_WIDTH;
        ctx.strokeRect(cropX, cropY, cropWidth, cropHeight);
        // 绘制网格线
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        for (let i = 1; i < CROP_CONFIG.GRID_LINES; i++) {
            const x = cropX + (cropWidth / 3) * i;
            const y = cropY + (cropHeight / 3) * i;
            ctx.beginPath();
            ctx.moveTo(x, cropY);
            ctx.lineTo(x, cropY + cropHeight);
            ctx.moveTo(cropX, y);
            ctx.lineTo(cropX + cropWidth, y);
            ctx.stroke();
        }
        // 绘制拖拽手柄
        const handleSize = CROP_CONFIG.HANDLE_SIZE;
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = CROP_CONFIG.STROKE_WIDTH;
        const handles = [
            { x: cropX, y: cropY, cursor: 'nw-resize' },
            { x: cropX + cropWidth, y: cropY, cursor: 'ne-resize' },
            { x: cropX + cropWidth, y: cropY + cropHeight, cursor: 'se-resize' },
            { x: cropX, y: cropY + cropHeight, cursor: 'sw-resize' },
            { x: cropX + cropWidth / 2, y: cropY, cursor: 'n-resize' },
            { x: cropX + cropWidth, y: cropY + cropHeight / 2, cursor: 'e-resize' },
            { x: cropX + cropWidth / 2, y: cropY + cropHeight, cursor: 's-resize' },
            { x: cropX, y: cropY + cropHeight / 2, cursor: 'w-resize' },
        ];
        handles.forEach((handle) => {
            ctx.fillRect(handle.x - handleSize / 2, handle.y - handleSize / 2, handleSize, handleSize);
            ctx.strokeRect(handle.x - handleSize / 2, handle.y - handleSize / 2, handleSize, handleSize);
        });
        ctx.restore();
    }
    handleMouseDown(event) {
        const canvas = this.editor.canvas;
        const mouseX = event.canvasX || event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.canvasY || event.clientY - canvas.getBoundingClientRect().top;
        this.dragStart = { x: mouseX, y: mouseY };
        this.isDragging = true;
        const state = this.editor.getState();
        const { crop } = state;
        // 保存初始裁剪状态和宽高比
        this.initialCrop = { ...crop };
        this.initialAspectRatio = crop.width / crop.height;
        // 检查是否点击在拖拽手柄上
        const handleSize = CROP_CONFIG.HANDLE_SIZE;
        const handles = [
            { x: crop.x, y: crop.y, mode: 'tl' },
            { x: crop.x + crop.width, y: crop.y, mode: 'tr' },
            { x: crop.x + crop.width, y: crop.y + crop.height, mode: 'br' },
            { x: crop.x, y: crop.y + crop.height, mode: 'bl' },
            { x: crop.x + crop.width / 2, y: crop.y, mode: 't' },
            { x: crop.x + crop.width, y: crop.y + crop.height / 2, mode: 'r' },
            { x: crop.x + crop.width / 2, y: crop.y + crop.height, mode: 'b' },
            { x: crop.x, y: crop.y + crop.height / 2, mode: 'l' },
        ];
        let foundHandle = false;
        for (const handle of handles) {
            if (Math.abs(mouseX - handle.x) < handleSize && Math.abs(mouseY - handle.y) < handleSize) {
                this.dragMode = handle.mode;
                foundHandle = true;
                break;
            }
        }
        if (!foundHandle) {
            const rotatedBounds = this.getTransformedBounds(canvas);
            // 检查是否在裁剪区域内（移动模式）
            if (mouseX >= crop.x && mouseX <= crop.x + crop.width && mouseY >= crop.y && mouseY <= crop.y + crop.height) {
                this.dragMode = 'move';
            }
            else if (mouseX >= rotatedBounds.x &&
                mouseX <= rotatedBounds.x + rotatedBounds.width &&
                mouseY >= rotatedBounds.y &&
                mouseY <= rotatedBounds.y + rotatedBounds.height) {
                // 在变换后的图片区域内，创建新的裁剪区域
                this.dragMode = 'resize';
            }
            else {
                // 在图片区域外，不响应
                this.isDragging = false;
                return;
            }
        }
    }
    handleMouseMove(event) {
        if (!this.isDragging)
            return;
        const canvas = this.editor.canvas;
        const mouseX = event.canvasX || event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.canvasY || event.clientY - canvas.getBoundingClientRect().top;
        const minSize = CROP_CONFIG.MIN_CROP_SIZE;
        const rotatedBounds = this.getTransformedBounds(canvas);
        let newCrop = { ...this.initialCrop };
        switch (this.dragMode) {
            case 'move':
                const deltaX = mouseX - this.dragStart.x;
                const deltaY = mouseY - this.dragStart.y;
                newCrop.x = Math.max(rotatedBounds.x, Math.min(rotatedBounds.x + rotatedBounds.width - newCrop.width, this.initialCrop.x + deltaX));
                newCrop.y = Math.max(rotatedBounds.y, Math.min(rotatedBounds.y + rotatedBounds.height - newCrop.height, this.initialCrop.y + deltaY));
                break;
            case 'resize':
                // 创建新的裁剪区域
                const startX = Math.min(this.dragStart.x, mouseX);
                const startY = Math.min(this.dragStart.y, mouseY);
                const endX = Math.max(this.dragStart.x, mouseX);
                const endY = Math.max(this.dragStart.y, mouseY);
                newCrop = {
                    x: Math.max(rotatedBounds.x, startX),
                    y: Math.max(rotatedBounds.y, startY),
                    width: Math.min(rotatedBounds.x + rotatedBounds.width - startX, endX - startX),
                    height: Math.min(rotatedBounds.y + rotatedBounds.height - startY, endY - startY),
                };
                break;
            case 'tl':
                const newRight = this.initialCrop.x + this.initialCrop.width;
                const newBottom = this.initialCrop.y + this.initialCrop.height;
                if (this.isShiftPressed) {
                    // 按住Shift键，保持宽高比
                    const deltaX = mouseX - this.dragStart.x;
                    const deltaY = mouseY - this.dragStart.y;
                    const delta = Math.min(Math.abs(deltaX), Math.abs(deltaY)) * (deltaX < 0 && deltaY < 0 ? 1 : -1);
                    newCrop.x = Math.max(rotatedBounds.x, Math.min(this.initialCrop.x + delta, newRight - minSize));
                    newCrop.y = Math.max(rotatedBounds.y, Math.min(this.initialCrop.y + delta / this.initialAspectRatio, newBottom - minSize));
                    newCrop.width = newRight - newCrop.x;
                    newCrop.height = newBottom - newCrop.y;
                }
                else {
                    newCrop.x = Math.max(rotatedBounds.x, Math.min(mouseX, newRight - minSize));
                    newCrop.y = Math.max(rotatedBounds.y, Math.min(mouseY, newBottom - minSize));
                    newCrop.width = newRight - newCrop.x;
                    newCrop.height = newBottom - newCrop.y;
                }
                break;
            case 'tr':
                const newLeft = this.initialCrop.x;
                const newBot = this.initialCrop.y + this.initialCrop.height;
                if (this.isShiftPressed) {
                    // 按住Shift键，保持宽高比
                    const deltaX = mouseX - this.dragStart.x;
                    const deltaY = mouseY - this.dragStart.y;
                    const delta = Math.min(Math.abs(deltaX), Math.abs(deltaY)) * (deltaX > 0 && deltaY < 0 ? 1 : -1);
                    newCrop.x = newLeft;
                    newCrop.y = Math.max(rotatedBounds.y, Math.min(this.initialCrop.y - delta / this.initialAspectRatio, newBot - minSize));
                    newCrop.width = Math.min(rotatedBounds.x + rotatedBounds.width - newLeft, Math.max(minSize, this.initialCrop.width + delta));
                    newCrop.height = newBot - newCrop.y;
                }
                else {
                    newCrop.x = newLeft;
                    newCrop.y = Math.max(rotatedBounds.y, Math.min(mouseY, newBot - minSize));
                    newCrop.width = Math.min(rotatedBounds.x + rotatedBounds.width - newLeft, Math.max(minSize, mouseX - newLeft));
                    newCrop.height = newBot - newCrop.y;
                }
                break;
            case 'br':
                if (this.isShiftPressed) {
                    // 按住Shift键，保持宽高比
                    const deltaX = mouseX - this.dragStart.x;
                    const deltaY = mouseY - this.dragStart.y;
                    const delta = Math.min(Math.abs(deltaX), Math.abs(deltaY)) * (deltaX > 0 && deltaY > 0 ? 1 : -1);
                    newCrop.width = Math.min(rotatedBounds.x + rotatedBounds.width - this.initialCrop.x, Math.max(minSize, this.initialCrop.width + delta));
                    newCrop.height = Math.min(rotatedBounds.y + rotatedBounds.height - this.initialCrop.y, Math.max(minSize, this.initialCrop.height + delta / this.initialAspectRatio));
                }
                else {
                    newCrop.width = Math.min(rotatedBounds.x + rotatedBounds.width - this.initialCrop.x, Math.max(minSize, mouseX - this.initialCrop.x));
                    newCrop.height = Math.min(rotatedBounds.y + rotatedBounds.height - this.initialCrop.y, Math.max(minSize, mouseY - this.initialCrop.y));
                }
                break;
            case 'bl':
                const newR = this.initialCrop.x + this.initialCrop.width;
                if (this.isShiftPressed) {
                    // 按住Shift键，保持宽高比
                    const deltaX = mouseX - this.dragStart.x;
                    const deltaY = mouseY - this.dragStart.y;
                    const delta = Math.min(Math.abs(deltaX), Math.abs(deltaY)) * (deltaX < 0 && deltaY > 0 ? 1 : -1);
                    newCrop.x = Math.max(rotatedBounds.x, Math.min(this.initialCrop.x - delta, newR - minSize));
                    newCrop.width = newR - newCrop.x;
                    newCrop.height = Math.min(rotatedBounds.y + rotatedBounds.height - this.initialCrop.y, Math.max(minSize, this.initialCrop.height + delta / this.initialAspectRatio));
                }
                else {
                    newCrop.x = Math.max(rotatedBounds.x, Math.min(mouseX, newR - minSize));
                    newCrop.width = newR - newCrop.x;
                    newCrop.height = Math.min(rotatedBounds.y + rotatedBounds.height - this.initialCrop.y, Math.max(minSize, mouseY - this.initialCrop.y));
                }
                break;
            case 't':
                const newB = this.initialCrop.y + this.initialCrop.height;
                newCrop.y = Math.max(rotatedBounds.y, Math.min(mouseY, newB - minSize));
                newCrop.height = newB - newCrop.y;
                break;
            case 'r':
                newCrop.width = Math.min(rotatedBounds.x + rotatedBounds.width - this.initialCrop.x, Math.max(minSize, mouseX - this.initialCrop.x));
                break;
            case 'b':
                newCrop.height = Math.min(rotatedBounds.y + rotatedBounds.height - this.initialCrop.y, Math.max(minSize, mouseY - this.initialCrop.y));
                break;
            case 'l':
                const newRi = this.initialCrop.x + this.initialCrop.width;
                newCrop.x = Math.max(rotatedBounds.x, Math.min(mouseX, newRi - minSize));
                newCrop.width = newRi - newCrop.x;
                break;
        }
        this.editor.setState({ crop: newCrop });
    }
    handleMouseUp() {
        this.isDragging = false;
        this.dragMode = 'none';
    }
    handleKeyDown(event) {
        if (event.key === 'Shift') {
            this.isShiftPressed = true;
        }
    }
    handleKeyUp(event) {
        if (event.key === 'Shift') {
            this.isShiftPressed = false;
        }
    }
    destroy() {
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
        document.removeEventListener('keyup', this.handleKeyUp.bind(this));
    }
}

/**
 * 图像滤镜工具函数
 *
 * 统一处理各种图像滤镜效果
 */
/**
 * 通用像素处理函数
 */
const processPixels = (data, processor) => {
    for (let i = 0; i < data.length; i += 4) {
        const [r, g, b, a] = processor(data[i] ?? 0, data[i + 1] ?? 0, data[i + 2] ?? 0, data[i + 3] ?? 255);
        data[i] = Math.max(0, Math.min(255, r));
        data[i + 1] = Math.max(0, Math.min(255, g));
        data[i + 2] = Math.max(0, Math.min(255, b));
        data[i + 3] = a;
    }
};
/**
 * 滤镜处理器映射
 */
const filterProcessors = {
    chrome: (r, g, b, a) => [r * 1.2, g * 1.1, b * 0.9, a],
    fade: (r, g, b, a) => [r + 30, g + 30, b + 30, a],
    cold: (r, g, b, a) => [r - 20, g, b + 20, a],
    warm: (r, g, b, a) => [r + 20, g + 10, b - 20, a],
    mono: (r, g, b, a) => {
        const gray = r * 0.299 + g * 0.587 + b * 0.114;
        return [gray, gray, gray, a];
    },
    sepia: (r, g, b, a) => [
        r * 0.393 + g * 0.769 + b * 0.189,
        r * 0.349 + g * 0.686 + b * 0.168,
        r * 0.272 + g * 0.534 + b * 0.131,
        a
    ],
};
/**
 * 应用滤镜到图像数据
 */
const applyFilter = (imageData, filterType) => {
    const data = new Uint8ClampedArray(imageData.data);
    const processor = filterProcessors[filterType];
    if (processor) {
        processPixels(data, processor);
    }
    return new ImageData(data, imageData.width, imageData.height);
};

class FilterPlugin {
    constructor() {
        this.name = 'filter';
        this.canvas = null;
        this.ctx = null;
    }
    init(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    applyFilter(imageData, filterType) {
        // 映射旧的滤镜名称到新的类型
        const filterMap = {
            monoDefault: 'mono',
            sepiaDefault: 'sepia',
        };
        const mappedType = filterMap[filterType] || filterType;
        return applyFilter(imageData, mappedType);
    }
    initialize(editor) { }
    destroy() {
        this.canvas = null;
        this.ctx = null;
    }
}

class FinetunePlugin {
    constructor() {
        this.name = 'finetune';
        this.canvas = null;
        this.ctx = null;
    }
    init(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    applyAdjustments(imageData, adjustments) {
        const data = new Uint8ClampedArray(imageData.data);
        const width = imageData.width;
        const height = imageData.height;
        // Apply brightness
        if (adjustments.brightness !== undefined && adjustments.brightness !== 0) {
            this.applyBrightness(data, adjustments.brightness);
        }
        // Apply contrast
        if (adjustments.contrast !== undefined && adjustments.contrast !== 0) {
            this.applyContrast(data, adjustments.contrast);
        }
        // Apply saturation
        if (adjustments.saturation !== undefined && adjustments.saturation !== 0) {
            this.applySaturation(data, adjustments.saturation);
        }
        // Apply exposure
        if (adjustments.exposure !== undefined && adjustments.exposure !== 0) {
            this.applyExposure(data, adjustments.exposure);
        }
        // Apply gamma
        if (adjustments.gamma !== undefined && adjustments.gamma !== 0) {
            this.applyGamma(data, adjustments.gamma);
        }
        // Apply vignette
        if (adjustments.vignette !== undefined && adjustments.vignette !== 0) {
            this.applyVignette(data, width, height, adjustments.vignette);
        }
        return new ImageData(data, width, height);
    }
    applyBrightness(data, brightness) {
        const factor = brightness * 2.55;
        processPixelData(data, (r, g, b, a) => [r + factor, g + factor, b + factor, a]);
    }
    applyContrast(data, contrast) {
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
        processPixelData(data, (r, g, b, a) => [
            factor * (r - 128) + 128,
            factor * (g - 128) + 128,
            factor * (b - 128) + 128,
            a
        ]);
    }
    applySaturation(data, saturation) {
        const factor = (saturation + 100) / 100;
        processPixelData(data, (r, g, b, a) => {
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            return [
                gray + factor * (r - gray),
                gray + factor * (g - gray),
                gray + factor * (b - gray),
                a
            ];
        });
    }
    applyExposure(data, exposure) {
        const factor = Math.pow(2, exposure / 100);
        processPixelData(data, (r, g, b, a) => [r * factor, g * factor, b * factor, a]);
    }
    applyGamma(data, gamma) {
        const factor = 1 + gamma / 100;
        const invGamma = 1 / factor;
        processPixelData(data, (r, g, b, a) => [
            255 * Math.pow(r / 255, invGamma),
            255 * Math.pow(g / 255, invGamma),
            255 * Math.pow(b / 255, invGamma),
            a
        ]);
    }
    applyVignette(data, width, height, vignette) {
        const centerX = width / 2;
        const centerY = height / 2;
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        const vignetteStrength = vignette / 100;
        processPixelData(data, (r, g, b, a, index) => {
            const pixelIndex = index / 4;
            const x = pixelIndex % width;
            const y = Math.floor(pixelIndex / width);
            const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
            const factor = 1 - (distance / maxDistance) * vignetteStrength;
            return [r * factor, g * factor, b * factor, a];
        });
    }
    initialize(editor) { }
    destroy() {
        this.canvas = null;
        this.ctx = null;
    }
}

class HtmlSelectionPlugin {
    constructor() {
        this.name = 'htmlSelection';
        this.selectedItem = null;
        this.isDragging = false;
        this.isResizing = false;
        this.isRotating = false;
        this.dragOffset = { x: 0, y: 0 };
        this.resizeHandle = '';
        this.rotateStartAngle = 0;
        this.isSelectMode = false;
        this.overlayContainer = null;
        this.manipulators = [];
        this.canvasScale = 1;
        this.isBoxSelecting = false;
        this.boxSelectStart = { x: 0, y: 0 };
        this.boxSelectEnd = { x: 0, y: 0 };
        this.selectionBox = null;
        this.selectedItems = [];
        this.isShiftPressed = false;
        this.initialAspectRatio = 1;
        this.handleKeyDown = (e) => {
            if (e.key === 'Shift') {
                this.isShiftPressed = true;
            }
        };
        this.handleKeyUp = (e) => {
            if (e.key === 'Shift') {
                this.isShiftPressed = false;
            }
        };
        this.handleGlobalMouseMove = (e) => {
            if (!this.selectedItem || (!this.isResizing && !this.isRotating))
                return;
            const canvas = this.editor.canvas;
            if (!canvas)
                return;
            const canvasRect = canvas.getBoundingClientRect();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            // 计算鼠标在Canvas内的坐标
            const mouseX = e.clientX - canvasRect.left;
            const mouseY = e.clientY - canvasRect.top;
            // 转换为Canvas内部坐标系（基于Canvas原始尺寸和显示尺寸的比例）
            const x = (mouseX / canvasRect.width) * canvasWidth;
            const y = (mouseY / canvasRect.height) * canvasHeight;
            if (this.isResizing) {
                this.resizeItem(this.selectedItem, x, y, this.resizeHandle, this.isShiftPressed);
                this.showManipulators(this.selectedItem);
            }
            else if (this.isRotating) {
                const { x: centerX, y: centerY } = this.getItemCenter(this.selectedItem);
                const currentAngle = Math.atan2(y - centerY, x - centerX);
                let deltaAngle = ((currentAngle - this.rotateStartAngle) * 180) / Math.PI;
                if (deltaAngle > 180)
                    deltaAngle -= 360;
                if (deltaAngle < -180)
                    deltaAngle += 360;
                this.selectedItem.rotation = (this.selectedItem.rotation || 0) + deltaAngle;
                this.rotateStartAngle = currentAngle;
                this.showManipulators(this.selectedItem);
            }
            this.updateItemInState(this.selectedItem);
            this.editor.render();
        };
        this.handleGlobalMouseUp = () => {
            if (this.isResizing || this.isRotating) {
                const state = this.editor.getState();
                this.editor.setState({
                    stickers: state.stickers,
                    annotations: state.annotations,
                    images: state.images,
                });
            }
            this.isResizing = false;
            this.isRotating = false;
            this.resizeHandle = '';
            this.removeGlobalListeners();
        };
    }
    initialize(editor) {
        this.editor = editor;
        this.createOverlay();
        this.addKeyboardListeners();
    }
    setSelectMode(isSelect) {
        this.isSelectMode = isSelect;
        if (!isSelect) {
            this.hideManipulators();
        }
    }
    selectItem(item) {
        this.selectedItem = item;
        this.selectedItems = [item];
        this.showManipulators(item);
        // 通知主组件有选中项
        if (this.onSelectionChange) {
            this.onSelectionChange(true);
        }
    }
    setSelectionChangeCallback(callback) {
        this.onSelectionChange = callback;
    }
    setCanvasScale(scale) {
        this.canvasScale = scale;
        // 缩放变化时刷新选中框
        if (this.selectedItem && this.isSelectMode) {
            this.showManipulators(this.selectedItem);
        }
    }
    clearSelection() {
        this.selectedItem = null;
        this.selectedItems = [];
        this.hideManipulators();
        this.hideSelectionBox();
        if (this.onSelectionChange) {
            this.onSelectionChange(false);
        }
    }
    createOverlay() {
        const canvas = this.editor.canvas;
        if (!canvas)
            return;
        this.overlayContainer = document.createElement('div');
        this.overlayContainer.className = 'dk-img-editor-selection-overlay';
        this.overlayContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 10;
    `;
        canvas.parentElement?.appendChild(this.overlayContainer);
    }
    createManipulator(type, cursor, x, y, handle) {
        const manipulator = document.createElement('div');
        manipulator.className = 'dk-img-editor-manipulator';
        manipulator.dataset.control = type;
        if (handle)
            manipulator.dataset.handle = handle;
        // 固定尺寸，不受缩放影响
        const handleSize = type === 'rotate' ? 16 : 12;
        const borderWidth = type === 'rotate' ? 0 : 2;
        manipulator.style.cssText = `
      position: absolute;
      width: ${handleSize}px;
      height: ${handleSize}px;
      background: ${type === 'rotate' ? 'transparent' : '#007bff'};
      border: ${type === 'rotate' ? 'none' : `${borderWidth}px solid white`};
      border-radius: ${type === 'rotate' ? '0' : '2px'};
      cursor: ${cursor};
      pointer-events: auto;
      transform: translate(-50%, -50%);
      left: ${x}px;
      top: ${y}px;
      z-index: 11;
      color: #007bff;
      box-sizing: border-box;
    `;
        manipulator.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            if (type === 'rotate') {
                this.startRotation(e);
            }
            else if (handle) {
                this.startResize(e, handle);
            }
        });
        return manipulator;
    }
    showManipulators(item) {
        this.hideManipulators();
        if (!this.overlayContainer || !this.isSelectMode)
            return;
        const canvas = this.editor.canvas;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const canvasRect = canvas.getBoundingClientRect();
        const containerRect = canvas.parentElement.getBoundingClientRect();
        // 重置 overlay 容器，不使用 transform
        this.overlayContainer.style.transform = 'none';
        this.overlayContainer.style.transformOrigin = 'initial';
        // 计算坐标转换参数
        const scaleX = canvasRect.width / canvasWidth;
        const scaleY = canvasRect.height / canvasHeight;
        const offsetX = scaleX >= 1 ? 0 : canvasRect.left - containerRect.left;
        const offsetY = scaleY >= 1 ? 0 : canvasRect.top - containerRect.top;
        const bounds = this.getItemBounds(item);
        const { left, top, right, bottom } = bounds;
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;
        // 创建虚线边框
        const selectionBox = document.createElement('div');
        selectionBox.className = 'dk-img-editor-selection-box';
        const rotation = item.rotation || 0;
        // 选择框使用中心旋转
        const transformOrigin = 'center';
        // 将 Canvas 坐标转换为屏幕坐标
        const displayLeft = bounds.left * scaleX + offsetX;
        const displayTop = bounds.top * scaleY + offsetY;
        const displayWidth = (bounds.right - bounds.left) * scaleX;
        const displayHeight = (bounds.bottom - bounds.top) * scaleY;
        // 固定边框宽度 2px，不受缩放影响
        const borderWidth = 2;
        selectionBox.style.cssText = `
      position: absolute;
      left: ${displayLeft}px;
      top: ${displayTop}px;
      width: ${displayWidth}px;
      height: ${displayHeight}px;
      border: ${borderWidth}px dashed white;
      pointer-events: none;
      z-index: 10;
      transform-origin: ${transformOrigin};
      transform: rotate(${rotation}deg);
    `;
        this.manipulators.push(selectionBox);
        this.overlayContainer.appendChild(selectionBox);
        // 4个角的缩放手柄
        const corners = [
            { x: left, y: top, cursor: 'nw-resize', handle: 'tl' },
            { x: right, y: top, cursor: 'ne-resize', handle: 'tr' },
            { x: right, y: bottom, cursor: 'se-resize', handle: 'br' },
            { x: left, y: bottom, cursor: 'sw-resize', handle: 'bl' },
        ];
        corners.forEach((corner) => {
            const { x: displayX, y: displayY } = this.transformPoint(corner.x, corner.y, centerX, centerY, rotation, scaleX, scaleY, offsetX, offsetY);
            const manipulator = this.createManipulator('point', corner.cursor, displayX, displayY, corner.handle);
            this.manipulators.push(manipulator);
            this.overlayContainer.appendChild(manipulator);
        });
        // 旋转手柄
        const rotateX = right + 25;
        const rotateY = top;
        const { x: rotateDisplayX, y: rotateDisplayY } = this.transformPoint(rotateX, rotateY, centerX, centerY, rotation, scaleX, scaleY, offsetX, offsetY);
        const rotateManipulator = this.createManipulator('rotate', 'grab', rotateDisplayX, rotateDisplayY);
        // Add rotate icon
        rotateManipulator.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4v6h6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.51 15a9 9 0 102.13-9.36L1 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
        this.manipulators.push(rotateManipulator);
        this.overlayContainer.appendChild(rotateManipulator);
    }
    hideManipulators() {
        this.manipulators.forEach((m) => m.remove());
        this.manipulators = [];
    }
    startResize(e, handle) {
        this.isResizing = true;
        this.resizeHandle = handle;
        // 记录初始宽高比
        if (this.selectedItem) {
            const bounds = this.getItemBounds(this.selectedItem);
            const width = bounds.right - bounds.left;
            const height = bounds.bottom - bounds.top;
            this.initialAspectRatio = width / height;
        }
        e.preventDefault();
        this.addGlobalListeners();
    }
    startRotation(e) {
        if (!this.selectedItem)
            return;
        this.isRotating = true;
        const { x: centerX, y: centerY } = this.getItemCenter(this.selectedItem);
        this.rotateStartAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        e.preventDefault();
        this.addGlobalListeners();
    }
    addGlobalListeners() {
        document.addEventListener('mousemove', this.handleGlobalMouseMove);
        document.addEventListener('mouseup', this.handleGlobalMouseUp);
    }
    removeGlobalListeners() {
        document.removeEventListener('mousemove', this.handleGlobalMouseMove);
        document.removeEventListener('mouseup', this.handleGlobalMouseUp);
    }
    addKeyboardListeners() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }
    handleMouseDown(event) {
        const canvas = this.editor.canvas;
        if (!canvas)
            return;
        // 获取Canvas的实际位置和尺寸
        const canvasRect = canvas.getBoundingClientRect();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        // 计算鼠标在Canvas内的坐标
        const mouseX = event.clientX - canvasRect.left;
        const mouseY = event.clientY - canvasRect.top;
        // 转换为Canvas内部坐标系（基于Canvas原始尺寸和显示尺寸的比例）
        const x = (mouseX / canvasRect.width) * canvasWidth;
        const y = (mouseY / canvasRect.height) * canvasHeight;
        const state = this.editor.getState();
        const allItems = [...(state.stickers || []), ...(state.annotations || []), ...(state.images || [])];
        // 检查是否点击了现有元素
        let clickedItem = null;
        for (let i = allItems.length - 1; i >= 0; i--) {
            if (this.isPointInItem(x, y, allItems[i])) {
                clickedItem = allItems[i];
                break;
            }
        }
        if (clickedItem) {
            // 检查是否点击了已选中的元素
            const isAlreadySelected = this.selectedItems.some((item) => item.id === clickedItem.id);
            if (!isAlreadySelected) {
                this.selectedItem = clickedItem;
                this.selectedItems = [clickedItem];
                this.showManipulators(clickedItem);
            }
            // 通知主组件有选中项
            if (this.onSelectionChange) {
                this.onSelectionChange(true);
            }
            // 只在select模式下才能拖拽
            if (this.isSelectMode && !this.isResizing && !this.isRotating) {
                this.isDragging = true;
                this.dragOffset = { x: x - clickedItem.x, y: y - clickedItem.y };
            }
        }
        else {
            // 清除任何现有的选择框
            this.hideSelectionBox();
            // 开始框选
            if (this.isSelectMode) {
                this.isBoxSelecting = true;
                this.boxSelectStart = { x, y };
                this.boxSelectEnd = { x, y };
                this.showSelectionBox();
            }
            this.selectedItem = null;
            this.selectedItems = [];
            this.hideManipulators();
            // 通知主组件没有选中项
            if (this.onSelectionChange) {
                this.onSelectionChange(false);
            }
        }
    }
    handleMouseMove(event) {
        const canvas = this.editor.canvas;
        if (!canvas)
            return;
        // 获取Canvas的实际位置和尺寸
        const canvasRect = canvas.getBoundingClientRect();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        // 计算鼠标在Canvas内的坐标
        const mouseX = event.clientX - canvasRect.left;
        const mouseY = event.clientY - canvasRect.top;
        // 转换为Canvas内部坐标系（基于Canvas原始尺寸和显示尺寸的比例）
        const x = (mouseX / canvasRect.width) * canvasWidth;
        const y = (mouseY / canvasRect.height) * canvasHeight;
        if (this.isBoxSelecting) {
            this.boxSelectEnd = { x, y };
            this.updateSelectionBox();
            return;
        }
        if (!this.selectedItem || !this.isSelectMode)
            return;
        if (this.isDragging) {
            if (this.selectedItems.length > 1) {
                // 批量移动
                const newX = x - this.dragOffset.x;
                const newY = y - this.dragOffset.y;
                const deltaX = newX - this.selectedItem.x;
                const deltaY = newY - this.selectedItem.y;
                this.selectedItems.forEach((item) => {
                    if (item.type === 'sharpie' && item.points) {
                        item.points = item.points.map((p) => ({
                            x: p.x + deltaX,
                            y: p.y + deltaY,
                        }));
                    }
                    item.x += deltaX;
                    item.y += deltaY;
                });
                this.hideManipulators();
                this.showMultiSelectionBorders();
            }
            else {
                this.moveItem(this.selectedItem, x - this.dragOffset.x, y - this.dragOffset.y);
                this.showManipulators(this.selectedItem);
            }
        }
        else if (this.isResizing) {
            this.resizeItem(this.selectedItem, x, y, this.resizeHandle);
            this.showManipulators(this.selectedItem);
        }
        else if (this.isRotating) {
            const { x: centerX, y: centerY } = this.getItemCenter(this.selectedItem);
            const currentAngle = Math.atan2(y - centerY, x - centerX);
            let deltaAngle = ((currentAngle - this.rotateStartAngle) * 180) / Math.PI;
            if (deltaAngle > 180)
                deltaAngle -= 360;
            if (deltaAngle < -180)
                deltaAngle += 360;
            this.selectedItem.rotation = (this.selectedItem.rotation || 0) + deltaAngle;
            this.rotateStartAngle = currentAngle;
            this.showManipulators(this.selectedItem);
        }
        if (this.isDragging || this.isResizing || this.isRotating) {
            this.updateItemInState(this.selectedItem);
            this.editor.render();
        }
    }
    handleMouseUp() {
        if (this.isBoxSelecting) {
            this.finishBoxSelection();
            this.isBoxSelecting = false;
            // 确保选择框被隐藏
            this.hideSelectionBox();
            return;
        }
        if ((this.isDragging || this.isResizing || this.isRotating) && this.isSelectMode) {
            if (this.selectedItems.length > 1 && this.isDragging) {
                this.updateMultipleItemsInState();
            }
            else {
                const state = this.editor.getState();
                this.editor.setState({
                    stickers: state.stickers,
                    annotations: state.annotations,
                    images: state.images,
                });
            }
        }
        this.isDragging = false;
        this.isResizing = false;
        this.isRotating = false;
        this.resizeHandle = '';
    }
    render(ctx) {
        // HTML版本不需要在canvas上渲染
    }
    deleteSelected() {
        if (this.selectedItems.length === 0)
            return;
        const state = this.editor.getState();
        const selectedIds = new Set(this.selectedItems.map((item) => item.id));
        const stickers = state.stickers.filter((s) => !selectedIds.has(s.id));
        const images = state.images.filter((i) => !selectedIds.has(i.id));
        const annotations = state.annotations.filter((a) => !selectedIds.has(a.id));
        this.editor.setState({ stickers, images, annotations });
        this.selectedItem = null;
        this.selectedItems = [];
        this.hideManipulators();
        if (this.onSelectionChange) {
            this.onSelectionChange(false);
        }
    }
    copySelected() {
        if (this.selectedItems.length === 0)
            return;
        const state = this.editor.getState();
        const newItems = [];
        const offset = 20; // 复制偏移量
        this.selectedItems.forEach((item) => {
            const newId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
            const copiedItem = {
                ...item,
                id: newId,
                x: item.x + offset,
                y: item.y + offset,
                zIndex: (item.zIndex || 0) + 1,
            };
            // sharpie类型需要深拷贝points数组并移动所有点
            if (item.type === 'sharpie' && item.points) {
                copiedItem.points = item.points.map((p) => ({
                    x: p.x + offset,
                    y: p.y + offset,
                }));
            }
            newItems.push(copiedItem);
        });
        // 按类型分组添加到状态
        const stickers = [...state.stickers];
        const images = [...state.images];
        const annotations = [...state.annotations];
        newItems.forEach((item) => {
            if (this.isSticker(item)) {
                stickers.push(item);
            }
            else if (this.isImage(item)) {
                images.push(item);
            }
            else {
                annotations.push(item);
            }
        });
        this.editor.setState({ stickers, images, annotations });
        // 选中新复制的元素
        this.selectedItems = newItems;
        if (newItems.length === 1) {
            this.selectedItem = newItems[0] ?? null;
            if (this.selectedItem)
                this.showManipulators(this.selectedItem);
        }
        else {
            this.selectedItem = newItems[0] ?? null;
            this.hideManipulators();
            this.showMultiSelectionBorders();
        }
    }
    isSticker(item) {
        return 'sticker' in item;
    }
    isImage(item) {
        return item.type === 'image';
    }
    getItemCenter(item) {
        if (this.isSticker(item)) {
            return { x: item.x, y: item.y };
        }
        return { x: item.x + (item.width || 0) / 2, y: item.y + (item.height || 0) / 2 };
    }
    moveItem(item, x, y) {
        if (item.type === 'sharpie' && item.points) {
            // sharpie类型需要移动所有点
            const deltaX = x - item.x;
            const deltaY = y - item.y;
            item.points = item.points.map((p) => ({
                x: p.x + deltaX,
                y: p.y + deltaY,
            }));
        }
        item.x = x;
        item.y = y;
    }
    resizeItem(item, x, y, handle, isShiftPressed = false) {
        if (this.isSticker(item)) {
            const centerX = item.x;
            const centerY = item.y;
            let newSize = Math.max(20, Math.min(200, Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) * 2));
            item.size = newSize;
        }
        else if (this.isImage(item)) {
            const centerX = item.x;
            const centerY = item.y;
            const aspectRatio = item.width / item.height;
            const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
            item.width = Math.max(50, Math.min(400, distance * 2));
            item.height = item.width / aspectRatio;
        }
        else if (item.type === 'sharpie' && item.points) {
            // sharpie类型的缩放：基于边界框缩放所有点
            const points = item.points;
            const xs = points.map((p) => p.x);
            const ys = points.map((p) => p.y);
            const minX = Math.min(...xs);
            const maxX = Math.max(...xs);
            const minY = Math.min(...ys);
            const maxY = Math.max(...ys);
            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;
            const currentWidth = maxX - minX;
            const currentHeight = maxY - minY;
            let newWidth = currentWidth;
            let newHeight = currentHeight;
            switch (handle) {
                case 'br':
                    newWidth = Math.max(20, x - minX);
                    newHeight = Math.max(20, y - minY);
                    if (isShiftPressed) {
                        const scale = Math.max(newWidth / currentWidth, newHeight / currentHeight);
                        newWidth = currentWidth * scale;
                        newHeight = currentHeight * scale;
                    }
                    break;
                case 'tr':
                    newWidth = Math.max(20, x - minX);
                    newHeight = Math.max(20, maxY - y);
                    if (isShiftPressed) {
                        const scale = Math.max(newWidth / currentWidth, newHeight / currentHeight);
                        newWidth = currentWidth * scale;
                        newHeight = currentHeight * scale;
                    }
                    break;
                case 'bl':
                    newWidth = Math.max(20, maxX - x);
                    newHeight = Math.max(20, y - minY);
                    if (isShiftPressed) {
                        const scale = Math.max(newWidth / currentWidth, newHeight / currentHeight);
                        newWidth = currentWidth * scale;
                        newHeight = currentHeight * scale;
                    }
                    break;
                case 'tl':
                    newWidth = Math.max(20, maxX - x);
                    newHeight = Math.max(20, maxY - y);
                    if (isShiftPressed) {
                        const scale = Math.max(newWidth / currentWidth, newHeight / currentHeight);
                        newWidth = currentWidth * scale;
                        newHeight = currentHeight * scale;
                    }
                    break;
            }
            const scaleX = newWidth / currentWidth;
            const scaleY = newHeight / currentHeight;
            item.points = points.map((p) => ({
                x: centerX + (p.x - centerX) * scaleX,
                y: centerY + (p.y - centerY) * scaleY,
            }));
            // 更新起始点
            item.x = centerX;
            item.y = centerY;
        }
        else if (item.type === 'text') {
            // 文本类型：根据拖拽位置计算字号
            const currentWidth = item.width || 100;
            const currentHeight = item.fontSize || 24;
            let newWidth, newHeight;
            switch (handle) {
                case 'br': // 右下角
                    newWidth = Math.max(50, x - item.x);
                    newHeight = Math.max(12, item.y - y);
                    break;
                case 'tr': // 右上角
                    newWidth = Math.max(50, x - item.x);
                    newHeight = Math.max(12, currentHeight);
                    break;
                case 'bl': // 左下角
                    newWidth = Math.max(50, currentWidth);
                    newHeight = Math.max(12, item.y - y);
                    break;
                case 'tl': // 左上角
                    newWidth = Math.max(50, currentWidth);
                    newHeight = Math.max(12, currentHeight);
                    break;
                default:
                    newWidth = currentWidth;
                    newHeight = currentHeight;
            }
            // 根据宽度或高度变化计算新字号
            const widthScale = newWidth / currentWidth;
            const heightScale = newHeight / currentHeight;
            const scale = Math.max(widthScale, heightScale);
            const newFontSize = Math.max(12, Math.min(72, (item.fontSize || 24) * scale));
            item.fontSize = newFontSize;
            // 重新计算文本尺寸
            if (item.text) {
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                const fontWeight = item.fontWeight || 'normal';
                const fontStyle = item.fontStyle || 'normal';
                tempCtx.font = `${fontStyle} ${fontWeight} ${newFontSize}px Arial`;
                item.width = tempCtx.measureText(item.text).width;
                item.height = newFontSize;
            }
        }
        else {
            const originalX = item.x;
            const originalY = item.y;
            const originalWidth = item.width || 0;
            const originalHeight = item.height || 0;
            let newWidth, newHeight, newX = originalX, newY = originalY;
            switch (handle) {
                case 'tl':
                    newWidth = originalX + originalWidth - x;
                    newHeight = originalY + originalHeight - y;
                    newX = x;
                    newY = y;
                    break;
                case 'tr':
                    newWidth = x - originalX;
                    newHeight = originalY + originalHeight - y;
                    newY = y;
                    break;
                case 'br':
                    newWidth = x - originalX;
                    newHeight = y - originalY;
                    break;
                case 'bl':
                    newWidth = originalX + originalWidth - x;
                    newHeight = y - originalY;
                    newX = x;
                    break;
                default:
                    newWidth = originalWidth;
                    newHeight = originalHeight;
            }
            // 按住Shift键时保持宽高比
            if (isShiftPressed && this.initialAspectRatio > 0) {
                const currentAspectRatio = newWidth / newHeight;
                if (currentAspectRatio > this.initialAspectRatio) {
                    // 宽度过大，以高度为准
                    newWidth = newHeight * this.initialAspectRatio;
                }
                else {
                    // 高度过大，以宽度为准
                    newHeight = newWidth / this.initialAspectRatio;
                }
                // 根据拖拽角调整位置
                switch (handle) {
                    case 'tl':
                        newX = originalX + originalWidth - newWidth;
                        newY = originalY + originalHeight - newHeight;
                        break;
                    case 'tr':
                        newY = originalY + originalHeight - newHeight;
                        break;
                    case 'bl':
                        newX = originalX + originalWidth - newWidth;
                        break;
                }
            }
            item.width = Math.max(20, newWidth);
            item.height = Math.max(20, newHeight);
            item.x = newX;
            item.y = newY;
        }
    }
    updateItemInState(item) {
        const state = this.editor.getState();
        if (this.isSticker(item)) {
            const stickers = [...state.stickers];
            const index = stickers.findIndex((s) => s.id === item.id);
            if (index !== -1) {
                stickers[index] = item;
                this.editor.setState({ stickers }, false);
            }
        }
        else if (this.isImage(item)) {
            const images = [...state.images];
            const index = images.findIndex((i) => i.id === item.id);
            if (index !== -1) {
                images[index] = item;
                this.editor.setState({ images }, false);
            }
        }
        else {
            const annotations = [...state.annotations];
            const index = annotations.findIndex((a) => a.id === item.id);
            if (index !== -1) {
                annotations[index] = item;
                this.editor.setState({ annotations }, false);
            }
        }
    }
    isPointInItem(x, y, item) {
        if (this.isSticker(item)) {
            const halfSize = item.size / 2;
            return x >= item.x - halfSize && x <= item.x + halfSize && y >= item.y - halfSize && y <= item.y + halfSize;
        }
        else if (this.isImage(item)) {
            const halfWidth = item.width / 2;
            const halfHeight = item.height / 2;
            return x >= item.x - halfWidth && x <= item.x + halfWidth && y >= item.y - halfHeight && y <= item.y + halfHeight;
        }
        else {
            if (item.type === 'text') {
                const textWidth = this.getTextWidth(item);
                const textHeight = item.fontSize || 24;
                const left = item.x;
                const right = item.x + textWidth;
                const top = item.y - textHeight * 0.8;
                const bottom = item.y + textHeight * 0.2;
                // 如果文本有旋转，需要考虑旋转后的点击检测
                if (item.rotation) {
                    const centerX = (left + right) / 2;
                    const centerY = (top + bottom) / 2;
                    const angle = (-item.rotation * Math.PI) / 180; // 反向旋转
                    const dx = x - centerX;
                    const dy = y - centerY;
                    const rotatedX = dx * Math.cos(angle) - dy * Math.sin(angle) + centerX;
                    const rotatedY = dx * Math.sin(angle) + dy * Math.cos(angle) + centerY;
                    return rotatedX >= left && rotatedX <= right && rotatedY >= top && rotatedY <= bottom;
                }
                else {
                    return x >= left && x <= right && y >= top && y <= bottom;
                }
            }
            else if (item.type === 'sharpie' && item.points) {
                // sharpie类型的点击检测：检查点是否在路径附近
                const points = item.points;
                const tolerance = 10; // 点击容差
                for (let i = 0; i < points.length - 1; i++) {
                    const p1 = points[i];
                    const p2 = points[i + 1];
                    const dist = this.pointToLineDistance(x, y, p1.x, p1.y, p2.x, p2.y);
                    if (dist <= tolerance)
                        return true;
                }
                return false;
            }
            else {
                const minX = Math.min(item.x, item.x + (item.width || 0));
                const maxX = Math.max(item.x, item.x + (item.width || 0));
                const minY = Math.min(item.y, item.y + (item.height || 0));
                const maxY = Math.max(item.y, item.y + (item.height || 0));
                return x >= minX && x <= maxX && y >= minY && y <= maxY;
            }
        }
    }
    refreshSelection() {
        if (this.selectedItem && this.isSelectMode) {
            this.showManipulators(this.selectedItem);
        }
    }
    showSelectionBox() {
        if (!this.overlayContainer)
            return;
        this.selectionBox = document.createElement('div');
        this.selectionBox.style.cssText = `
      position: absolute;
      border: 2px dashed #007bff;
      background: rgba(0, 123, 255, 0.1);
      pointer-events: none;
      z-index: 15;
    `;
        this.overlayContainer.appendChild(this.selectionBox);
    }
    updateSelectionBox() {
        if (!this.selectionBox || !this.overlayContainer)
            return;
        const canvas = this.editor.canvas;
        const canvasRect = canvas.getBoundingClientRect();
        const containerRect = canvas.parentElement.getBoundingClientRect();
        const scaleX = canvasRect.width / canvas.width;
        const scaleY = canvasRect.height / canvas.height;
        const offsetX = canvasRect.left - containerRect.left;
        const offsetY = canvasRect.top - containerRect.top;
        const left = Math.min(this.boxSelectStart.x, this.boxSelectEnd.x);
        const top = Math.min(this.boxSelectStart.y, this.boxSelectEnd.y);
        const width = Math.abs(this.boxSelectEnd.x - this.boxSelectStart.x);
        const height = Math.abs(this.boxSelectEnd.y - this.boxSelectStart.y);
        this.selectionBox.style.left = `${left * scaleX + offsetX}px`;
        this.selectionBox.style.top = `${top * scaleY + offsetY}px`;
        this.selectionBox.style.width = `${width * scaleX}px`;
        this.selectionBox.style.height = `${height * scaleY}px`;
    }
    hideSelectionBox() {
        if (this.selectionBox) {
            this.selectionBox.remove();
            this.selectionBox = null;
        }
    }
    finishBoxSelection() {
        const left = Math.min(this.boxSelectStart.x, this.boxSelectEnd.x);
        const top = Math.min(this.boxSelectStart.y, this.boxSelectEnd.y);
        const right = Math.max(this.boxSelectStart.x, this.boxSelectEnd.x);
        const bottom = Math.max(this.boxSelectStart.y, this.boxSelectEnd.y);
        // 过滤太小的选择框
        if (right - left < 5 || bottom - top < 5) {
            this.clearSelection();
            this.hideSelectionBox();
            return;
        }
        const state = this.editor.getState();
        const allItems = [...(state.stickers || []), ...(state.annotations || []), ...(state.images || [])];
        this.selectedItems = allItems.filter((item) => {
            return this.isItemInBox(item, left, top, right, bottom);
        });
        if (this.selectedItems.length > 0) {
            if (this.selectedItems.length === 1) {
                this.selectedItem = this.selectedItems[0] ?? null;
                if (this.selectedItem)
                    this.showManipulators(this.selectedItem);
            }
            else {
                // 多选时使用第一个元素作为拖拽参考
                this.selectedItem = this.selectedItems[0] ?? null;
                this.hideManipulators();
                this.showMultiSelectionBorders();
            }
            if (this.onSelectionChange) {
                this.onSelectionChange(true);
            }
        }
        else {
            // 没有选中任何元素时清除选中状态并立即隐藏选择框
            this.clearSelection();
            this.hideSelectionBox();
        }
    }
    getItemBounds(item) {
        if (this.isSticker(item)) {
            const halfSize = item.size / 2;
            return {
                left: item.x - halfSize,
                top: item.y - halfSize,
                right: item.x + halfSize,
                bottom: item.y + halfSize,
            };
        }
        if (this.isImage(item)) {
            const halfWidth = item.width / 2;
            const halfHeight = item.height / 2;
            return {
                left: item.x - halfWidth,
                top: item.y - halfHeight,
                right: item.x + halfWidth,
                bottom: item.y + halfHeight,
            };
        }
        if (item.type === 'text') {
            const textWidth = this.getTextWidth(item);
            const textHeight = item.fontSize || 24;
            return {
                left: item.x,
                right: item.x + textWidth,
                top: item.y - textHeight * 0.8,
                bottom: item.y + textHeight * 0.2,
            };
        }
        if (item.type === 'sharpie' && item.points) {
            const points = item.points;
            const xs = points.map((p) => p.x);
            const ys = points.map((p) => p.y);
            return {
                left: Math.min(...xs),
                right: Math.max(...xs),
                top: Math.min(...ys),
                bottom: Math.max(...ys),
            };
        }
        return {
            left: Math.min(item.x, item.x + (item.width || 0)),
            right: Math.max(item.x, item.x + (item.width || 0)),
            top: Math.min(item.y, item.y + (item.height || 0)),
            bottom: Math.max(item.y, item.y + (item.height || 0)),
        };
    }
    showMultiSelectionBorders() {
        if (!this.overlayContainer || this.selectedItems.length === 0)
            return;
        const canvas = this.editor.canvas;
        const canvasRect = canvas.getBoundingClientRect();
        const containerRect = canvas.parentElement.getBoundingClientRect();
        const scaleX = canvasRect.width / canvas.width;
        const scaleY = canvasRect.height / canvas.height;
        const offsetX = canvasRect.left - containerRect.left;
        const offsetY = canvasRect.top - containerRect.top;
        this.selectedItems.forEach((item) => {
            const bounds = this.getItemBounds(item);
            const selectionBorder = this.createSelectionBorder(bounds, item.rotation || 0, scaleX, scaleY, offsetX, offsetY);
            this.manipulators.push(selectionBorder);
            this.overlayContainer?.appendChild(selectionBorder);
        });
    }
    isItemInBox(item, left, top, right, bottom) {
        const { left: itemLeft, top: itemTop, right: itemRight, bottom: itemBottom } = this.getItemBounds(item);
        // 相交检测：只要有重叠就选中
        return !(itemRight < left || itemLeft > right || itemBottom < top || itemTop > bottom);
    }
    updateMultipleItemsInState() {
        const state = this.editor.getState();
        const stickers = [...state.stickers];
        const annotations = [...state.annotations];
        const images = [...state.images];
        this.selectedItems.forEach((item) => {
            if (this.isSticker(item)) {
                const index = stickers.findIndex((s) => s.id === item.id);
                if (index !== -1)
                    stickers[index] = item;
            }
            else if (this.isImage(item)) {
                const index = images.findIndex((i) => i.id === item.id);
                if (index !== -1)
                    images[index] = item;
            }
            else {
                const index = annotations.findIndex((a) => a.id === item.id);
                if (index !== -1)
                    annotations[index] = item;
            }
        });
        this.editor.setState({ stickers, annotations, images });
    }
    moveSelectedToFront() {
        if (this.selectedItems.length === 0)
            return;
        const state = this.editor.getState();
        const allItems = [...state.stickers, ...state.annotations, ...state.images];
        const maxZIndex = Math.max(...allItems.map((item) => item.zIndex || 0));
        this.selectedItems.forEach((item, index) => {
            item.zIndex = maxZIndex + index + 1;
        });
        this.updateMultipleItemsInState();
        this.editor.render();
    }
    moveSelectedToBack() {
        if (this.selectedItems.length === 0)
            return;
        const state = this.editor.getState();
        const allItems = [...state.stickers, ...state.annotations, ...state.images];
        const minZIndex = Math.min(...allItems.map((item) => item.zIndex || 0));
        this.selectedItems.forEach((item, index) => {
            item.zIndex = minZIndex - this.selectedItems.length + index;
        });
        this.updateMultipleItemsInState();
        this.editor.render();
    }
    moveSelectedForward() {
        if (this.selectedItems.length === 0)
            return;
        this.selectedItems.forEach((item) => {
            item.zIndex = (item.zIndex || 0) + 1;
        });
        this.updateMultipleItemsInState();
        this.editor.render();
    }
    moveSelectedBackward() {
        if (this.selectedItems.length === 0)
            return;
        this.selectedItems.forEach((item) => {
            item.zIndex = (item.zIndex || 0) - 1;
        });
        this.updateMultipleItemsInState();
        this.editor.render();
    }
    isMultipleSelection() {
        return this.selectedItems.length > 1;
    }
    getSelectedCount() {
        return this.selectedItems.length;
    }
    hasSelection() {
        return this.selectedItems.length > 0;
    }
    getSelectedItem() {
        return this.selectedItem;
    }
    getSelectedItems() {
        return this.selectedItems;
    }
    updateSelectedItemColors(strokeColor, fillColor) {
        if (this.selectedItems.length === 0)
            return;
        this.selectedItems.forEach((item) => {
            if ('color' in item) {
                if (strokeColor !== undefined) {
                    if (item.type === 'text') {
                        item.color = strokeColor;
                    }
                    else {
                        item.strokeColor = strokeColor;
                        item.color = strokeColor; // 保持向后兼容
                    }
                }
                if (fillColor !== undefined && item.type !== 'text' && item.type !== 'line' && item.type !== 'sharpie' && item.type !== 'path') {
                    item.fillColor = fillColor;
                }
            }
        });
        this.updateMultipleItemsInState();
        this.editor.render();
    }
    updateSelectedTextProperties(updatedItem) {
        if (this.selectedItems.length === 0 || !this.selectedItem)
            return;
        // 更新选中的文本项
        Object.assign(this.selectedItem, updatedItem);
        // 重新计算文本尺寸
        if (this.selectedItem.type === 'text' && updatedItem.text) {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            const fontSize = updatedItem.fontSize || 24;
            const fontWeight = updatedItem.fontWeight || 'normal';
            const fontStyle = updatedItem.fontStyle || 'normal';
            tempCtx.font = `${fontStyle} ${fontWeight} ${fontSize}px Arial`;
            this.selectedItem.width = tempCtx.measureText(updatedItem.text).width;
            this.selectedItem.height = fontSize;
        }
        this.updateItemInState(this.selectedItem);
        this.showManipulators(this.selectedItem);
        this.editor.render();
    }
    updateSelectedItemStrokeWidth(strokeWidth) {
        if (this.selectedItems.length === 0)
            return;
        this.selectedItems.forEach((item) => {
            if ('strokeWidth' in item) {
                item.strokeWidth = strokeWidth;
            }
        });
        this.updateMultipleItemsInState();
        this.editor.render();
    }
    transformPoint(x, y, centerX, centerY, rotation, scaleX, scaleY, offsetX, offsetY) {
        if (rotation === 0) {
            return { x: x * scaleX + offsetX, y: y * scaleY + offsetY };
        }
        const angle = (rotation * Math.PI) / 180;
        const localX = x - centerX;
        const localY = y - centerY;
        const rotatedX = centerX + localX * Math.cos(angle) - localY * Math.sin(angle);
        const rotatedY = centerY + localX * Math.sin(angle) + localY * Math.cos(angle);
        return {
            x: rotatedX * scaleX + offsetX,
            y: rotatedY * scaleY + offsetY,
        };
    }
    getTextWidth(item) {
        let textWidth = item.width;
        if (!textWidth && item.text) {
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');
            const fontSize = item.fontSize || 24;
            const fontWeight = item.fontWeight || 'normal';
            const fontStyle = item.fontStyle || 'normal';
            tempCtx.font = `${fontStyle} ${fontWeight} ${fontSize}px Arial`;
            textWidth = tempCtx.measureText(item.text).width;
        }
        return textWidth || 100;
    }
    createSelectionBorder(bounds, rotation, scaleX, scaleY, offsetX, offsetY) {
        const selectionBorder = document.createElement('div');
        selectionBorder.className = 'dk-img-editor-multi-selection-border';
        const displayLeft = bounds.left * scaleX + offsetX;
        const displayTop = bounds.top * scaleY + offsetY;
        const displayWidth = (bounds.right - bounds.left) * scaleX;
        const displayHeight = (bounds.bottom - bounds.top) * scaleY;
        selectionBorder.style.cssText = `
      position: absolute;
      left: ${displayLeft}px;
      top: ${displayTop}px;
      width: ${displayWidth}px;
      height: ${displayHeight}px;
      border: 2px dashed #007bff;
      pointer-events: none;
      z-index: 10;
      transform-origin: center;
      transform: rotate(${rotation}deg);
    `;
        return selectionBorder;
    }
    pointToLineDistance(px, py, x1, y1, x2, y2) {
        const A = px - x1;
        const B = py - y1;
        const C = x2 - x1;
        const D = y2 - y1;
        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        let param = lenSq === 0 ? -1 : dot / lenSq;
        let xx, yy;
        if (param < 0) {
            xx = x1;
            yy = y1;
        }
        else if (param > 1) {
            xx = x2;
            yy = y2;
        }
        else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
        const dx = px - xx;
        const dy = py - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }
    destroy() {
        this.hideManipulators();
        this.hideSelectionBox();
        this.removeGlobalListeners();
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
        if (this.overlayContainer) {
            this.overlayContainer.remove();
        }
        this.editor = null;
        this.selectedItem = null;
        this.selectedItems = [];
    }
}

class ImagePlugin {
    constructor() {
        this.name = 'image';
    }
    initialize(editor) {
        this.editor = editor;
    }
    setImageCompleteCallback(callback) {
        this.onImageComplete = callback;
    }
    async addImageFromFile(file) {
        const img = new Image();
        console.log('file---', file);
        img.onload = () => {
            const imageDisplay = this.editor.getImageDisplay();
            const scale = Math.min(200 / img.width, 200 / img.height);
            console.log('imageDisplay', imageDisplay);
            console.log('scale', scale);
            const newImage = {
                id: generateId(),
                type: 'image',
                x: imageDisplay.x + imageDisplay.width / 2,
                y: imageDisplay.y + imageDisplay.height / 2,
                width: img.width * scale,
                height: img.height * scale,
                rotation: 0,
                zIndex: Date.now(),
                image: img,
            };
            const state = this.editor.getState();
            const images = [...(state.images || []), newImage];
            this.editor.setState({ images });
            if (this.onImageComplete) {
                this.onImageComplete(newImage);
            }
        };
        img.onerror = (e) => {
            console.error('Failed to load image', e);
        };
        img.src = typeof file === 'string' ? file : URL.createObjectURL(file);
    }
    async addImageFromClipboard(clipboardData) {
        const items = Array.from(clipboardData.items);
        const imageItem = items.find((item) => item.type.startsWith('image/'));
        if (imageItem) {
            const file = imageItem.getAsFile();
            if (file) {
                await this.addImageFromFile(file);
            }
        }
    }
    handleMouseDown(event) {
        // 图片插件不处理鼠标事件，由SelectionPlugin处理
    }
    handleMouseMove(event) {
        // 图片插件不处理鼠标事件，由SelectionPlugin处理
    }
    handleMouseUp() {
        // 图片插件不处理鼠标事件，由SelectionPlugin处理
    }
    render(ctx) {
        // 图片由EditorCore统一渲染
    }
    destroy() {
        this.editor = null;
    }
}

class StickerPlugin {
    constructor() {
        this.name = 'sticker';
        this.canvasScale = 1;
    }
    initialize(editor) {
        this.editor = editor;
    }
    setCanvasScale(scale) {
        this.canvasScale = scale;
    }
    addSticker(sticker) {
        const state = this.editor.getState();
        const newStickers = [...state.stickers, sticker];
        this.editor.setState({ stickers: newStickers });
    }
    handleMouseDown(event) {
        // 贴纸插件不再处理鼠标事件，由SelectionPlugin处理
    }
    handleMouseMove(event) {
        // 贴纸插件不再处理鼠标事件，由SelectionPlugin处理
    }
    handleMouseUp() {
        // 贴纸插件不再处理鼠标事件，由SelectionPlugin处理
    }
    render(ctx) {
        // 贴纸由EditorCore统一渲染，这里不需要重复渲染
    }
    updateStickers(stickers) {
        // 贴纸插件不需要维护选中状态
    }
    deleteSelected() {
        // 删除功能由SelectionPlugin处理
    }
    destroy() {
        this.editor = null;
    }
}

const COLOR_CONVERSION_FACTORS = {
    SRGB_TO_P3: { r: 1.1, g: 1.05, b: 1.15 },
    P3_TO_SRGB: { r: 1 / 1.1, g: 1 / 1.05, b: 1 / 1.15 },
};
class ColorSpaceManager {
    static async initialize() {
        this.supportedColorSpaces = await this.detectSupportedColorSpaces();
    }
    static async detectSupportedColorSpaces() {
        const supported = ['srgb'];
        if (typeof window !== 'undefined') {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            try {
                const ctx = canvas.getContext('2d', { colorSpace: 'display-p3' });
                if (ctx && ctx.getContextAttributes?.()?.colorSpace === 'display-p3') {
                    supported.push('display-p3');
                }
            }
            catch { }
            try {
                const ctx = canvas.getContext('2d', { colorSpace: 'rec2020' });
                if (ctx && ctx.getContextAttributes?.()?.colorSpace === 'rec2020') {
                    supported.push('rec2020');
                }
            }
            catch { }
        }
        return supported;
    }
    static isSupported(colorSpace) {
        return this.supportedColorSpaces.includes(colorSpace);
    }
    static getBestColorSpace(preferred = 'srgb') {
        if (this.isSupported(preferred))
            return preferred;
        if (this.isSupported('display-p3'))
            return 'display-p3';
        return 'srgb';
    }
    static createCanvas(width, height, colorSpace = 'srgb') {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
    static getContext(canvas, colorSpace = 'srgb') {
        const bestColorSpace = this.getBestColorSpace(colorSpace);
        return canvas.getContext('2d', {
            colorSpace: bestColorSpace,
            willReadFrequently: true,
        });
    }
    static convertColorSpace(imageData, from, to) {
        if (from === to)
            return imageData;
        // Simplified color space conversion
        const data = new Uint8ClampedArray(imageData.data);
        if (from === 'srgb' && to === 'display-p3') {
            const factors = COLOR_CONVERSION_FACTORS.SRGB_TO_P3;
            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.min(255, (data[i] ?? 0) * factors.r);
                data[i + 1] = Math.min(255, (data[i + 1] ?? 0) * factors.g);
                data[i + 2] = Math.min(255, (data[i + 2] ?? 0) * factors.b);
            }
        }
        else if (from === 'display-p3' && to === 'srgb') {
            const factors = COLOR_CONVERSION_FACTORS.P3_TO_SRGB;
            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.max(0, (data[i] ?? 0) * factors.r);
                data[i + 1] = Math.max(0, (data[i + 1] ?? 0) * factors.g);
                data[i + 2] = Math.max(0, (data[i + 2] ?? 0) * factors.b);
            }
        }
        return new ImageData(data, imageData.width, imageData.height);
    }
}
ColorSpaceManager.supportedColorSpaces = [];

const EXIF_CONSTANTS = {
    JPEG_MARKER: 0xFFD8,
    EXIF_MARKER: 0xFFE1,
    SOS_MARKER: 0xFFDA,
    EXIF_SIGNATURE: 0x45786966,
    LITTLE_ENDIAN: 0x4949,
    TIFF_MAGIC: 0x002A,
    ENTRY_SIZE: 12,
    TAGS: {
        ORIENTATION: 0x0112,
        MAKE: 0x010F,
        MODEL: 0x0110,
        DATETIME: 0x0132,
    },
};
class ExifProcessor {
    static async readExif(file) {
        const buffer = await file.arrayBuffer();
        const view = new DataView(buffer);
        if (view.getUint16(0) !== EXIF_CONSTANTS.JPEG_MARKER)
            return {};
        let offset = 2;
        while (offset < view.byteLength) {
            const marker = view.getUint16(offset);
            if (marker === EXIF_CONSTANTS.EXIF_MARKER) {
                const length = view.getUint16(offset + 2);
                const exifData = this.parseExifSegment(view, offset + 4, length - 2);
                if (exifData)
                    return exifData;
            }
            if (marker === EXIF_CONSTANTS.SOS_MARKER)
                break;
            offset += 2 + view.getUint16(offset + 2);
        }
        return {};
    }
    static parseExifSegment(view, offset, length) {
        if (view.getUint32(offset) !== EXIF_CONSTANTS.EXIF_SIGNATURE)
            return null;
        offset += 6;
        const byteOrder = view.getUint16(offset);
        const littleEndian = byteOrder === EXIF_CONSTANTS.LITTLE_ENDIAN;
        offset += 2;
        if (view.getUint16(offset, littleEndian) !== EXIF_CONSTANTS.TIFF_MAGIC)
            return null;
        offset += 2;
        const ifdOffset = view.getUint32(offset, littleEndian);
        return this.parseIFD(view, offset + ifdOffset, littleEndian);
    }
    static parseIFD(view, offset, littleEndian) {
        const exif = {};
        const entryCount = view.getUint16(offset, littleEndian);
        offset += 2;
        for (let i = 0; i < entryCount; i++) {
            const tag = view.getUint16(offset, littleEndian);
            view.getUint16(offset + 2, littleEndian);
            const count = view.getUint32(offset + 4, littleEndian);
            const valueOffset = view.getUint32(offset + 8, littleEndian);
            switch (tag) {
                case EXIF_CONSTANTS.TAGS.ORIENTATION:
                    exif.orientation = view.getUint16(offset + 8, littleEndian);
                    break;
                case EXIF_CONSTANTS.TAGS.MAKE:
                    exif.make = this.readString(view, valueOffset, count);
                    break;
                case EXIF_CONSTANTS.TAGS.MODEL:
                    exif.model = this.readString(view, valueOffset, count);
                    break;
                case EXIF_CONSTANTS.TAGS.DATETIME:
                    exif.dateTime = this.readString(view, valueOffset, count);
                    break;
            }
            offset += EXIF_CONSTANTS.ENTRY_SIZE;
        }
        return exif;
    }
    static readString(view, offset, length) {
        let str = '';
        for (let i = 0; i < length - 1; i++) {
            str += String.fromCharCode(view.getUint8(offset + i));
        }
        return str;
    }
    static getOrientationTransform(orientation = 1) {
        const transforms = {
            1: 'none',
            2: 'scaleX(-1)',
            3: 'rotate(180deg)',
            4: 'scaleY(-1)',
            5: 'rotate(90deg) scaleX(-1)',
            6: 'rotate(90deg)',
            7: 'rotate(-90deg) scaleX(-1)',
            8: 'rotate(-90deg)'
        };
        return transforms[orientation] || 'none';
    }
}

/**
 * 编辑器初始化 Hook
 *
 * 负责编辑器的完整初始化流程：
 * - 创建和配置所有插件
 * - 设置插件间的事件回调
 * - 加载初始图片
 * - 处理组件销毁时的清理工作
 */
const useEditorInitialization = ({ canvasRef, editorRef, cropPluginRef, filterPluginRef, annotatePluginRef, stickerPluginRef, finetunePluginRef, imagePluginRef, selectionPluginRef, advancedFilterPluginRef, src, zoomLevel, setEditorState, setHasSelection, onImageLoadStart, onImageLoadEnd, }) => {
    const handleImageLoad = useCallback(async (source, editor) => {
        try {
            if (source instanceof File) {
                const exifData = await ExifProcessor.readExif(source);
                console.log('EXIF data loaded for file:', source.name);
            }
            await editor.loadImage(source);
            onImageLoadEnd?.();
        }
        catch (error) {
            console.error('Failed to load image:', error);
            onImageLoadEnd?.();
        }
    }, [onImageLoadEnd]);
    useEffect(() => {
        const initializeEditor = async () => {
            if (canvasRef.current && !editorRef.current) {
                await ColorSpaceManager.initialize();
                const editor = new EditorCore(canvasRef.current);
                const cropPlugin = new CropPlugin();
                const filterPlugin = new FilterPlugin();
                const annotatePlugin = new AnnotatePlugin();
                const stickerPlugin = new StickerPlugin();
                const finetunePlugin = new FinetunePlugin();
                const imagePlugin = new ImagePlugin();
                const selectionPlugin = new HtmlSelectionPlugin();
                const advancedFilterPlugin = new AdvancedFilterPlugin();
                editor.addPlugin(cropPlugin);
                editor.addPlugin(filterPlugin);
                editor.addPlugin(annotatePlugin);
                editor.addPlugin(stickerPlugin);
                editor.addPlugin(finetunePlugin);
                editor.addPlugin(imagePlugin);
                editor.addPlugin(selectionPlugin);
                editor.addPlugin(advancedFilterPlugin);
                editor.on('stateChange', (newState) => {
                    setEditorState(newState);
                    if (newState.stickers) {
                        stickerPlugin.updateStickers(newState.stickers);
                    }
                    if (newState.annotations) {
                        annotatePlugin.updateAnnotations(newState.annotations);
                    }
                });
                editorRef.current = editor;
                cropPluginRef.current = cropPlugin;
                filterPluginRef.current = filterPlugin;
                annotatePluginRef.current = annotatePlugin;
                stickerPluginRef.current = stickerPlugin;
                finetunePluginRef.current = finetunePlugin;
                imagePluginRef.current = imagePlugin;
                selectionPluginRef.current = selectionPlugin;
                advancedFilterPluginRef.current = advancedFilterPlugin;
                // 设置插件回调
                annotatePlugin.setAnnotationCompleteCallback((annotation) => {
                    if (selectionPluginRef.current) {
                        selectionPluginRef.current.setCanvasScale?.(zoomLevel);
                        selectionPluginRef.current.setSelectMode(true);
                        const annotationWithZIndex = { ...annotation, zIndex: annotation.zIndex ?? Date.now() };
                        selectionPluginRef.current.selectItem(annotationWithZIndex);
                        setHasSelection(true);
                        editorRef.current?.render();
                    }
                });
                selectionPlugin.setSelectionChangeCallback((hasSelection) => {
                    setHasSelection(hasSelection);
                });
                imagePlugin.setImageCompleteCallback((image) => {
                    if (selectionPluginRef.current) {
                        selectionPluginRef.current.setCanvasScale?.(zoomLevel);
                        selectionPluginRef.current.setSelectMode(true);
                        selectionPluginRef.current.selectItem({ ...image, zIndex: image.zIndex || Date.now() });
                        setHasSelection(true);
                        editorRef.current?.render();
                    }
                });
                cropPlugin.setActive(true);
                if (src) {
                    await handleImageLoad(src, editor);
                }
            }
        };
        initializeEditor();
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
            }
            MemoryManager.cleanup();
        };
    }, []);
    useEffect(() => {
        if (src && editorRef.current) {
            handleImageLoad(src, editorRef.current);
        }
    }, [src]);
};

/**
 * Canvas 事件处理 Hook
 *
 * 封装所有 Canvas 相关的鼠标事件处理逻辑：
 * - 鼠标坐标转换（屏幕坐标 -> Canvas 坐标）
 * - 不同工具的鼠标交互逻辑
 * - 元素选中和拖拽处理
 * - 文本编辑模式切换
 */
const TEXT_DEFAULTS = {
    PLACEHOLDER: 'Double click to edit',
    FONT_SIZE: 24,
    COLOR: '#000000',
    FONT_WEIGHT: 'normal',
    FONT_STYLE: 'normal',
    TEXT_DECORATION: 'none',
    STROKE_WIDTH: 0,
};
const useCanvasEvents = ({ canvasRef, activeTool, currentAnnotation, currentSticker, editorRef, cropPluginRef, annotatePluginRef, stickerPluginRef, selectionPluginRef, setHasSelection, setEditingText, setEditingValue, setEditingTextItem, setActiveTool, }) => {
    const getCanvasCoordinates = useCallback((e) => {
        if (!canvasRef.current)
            return { canvasX: 0, canvasY: 0 };
        const { x, y } = mouseToCanvas(e, canvasRef.current);
        return { canvasX: x, canvasY: y };
    }, []);
    const handleCanvasMouseDown = useCallback((e) => {
        if (!canvasRef.current)
            return;
        const { canvasX, canvasY } = getCanvasCoordinates(e);
        const event = {
            ...e.nativeEvent,
            clientX: e.clientX,
            clientY: e.clientY,
            canvasX,
            canvasY,
        };
        let handledBySelection = false;
        if ((activeTool === 'annotate' || activeTool === 'sticker') && selectionPluginRef.current) {
            const state = editorRef.current?.getState();
            const allItems = [...(state?.stickers || []), ...(state?.annotations || []), ...(state?.images || [])];
            for (let i = allItems.length - 1; i >= 0; i--) {
                if (selectionPluginRef.current.isPointInItem &&
                    selectionPluginRef.current.isPointInItem(canvasX, canvasY, allItems[i])) {
                    selectionPluginRef.current.handleMouseDown(event);
                    handledBySelection = true;
                    break;
                }
            }
        }
        if (!handledBySelection) {
            switch (activeTool) {
                case 'select':
                    selectionPluginRef.current?.handleMouseDown(event);
                    break;
                case 'crop':
                    cropPluginRef.current?.handleMouseDown(event);
                    break;
                case 'annotate':
                    if (currentAnnotation?.type === 'text') {
                        const tempCanvas = document.createElement('canvas');
                        const tempCtx = tempCanvas.getContext('2d');
                        tempCtx.font = `${currentAnnotation.fontSize || TEXT_DEFAULTS.FONT_SIZE}px Arial`;
                        const textMetrics = tempCtx.measureText(TEXT_DEFAULTS.PLACEHOLDER);
                        const newText = {
                            id: generateId(),
                            type: 'text',
                            x: canvasX,
                            y: canvasY,
                            width: textMetrics.width,
                            height: currentAnnotation.fontSize || TEXT_DEFAULTS.FONT_SIZE,
                            text: TEXT_DEFAULTS.PLACEHOLDER,
                            color: currentAnnotation.color || TEXT_DEFAULTS.COLOR,
                            strokeWidth: TEXT_DEFAULTS.STROKE_WIDTH,
                            fontSize: currentAnnotation.fontSize || TEXT_DEFAULTS.FONT_SIZE,
                            fontWeight: TEXT_DEFAULTS.FONT_WEIGHT,
                            fontStyle: TEXT_DEFAULTS.FONT_STYLE,
                            textDecoration: TEXT_DEFAULTS.TEXT_DECORATION,
                            zIndex: Date.now(),
                        };
                        const state = editorRef.current?.getState();
                        const annotations = [...(state?.annotations || []), newText];
                        editorRef.current?.setState({ annotations });
                        if (selectionPluginRef.current) {
                            selectionPluginRef.current.setSelectMode(true);
                            selectionPluginRef.current.selectItem(newText);
                            setHasSelection(true);
                            editorRef.current?.render();
                        }
                    }
                    else {
                        annotatePluginRef.current?.handleMouseDown(event, currentAnnotation?.type || 'rectangle', currentAnnotation || {});
                    }
                    break;
                case 'sticker':
                    if (currentSticker && stickerPluginRef.current) {
                        // 在点击位置添加选中的贴纸
                        const newSticker = {
                            id: generateId(),
                            sticker: 1,
                            type: currentSticker.type,
                            content: currentSticker.content,
                            x: canvasX,
                            y: canvasY,
                            size: 48, // 默认尺寸
                            rotation: 0,
                            zIndex: Date.now(),
                        };
                        if (currentSticker.type === 'image') {
                            const img = new Image();
                            img.crossOrigin = 'anonymous';
                            img.onload = () => {
                                newSticker.image = img;
                                stickerPluginRef.current.addSticker(newSticker);
                                if (selectionPluginRef.current) {
                                    selectionPluginRef.current.setSelectMode(true);
                                    selectionPluginRef.current.selectItem(newSticker);
                                    setHasSelection(true);
                                    editorRef.current?.render();
                                }
                            };
                            img.onerror = (error) => {
                                console.error('Failed to load image:', error, currentSticker.content);
                            };
                            img.src = currentSticker.content;
                        }
                        else {
                            stickerPluginRef.current.addSticker(newSticker);
                            if (selectionPluginRef.current) {
                                selectionPluginRef.current.setSelectMode(true);
                                selectionPluginRef.current.selectItem(newSticker);
                                setHasSelection(true);
                                editorRef.current?.render();
                            }
                        }
                    }
                    break;
            }
        }
    }, [activeTool, currentAnnotation, currentSticker, getCanvasCoordinates, stickerPluginRef, selectionPluginRef, setHasSelection, editorRef]);
    const handleCanvasMouseMove = useCallback((e) => {
        if (!canvasRef.current)
            return;
        const { canvasX, canvasY } = getCanvasCoordinates(e);
        const event = {
            ...e.nativeEvent,
            clientX: e.clientX,
            clientY: e.clientY,
            canvasX,
            canvasY,
        };
        if ((activeTool === 'annotate' || activeTool === 'sticker') &&
            selectionPluginRef.current &&
            selectionPluginRef.current.isDragging) {
            selectionPluginRef.current.handleMouseMove(event);
        }
        else {
            switch (activeTool) {
                case 'select':
                    selectionPluginRef.current?.handleMouseMove(event);
                    break;
                case 'crop':
                    cropPluginRef.current?.handleMouseMove(event);
                    break;
                case 'annotate':
                    annotatePluginRef.current?.handleMouseMove(event);
                    break;
                case 'sticker':
                    stickerPluginRef.current?.handleMouseMove(event);
                    break;
            }
        }
    }, [activeTool, getCanvasCoordinates]);
    const handleCanvasMouseUp = useCallback(() => {
        selectionPluginRef.current?.handleMouseUp();
        switch (activeTool) {
            case 'crop':
                cropPluginRef.current?.handleMouseUp();
                break;
            case 'annotate':
                annotatePluginRef.current?.handleMouseUp();
                break;
            case 'sticker':
                stickerPluginRef.current?.handleMouseUp();
                break;
        }
    }, [activeTool]);
    const handleCanvasDoubleClick = useCallback((e) => {
        if (!canvasRef.current || !selectionPluginRef.current)
            return;
        const { canvasX, canvasY } = getCanvasCoordinates(e);
        const event = {
            ...e.nativeEvent,
            clientX: e.clientX,
            clientY: e.clientY,
            canvasX,
            canvasY,
        };
        selectionPluginRef.current.handleMouseDown(event);
        const selectedItem = selectionPluginRef.current.selectedItem;
        if (selectedItem) {
            if (selectedItem.type === 'text') {
                setActiveTool('select');
                setEditingText({
                    id: selectedItem.id,
                    x: selectedItem.x,
                    y: selectedItem.y,
                    rotation: selectedItem.rotation || 0,
                });
                setEditingValue(selectedItem.text || '');
                const state = editorRef.current?.getState();
                const annotations = state?.annotations?.filter((ann) => ann.id !== selectedItem.id) || [];
                editorRef.current?.setState({ annotations });
                selectionPluginRef.current?.clearSelection();
                setEditingTextItem(selectedItem);
                setHasSelection(true);
                editorRef.current?.render();
            }
            else {
                setActiveTool('select');
                setHasSelection(true);
                editorRef.current?.render();
            }
        }
    }, [getCanvasCoordinates, setActiveTool, setEditingText, setEditingValue, setEditingTextItem, setHasSelection]);
    return {
        handleCanvasMouseDown,
        handleCanvasMouseMove,
        handleCanvasMouseUp,
        handleCanvasDoubleClick,
    };
};

/**
 * 键盘快捷键 Hook
 *
 * 处理所有键盘快捷键操作：
 * - Ctrl+Z / Cmd+Z: 撤销
 * - Ctrl+Y / Cmd+Shift+Z: 重做
 * - Delete / Backspace: 删除选中元素
 * - Ctrl+V / Cmd+V: 粘贴图片
 */
const useKeyboardShortcuts = ({ onUndo, onRedo, selectionPluginRef, imagePluginRef, setHasSelection, }) => {
    const handlePaste = useCallback((event) => {
        const items = event.clipboardData?.items;
        if (!items)
            return;
        for (const item of Array.from(items)) {
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile();
                if (file && imagePluginRef.current) {
                    imagePluginRef.current.addImageFromFile(file);
                }
                break;
            }
        }
    }, [imagePluginRef]);
    useEffect(() => {
        const handleKeyDown = (event) => {
            // 检查当前焦点是否在输入元素上
            const activeElement = document.activeElement;
            const isInputElement = activeElement && (activeElement.tagName === 'INPUT' ||
                activeElement.tagName === 'TEXTAREA' ||
                activeElement.contentEditable === 'true');
            if (event.ctrlKey || event.metaKey) {
                if (event.key === 'z' && !event.shiftKey) {
                    event.preventDefault();
                    onUndo();
                }
                else if ((event.key === 'z' && event.shiftKey) || event.key === 'y') {
                    event.preventDefault();
                    onRedo();
                }
                else if (event.key === 'v') {
                    event.preventDefault();
                    navigator.clipboard
                        .read()
                        .then((items) => {
                        for (const item of items) {
                            for (const type of item.types) {
                                if (type.startsWith('image/')) {
                                    item.getType(type).then((blob) => {
                                        const file = new File([blob], 'pasted-image.png', { type });
                                        if (imagePluginRef.current) {
                                            imagePluginRef.current.addImageFromFile(file);
                                        }
                                    });
                                    return;
                                }
                            }
                        }
                    })
                        .catch(() => {
                        handlePaste(event);
                    });
                }
            }
            else if ((event.key === 'Delete' || event.key === 'Backspace') && !isInputElement) {
                event.preventDefault();
                if (selectionPluginRef.current) {
                    selectionPluginRef.current.deleteSelected();
                    setHasSelection(false);
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onUndo, onRedo, handlePaste, selectionPluginRef, imagePluginRef, setHasSelection]);
};

/**
 * 坐标缩放工具函数
 *
 * 当工具切换导致图片显示区域变化时，
 * 需要相应地缩放所有元素的坐标以保持相对位置不变。
 */
const scaleCoordinates = (prevDisplay, newDisplay, items) => {
    if (prevDisplay.width === newDisplay.width &&
        prevDisplay.height === newDisplay.height &&
        prevDisplay.x === newDisplay.x &&
        prevDisplay.y === newDisplay.y) {
        return items;
    }
    const scaleX = newDisplay.width / prevDisplay.width;
    const scaleY = newDisplay.height / prevDisplay.height;
    const offsetX = newDisplay.x - prevDisplay.x * scaleX;
    const offsetY = newDisplay.y - prevDisplay.y * scaleY;
    return items.map((item) => ({
        ...item,
        x: item.x * scaleX + offsetX,
        y: item.y * scaleY + offsetY,
        width: item.width ? item.width * scaleX : item.width,
        height: item.height ? item.height * scaleY : item.height,
        size: item.size ? item.size * Math.min(scaleX, scaleY) : item.size,
        fontSize: item.fontSize ? item.fontSize * Math.min(scaleX, scaleY) : item.fontSize,
    }));
};
const scaleEditingText = (prevDisplay, newDisplay, editingText) => {
    if (!editingText)
        return null;
    const scaleX = newDisplay.width / prevDisplay.width;
    const scaleY = newDisplay.height / prevDisplay.height;
    const offsetX = newDisplay.x - prevDisplay.x * scaleX;
    const offsetY = newDisplay.y - prevDisplay.y * scaleY;
    return {
        ...editingText,
        x: editingText.x * scaleX + offsetX,
        y: editingText.y * scaleY + offsetY,
    };
};

/**
 * 工具切换处理 Hook
 *
 * 处理工具切换时的所有逻辑：
 * - 插件状态更新
 * - 坐标缩放处理
 * - 编辑状态同步
 */
const TOOL_SWITCH_DELAY = 10;
const useToolSwitching = ({ activeTool, editingText, editingTextItem, editorRef, cropPluginRef, selectionPluginRef, updateTextEditing, }) => {
    useEffect(() => {
        if (!editorRef.current)
            return;
        const prevImageDisplay = editorRef.current.getImageDisplay();
        // 更新插件激活状态
        if (cropPluginRef.current) {
            cropPluginRef.current.setActive(activeTool === 'crop');
        }
        if (selectionPluginRef.current) {
            selectionPluginRef.current.setSelectMode(activeTool === 'select');
        }
        // 延迟处理坐标缩放
        setTimeout(() => {
            if (editorRef.current) {
                const newImageDisplay = editorRef.current.getImageDisplay();
                const state = editorRef.current.getState();
                // 缩放所有元素坐标
                const scaledAnnotations = scaleCoordinates(prevImageDisplay, newImageDisplay, state.annotations || []);
                const scaledStickers = scaleCoordinates(prevImageDisplay, newImageDisplay, state.stickers || []);
                const scaledImages = scaleCoordinates(prevImageDisplay, newImageDisplay, state.images || []);
                editorRef.current.setState({
                    annotations: scaledAnnotations,
                    stickers: scaledStickers,
                    images: scaledImages,
                }, false);
                // 缩放编辑状态
                const scaledEditingText = scaleEditingText(prevImageDisplay, newImageDisplay, editingText);
                if (scaledEditingText) {
                    updateTextEditing({ editingText: scaledEditingText });
                }
                if (editingTextItem) {
                    const scaledEditingTextItem = scaleCoordinates(prevImageDisplay, newImageDisplay, [editingTextItem])[0];
                    if (scaledEditingTextItem) {
                        updateTextEditing({ editingTextItem: scaledEditingTextItem });
                    }
                }
                // 缩放选中元素
                if (selectionPluginRef.current && selectionPluginRef.current.selectedItem) {
                    const selectedItem = selectionPluginRef.current.selectedItem;
                    const scaledItem = scaleCoordinates(prevImageDisplay, newImageDisplay, [selectedItem])[0];
                    selectionPluginRef.current.selectedItem = scaledItem;
                }
                editorRef.current.render();
            }
        }, TOOL_SWITCH_DELAY);
    }, [activeTool]);
};

/**
 * 编辑器配置处理 Hook
 *
 * 处理所有配置相关的数据转换和处理
 */
const useEditorConfig = ({ utils, filterOptions, cropSelectPresetOptions, }) => {
    const tools = useMemo(() => utils.map((util) => ({ id: util, ...TOOL_MAP[util] })).filter(Boolean), [utils]);
    const filters = useMemo(() => [{ id: 'none', name: 'Original' }, ...filterOptions.map(([id, name]) => ({ id, name }))], [filterOptions]);
    const cropPresets = useMemo(() => cropSelectPresetOptions.map(([ratio, name]) => ({ ratio, name })), [cropSelectPresetOptions]);
    return { tools, filters, cropPresets };
};

const LoadingIndicator = () => {
    const { t } = useTranslation();
    return (jsxs("div", { className: "dk-image-editor__loading", children: [jsx("div", { className: "dk-image-editor__loading-spinner" }), jsx("div", { className: "dk-image-editor__loading-text", children: t('loading.image') })] }));
};

/**
 * 图片编辑器主组件
 *
 * 架构特点：
 * - 插件化设计：支持裁剪、滤镜、标注、贴纸等功能
 * - 状态管理：使用自定义 Hook 统一管理 UI 状态和文本编辑状态
 * - 事件处理：提取 Canvas 事件和键盘快捷键到专门的 Hook
 * - 坐标缩放：工具切换时自动处理元素坐标缩放
 */
// 内部组件，使用 Context
const DkImageEditorInternal = ({ src, onSave, onClose, onConfirm, className = '', utils = ['select', 'crop', 'filter', 'annotate', 'sticker', 'finetune', 'frame'], cropSelectPresetOptions = DEFAULT_CROP_PRESETS, annotateTools = DEFAULT_ANNOTATE_TOOLS, stickerEnableSelectImagePreset = true, filterOptions = DEFAULT_FILTER_OPTIONS, finetuneOptions = DEFAULT_FINETUNE_OPTIONS, showCloseButton = true, showDownloadButton = true, }) => {
    // 使用 Context 状态和 refs
    const editorState = useEditorState();
    const uiState = useUIState();
    const textEditing = useTextEditing();
    const isImageLoading = useImageLoading();
    const { setEditorState, updateUIState, updateTextEditing, setImageLoading } = useEditorActions();
    const { canvasRef } = useEditorRefs();
    // 解构状态变量
    const { activeTool, isVisible, hasSelection, selectedFinetuneOption, lastAnnotateColor, zoomLevel, currentAnnotation, currentSticker } = uiState;
    const { editingText, editingValue, editingTextItem } = textEditing;
    // 编辑器插件管理
    const { editorRef, cropPluginRef, filterPluginRef, annotatePluginRef, stickerPluginRef, finetunePluginRef, imagePluginRef, selectionPluginRef, advancedFilterPluginRef, applyAdvancedFilter, } = useEditorPlugins();
    // 配置数据处理
    const { tools, filters, cropPresets } = useEditorConfig({
        utils,
        filterOptions,
        cropSelectPresetOptions,
    });
    // 检查是否为 HTTP URL
    const isHttpUrl = typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'));
    // 处理图片加载状态
    useEffect(() => {
        if (isHttpUrl) {
            setImageLoading(true);
        }
    }, [src, isHttpUrl, setImageLoading]);
    // 编辑器初始化：插件创建、事件绑定、图片加载
    useEditorInitialization({
        canvasRef,
        editorRef,
        cropPluginRef,
        filterPluginRef,
        annotatePluginRef,
        stickerPluginRef,
        finetunePluginRef,
        imagePluginRef,
        selectionPluginRef,
        advancedFilterPluginRef,
        src,
        zoomLevel,
        setEditorState,
        setHasSelection: (hasSelection) => updateUIState({ hasSelection }),
        onImageLoadStart: () => isHttpUrl && setImageLoading(true),
        onImageLoadEnd: () => setImageLoading(false),
    });
    // 工具切换处理
    useToolSwitching({
        activeTool,
        editingText,
        editingTextItem,
        editorRef,
        cropPluginRef,
        selectionPluginRef,
        updateTextEditing,
    });
    // Canvas 事件处理：鼠标交互、工具切换、元素创建等
    const { handleCanvasMouseDown, handleCanvasMouseMove, handleCanvasMouseUp, handleCanvasDoubleClick } = useCanvasEvents({
        canvasRef,
        activeTool,
        currentAnnotation,
        currentSticker,
        editorRef,
        cropPluginRef,
        annotatePluginRef,
        stickerPluginRef,
        selectionPluginRef,
        setHasSelection: (hasSelection) => updateUIState({ hasSelection }),
        setEditingText: (text) => updateTextEditing({ editingText: text }),
        setEditingValue: (value) => updateTextEditing({ editingValue: value }),
        setEditingTextItem: (item) => updateTextEditing({ editingTextItem: item }),
        setActiveTool: (tool) => updateUIState({ activeTool: tool }),
    });
    // 撤销/重做操作
    const handleUndo = useCallback(() => editorRef.current?.undo(), []);
    const handleRedo = useCallback(() => editorRef.current?.redo(), []);
    // 键盘快捷键：撤销、重做、删除、粘贴图片等
    useKeyboardShortcuts({
        onUndo: handleUndo,
        onRedo: handleRedo,
        selectionPluginRef,
        imagePluginRef,
        setHasSelection: (hasSelection) => updateUIState({ hasSelection }),
    });
    // 上传图片处理：完全重置编辑器状态并加载新图片
    const handleUpload = useCallback((file) => {
        if (!editorRef.current)
            return;
        // 清除选中状态
        selectionPluginRef.current?.clearSelection();
        // 重置编辑器核心状态到初始状态
        const initialState = {
            crop: { width: 1000, height: 1000, x: 0, y: 0 },
            rotation: 0,
            flipX: false,
            flipY: false,
            scale: 1,
            skewX: 0,
            skewY: 0,
            brightness: 0,
            contrast: 0,
            saturation: 0,
            exposure: 0,
            gamma: 0,
            vignette: 0,
            filter: 'none',
            appliedFilters: [],
            annotations: [],
            stickers: [],
            images: [],
            backgroundColor: 'transparent',
            frame: 'none',
            filterCounts: {},
        };
        // 使用EditorCore的setState方法重置，不保存到历史记录
        editorRef.current.setState(initialState, false);
        setEditorState(initialState);
        // 重置UI状态
        updateUIState({
            activeTool: 'crop',
            hasSelection: false,
            selectedFinetuneOption: 'brightness',
            lastAnnotateColor: '#ff0000',
            zoomLevel: 1,
            currentAnnotation: null,
            currentSticker: null,
        });
        // 重置文本编辑状态
        updateTextEditing({
            editingText: null,
            editingValue: '',
            editingTextItem: null,
        });
        // 重置插件状态
        cropPluginRef.current?.setActive?.(false);
        // 加载新图片
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result && editorRef.current) {
                editorRef.current.loadImage(e.target.result);
            }
        };
        reader.readAsDataURL(file);
    }, [
        setEditorState,
        updateUIState,
        updateTextEditing,
        selectionPluginRef,
        cropPluginRef,
        filterPluginRef,
        annotatePluginRef,
        stickerPluginRef,
        finetunePluginRef,
        advancedFilterPluginRef,
    ]);
    // 保存处理：导出图片并回调
    const handleSave = useCallback(async () => {
        if (!editorRef.current || !onSave || !editorState)
            return;
        try {
            const blob = (await editorRef.current.export('blob'));
            const file = new File([blob], 'edited-image.png', { type: 'image/png' });
            const url = URL.createObjectURL(blob);
            onSave({ src: url, dest: file, imageState: editorState });
        }
        catch (error) {
            console.error('Export failed:', error);
        }
    }, [onSave, editorState]);
    // 确认处理：导出图片数据和Canvas数据并回调
    const handleConfirm = useCallback(async () => {
        if (!editorRef.current || !onConfirm || !canvasRef.current || !editorState)
            return;
        try {
            const blob = (await editorRef.current.export('blob'));
            const file = new File([blob], 'edited-image.png', { type: 'image/png' });
            const url = URL.createObjectURL(blob);
            onConfirm({ src: url, dest: file, imageState: editorState, canvas: canvasRef.current });
        }
        catch (error) {
            console.error('Confirm export failed:', error);
        }
    }, [onConfirm, editorState]);
    // 编辑器状态更新
    const handleStateChange = useCallback((updates) => {
        if (editorRef.current) {
            editorRef.current.setState(updates);
        }
    }, []);
    // 关闭处理：带动画效果
    const handleClose = useCallback(() => {
        updateUIState({ isVisible: false });
        setTimeout(() => onClose?.(), UI_CONSTANTS.ANIMATION_DURATION);
    }, [onClose, updateUIState]);
    // 不可见时不渲染
    if (!isVisible)
        return null;
    return (jsxs("div", { className: `dk-image-editor ${className}`, children: [jsx(EditorHeader, { onClose: handleClose, onConfirm: handleConfirm, onUndo: handleUndo, onRedo: handleRedo, onSave: handleSave, onUpload: handleUpload, showCloseButton: showCloseButton, showDownloadButton: showDownloadButton }), jsxs("div", { className: "dk-image-editor__main", children: [jsx(ToolSidebar, { tools: tools }), isImageLoading && (jsx(LoadingIndicator, {})), jsx(EditorCanvas, { onMouseDown: handleCanvasMouseDown, onMouseMove: handleCanvasMouseMove, onMouseUp: handleCanvasMouseUp, onDoubleClick: handleCanvasDoubleClick })] }), jsx(ControlPanels, { cropPresets: cropPresets, filters: filters, annotateTools: annotateTools, finetuneOptions: finetuneOptions, onStateChange: handleStateChange, applyAdvancedFilter: applyAdvancedFilter })] }));
};
// 主组件，使用 Provider 包装
const DkImageEditor = (props) => {
    return (jsx(I18nProvider, { language: props.language || 'en', translations: props.translations, children: jsx(EditorProvider, { children: jsx(DkImageEditorInternal, { ...props }) }) }));
};

class ImageProcessor {
    static async loadImageFromFile(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    }
    static async getImageData(source) {
        const canvas = document.createElement('canvas');
        canvas.width = source.width || source.naturalWidth;
        canvas.height = source.height || source.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(source, 0, 0);
        return ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
    static createCanvasFromImageData(imageData) {
        const canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        const ctx = canvas.getContext('2d');
        ctx.putImageData(imageData, 0, 0);
        return canvas;
    }
    static async canvasToBlob(canvas, type = 'image/png', quality = 0.9) {
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (blob)
                    resolve(blob);
                else
                    reject(new Error('Failed to create blob'));
            }, type, quality);
        });
    }
}

export { AdvancedFilterPlugin, AnnotatePlugin, ColorSpaceManager, CropPlugin, DkImageEditor, EditorCore, ExifProcessor, FilterPlugin, FinetunePlugin, I18nProvider, ImageProcessor, MemoryManager, StickerPlugin, defaultTranslations, useTranslation };
//# sourceMappingURL=index.esm.js.map
