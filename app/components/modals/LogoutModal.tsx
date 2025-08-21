// MARK: - 로그아웃 확인 모달

import { useNavigate } from 'react-router';
import { Modal } from './Modal';
import { Button } from '~/components/ui/Button';
import { useUIStore } from '~/stores/uiStore';
import { useAuthStore } from '~/stores/authStore';
import { colors } from '~/constants';

export function LogoutModal() {
    const navigate = useNavigate();
    const { modals, closeModal } = useUIStore();
    const { logout } = useAuthStore();

    const handleLogout = async () => {
        await logout();
        closeModal('logoutConfirm');
        navigate('/login');
    };

    return (
        <Modal
            isOpen={modals.logoutConfirm}
            onClose={() => closeModal('logoutConfirm')}
            width="max-w-sm"
        >
            <div className="text-center">
                {/* 아이콘 */}
                <div className="mb-4 text-4xl">⚠️</div>
                
                {/* 타이틀 */}
                <h2 className="text-xl font-bold mb-4" style={{ color: colors.text.BLACK }}>
                    Logout
                </h2>
                
                {/* 메시지 */}
                <p className="mb-6" style={{ color: colors.text.DESCRIPTION }}>
                    Are you sure you want to log out?
                </p>
                
                {/* 버튼 */}
                <div className="flex justify-center gap-4">
                    <Button 
                        variant="default" 
                        onClick={() => closeModal('logoutConfirm')}
                        style={{ backgroundColor: colors.button.USING }}
                    >
                        CANCEL
                    </Button>
                    <Button 
                        variant="delete" 
                        onClick={handleLogout}
                    >
                        LOGOUT
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
