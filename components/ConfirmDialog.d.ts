import React from 'react';
interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
}
declare const ConfirmDialog: React.FC<ConfirmDialogProps>;
export default ConfirmDialog;
//# sourceMappingURL=ConfirmDialog.d.ts.map