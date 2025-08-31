// MARK: - 알림 이력 페이지

import { useState, useEffect } from "react";
import { useNotificationStore } from "~/stores/notificationStore";

export default function NotificationsPage() {
    const { notifications, loading, fetchNotifications } = useNotificationStore();
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchNotifications();
    }, []);

    // 날짜별로 그룹화
    const groupedNotifications = notifications.reduce((acc, notif) => {
        const date = new Date(notif.createdAt).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(notif);
        return acc;
    }, {} as Record<string, typeof notifications>);

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'OVERDUE':
                return '#DA1616';
            case 'WARRANTY':
                return '#FFA500';
            case 'RETURN':
                return '#4A9FFF';
            default:
                return '#677078';
        }
    };

    return (
        <div className="h-full bg-[#EFF6FC] p-8">
            {/* 헤더 */}
            <div className="bg-white rounded-2xl p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification History</h1>
                <p className="text-gray-600 mb-6">You can check the notification history</p>

                {/* 필터 버튼 */}
                <button className="px-6 py-2 bg-[#4A9FFF] text-white rounded-lg hover:bg-[#3A8FEF] transition-colors">
                    Filter
                </button>
            </div>

            {/* 알림 목록 */}
            <div className="space-y-8">
                {Object.entries(groupedNotifications).map(([date, notifs]) => (
                    <div key={date} className="bg-white rounded-2xl p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            {date.replace(/\//g, '.')}
                        </h2>

                        {/* 날짜별 알림 리스트 */}
                        <div className="relative">
                            {/* 왼쪽 파란색 라인 */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4A9FFF]"></div>
                            
                            <div className="pl-8 space-y-6">
                                {notifs.map((notif) => (
                                    <div key={notif.id}>
                                        <h3 className="font-semibold text-lg mb-1">
                                            {notif.type === 'OVERDUE' && `Overdue Return Alert (Serial No. : ${notif.assetSerialNumber})`}
                                            {notif.type === 'WARRANTY' && `Upcoming Warranty Expiry Alert(Serial No. : ${notif.assetSerialNumber})`}
                                            {notif.type === 'RETURN' && `Return Due Today(Serial No. : ${notif.assetSerialNumber})`}
                                        </h3>
                                        <p className="text-gray-600">
                                            {notif.message}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {notifications.length === 0 && (
                    <div className="bg-white rounded-2xl p-8">
                        <div className="text-center py-12 text-gray-500">
                            No notifications yet
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}