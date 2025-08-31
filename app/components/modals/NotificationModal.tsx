// MARK: - 알림 모달

import { Modal } from "./Modal";

interface NotificationModalProps {
    type?: 'success' | 'error' | 'warning' | 'info' | 'confirm';
    title?: string;
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose: () => void;
}

export function NotificationModal({
    type = 'info',
    title = 'Notification',
    message,
    onConfirm,
    onCancel,
    onClose
}: NotificationModalProps) {

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        onClose();
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        onClose();
    };

    return (
        <Modal onClose={onClose}>
            <div className="p-8 text-center" style={{ width: '450px' }}>
                {/* 아이콘 */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#FFF3E0] flex items-center justify-center">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                                fill="#FFA500" />
                        </svg>
                    </div>
                </div>

                {/* 타이틀 */}
                <h2 className="text-2xl font-bold mb-3">{title}</h2>

                {/* 메시지 */}
                <p className="text-gray-600 mb-6">{message}</p>

                {/* 버튼 */}
                {type === 'confirm' ? (
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleConfirm}
                            className="px-8 py-3 bg-[#4A9FFF] text-white rounded-lg hover:bg-[#3A8FEF] transition-colors font-medium"
                        >
                            OK
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-8 py-3 bg-[#DA1616] text-white rounded-lg hover:bg-[#CA0606] transition-colors font-medium"
                        >
                            NO
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleConfirm}
                        className="px-8 py-3 bg-[#4A9FFF] text-white rounded-lg hover:bg-[#3A8FEF] transition-colors font-medium"
                    >
                        OK
                    </button>
                )}
            </div>
        </Modal>
    );
}