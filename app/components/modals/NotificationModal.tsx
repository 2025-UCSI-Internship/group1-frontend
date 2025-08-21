// MARK: - 알림 모달

import { Modal } from './Modal';
import { Button } from '~/components/ui/Button';
import { useUIStore } from '~/stores/uiStore';
import { colors } from '~/constants';

export function NotificationModal() {
    const { modals, closeModal, notificationContent, clearNotification } = useUIStore();

    const handleClose = () => {
        closeModal('notification');
        clearNotification();
    };

    const handleConfirm = () => {
        if (notificationContent?.confirmAction) {
            notificationContent.confirmAction();
        }
        handleClose();
    };

    if (!notificationContent) return null;

    const getIcon = () => {
        switch (notificationContent.type) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            case 'confirm':
                return '❓';
            default:
                return 'ℹ️';
        }
    };

    return (
        <Modal
            isOpen={modals.notification}
            onClose={handleClose}
            width="max-w-sm"
        >
            <div className="text-center">
                {/* 아이콘 */}
                <div className="mb-4 text-4xl">{getIcon()}</div>

                {/* 타이틀 */}
                {notificationContent.title && (
                    <h2 className="text-xl font-bold mb-4" style={{ color: colors.text.BLACK }}>
                        {notificationContent.title}
                    </h2>
                )}

                {/* 메시지 */}
                <p className="mb-6" style={{ color: colors.text.BLACK }}>
                    {notificationContent.message}
                </p>

                {/* 버튼 */}
                {notificationContent.type === 'confirm' ? (
                    <div className="flex justify-center gap-4">
                        <Button variant="default" onClick={handleConfirm}>
                            OK
                        </Button>
                        <Button variant="delete" onClick={handleClose}>
                            NO
                        </Button>
                    </div>
                ) : (
                    <Button variant="default" onClick={handleClose}>
                        OK
                    </Button>
                )}
            </div>
        </Modal>
    );
}
