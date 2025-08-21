// MARK: - 메인 레이아웃

import { Outlet, useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { useAuthStore } from "~/stores/authStore";
import { LogoutModal } from "~/components/modals";

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuthStore();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const menuItems = [
        { path: '/home', label: 'Home', icon: '/ic_home.png', activeIcon: '/ic_home_white.png' },
        { path: '/register', label: 'Register', icon: '/ic_box.png', activeIcon: '/ic_box_white.png' },
        { path: '/history', label: 'History', icon: '/ic_up_arrow.png', activeIcon: '/ic_up_arrow_white.png' },
        { path: '/notifications', label: 'Notification', icon: '/ic_notification.png', activeIcon: '/ic_notification_white.png' },
    ];

    const isActive = (path: string) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#EFF6FC]">
            {/* 사이드바 */}
            <aside className="w-[240px] bg-white shadow-lg flex flex-col">
                {/* 로고 */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#4A9FFF] flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            <h1 className="font-bold text-lg">UCSI</h1>
                            <p className="text-sm text-gray-600">Management</p>
                        </div>
                    </div>
                </div>

                {/* 네비게이션 메뉴 */}
                <nav className="flex-1 py-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full px-6 py-3 flex items-center gap-3 transition-all ${
                                isActive(item.path) 
                                    ? 'bg-[#2C2C31] text-white' 
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <img 
                                src={isActive(item.path) ? item.activeIcon : item.icon} 
                                alt={item.label}
                                className="w-5 h-5"
                            />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}

                    {/* 로그아웃 버튼 */}
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full px-6 py-3 flex items-center gap-3 text-gray-700 hover:bg-gray-100 transition-all"
                    >
                        <img src="/ic_logout.png" alt="Logout" className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </nav>

                {/* 사용자 정보 */}
                <div className="p-6 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                        <img src="/ic_profile.png" alt="Profile" className="w-10 h-10" />
                        <div>
                            <p className="font-medium text-sm">{user?.name || 'Minter'}</p>
                            <p className="text-xs text-gray-500">Welcome, {user?.name || 'Minter'} !</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* 메인 콘텐츠 */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>

            {/* 로그아웃 모달 */}
            {showLogoutModal && (
                <LogoutModal
                    onConfirm={handleLogout}
                    onCancel={() => setShowLogoutModal(false)}
                />
            )}
        </div>
    );
}