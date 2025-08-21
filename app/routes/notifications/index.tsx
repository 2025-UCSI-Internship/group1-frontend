// MARK: - Notifications 페이지

import { useEffect, useState } from "react";
import { useNotificationStore } from "~/stores/notificationStore";
import { colors } from "~/constants";
import { Button } from "~/components/ui/Button";

export default function NotificationsPage() {
    const {
        notificationLogs,
        fetchNotificationLogs,
        lateReturnNotifications,
        warrantyNotifications,
        fetchLateReturnNotifications,
        fetchWarrantyNotifications,
        isLoading
    } = useNotificationStore();

    const [activeTab, setActiveTab] = useState<'all' | 'late' | 'warranty'>('all');

    useEffect(() => {
        fetchNotificationLogs();
        fetchLateReturnNotifications();
        fetchWarrantyNotifications();
    }, []);

    return (
        <div className="min-h-screen" style={{ backgroundColor: colors.bg.MAIN }}>
            {/* 헤더 */}
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-2" style={{ color: colors.text.BLACK }}>
                    Notification History
                </h1>
                <p style={{ color: colors.text.DESCRIPTION }}>
                    You can check the notification history.
                </p>
            </div>

            {/* 필터 탭 */}
            <div className="px-6 mb-6">
                <div className="flex gap-2">
                    <Button
                        variant={activeTab === 'all' ? 'filter' : 'default'}
                        size="sm"
                        onClick={() => setActiveTab('all')}
                    >
                        🔽 Filter
                    </Button>
                </div>
            </div>

            {/* 알림 목록 */}
            <div className="px-6 pb-6">
                {isLoading ? (
                    <div className="text-center py-8" style={{ color: colors.text.DESCRIPTION }}>
                        Loading notifications...
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* 날짜별 그룹 */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text.BLACK }}>
                                2020.08.16.
                            </h3>

                            <div className="space-y-3">
                                {/* 반납 지연 알림 */}
                                <div className="p-4 rounded-lg border-l-4"
                                    style={{
                                        backgroundColor: colors.bg.LEFT_PANNEL,
                                        borderColor: colors.button.DELETE
                                    }}>
                                    <h4 className="font-semibold" style={{ color: colors.text.BLACK }}>
                                        Overdue Return Alert (Serial No. : abcd123)
                                    </h4>
                                    <p className="text-sm mt-1" style={{ color: colors.text.DESCRIPTION }}>
                                        The return of asset No. abcd123 is overdue by 3 days.
                                    </p>
                                </div>

                                {/* 보증 만료 알림 */}
                                <div className="p-4 rounded-lg border-l-4"
                                    style={{
                                        backgroundColor: colors.bg.LEFT_PANNEL,
                                        borderColor: colors.button.FILTER
                                    }}>
                                    <h4 className="font-semibold" style={{ color: colors.text.BLACK }}>
                                        Upcoming Warranty Expiry Alert (Serial No. : xyz789)
                                    </h4>
                                    <p className="text-sm mt-1" style={{ color: colors.text.DESCRIPTION }}>
                                        The warranty for device Serial No. xyz789 will expire on 2020.08.23.
                                    </p>
                                </div>

                                {/* 추가 반납 지연 알림 */}
                                <div className="p-4 rounded-lg border-l-4"
                                    style={{
                                        backgroundColor: colors.bg.LEFT_PANNEL,
                                        borderColor: colors.button.DELETE
                                    }}>
                                    <h4 className="font-semibold" style={{ color: colors.text.BLACK }}>
                                        Overdue Return Alert (Serial No. : def456)
                                    </h4>
                                    <p className="text-sm mt-1" style={{ color: colors.text.DESCRIPTION }}>
                                        The return of asset No. def456 is overdue by 1 days.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 이전 날짜 */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text.BLACK }}>
                                2020.08.15.
                            </h3>

                            <div className="space-y-3">
                                <div className="p-4 rounded-lg border-l-4"
                                    style={{
                                        backgroundColor: colors.bg.LEFT_PANNEL,
                                        borderColor: colors.button.FILTER
                                    }}>
                                    <h4 className="font-semibold" style={{ color: colors.text.BLACK }}>
                                        Upcoming Warranty Expiry Alert (Serial No. : dswlf80)
                                    </h4>
                                    <p className="text-sm mt-1" style={{ color: colors.text.DESCRIPTION }}>
                                        The warranty for device Serial No. dswlf80 expires today (2020.08.15).
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg border-l-4"
                                    style={{
                                        backgroundColor: colors.bg.LEFT_PANNEL,
                                        borderColor: colors.button.DELETE
                                    }}>
                                    <h4 className="font-semibold" style={{ color: colors.text.BLACK }}>
                                        Return Due Today (Serial No. : 4efgh6)
                                    </h4>
                                    <p className="text-sm mt-1" style={{ color: colors.text.DESCRIPTION }}>
                                        The return for asset No. 4efgh6 is due today (2020.08.15.).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 더 이전 날짜 */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text.BLACK }}>
                                2020.08.14.
                            </h3>

                            <div className="space-y-3">
                                <div className="p-4 rounded-lg border-l-4"
                                    style={{
                                        backgroundColor: colors.bg.LEFT_PANNEL,
                                        borderColor: colors.button.DELETE
                                    }}>
                                    <h4 className="font-semibold" style={{ color: colors.text.BLACK }}>
                                        Overdue Return Alert (Serial No. : abcd123)
                                    </h4>
                                    <p className="text-sm mt-1" style={{ color: colors.text.DESCRIPTION }}>
                                        The return of asset No. abcd123 is overdue by 1 days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
