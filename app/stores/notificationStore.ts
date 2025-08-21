// MARK: - 알림 관리 스토어

import { create } from 'zustand';
import { notificationAPI } from '../utils/api';
import type {
    NotificationDto,
    NotificationLateDto,
    NotificationEndDto,
    NotificationLogDto,
    NotificationType,
} from '../types';

interface NotificationState {
    // State - 알림 목록
    notifications: NotificationDto[];              // 현재 알림 목록
    lateReturnNotifications: NotificationLateDto[]; // 반납 지연 알림
    warrantyNotifications: NotificationEndDto[];    // 보증 만료 알림
    notificationLogs: NotificationLogDto[];        // 알림 발송 이력

    // State - 알림 카운트
    unreadCount: number;
    hasNewNotifications: boolean;

    // State - 필터
    filter: {
        type?: NotificationType;
        dateFrom?: Date;
        dateTo?: Date;
    };

    // State - 로딩 및 에러
    isLoading: boolean;
    error: string | null;

    // Actions - 알림 조회
    fetchNotifications: () => Promise<void>;
    fetchLateReturnNotifications: () => Promise<void>;
    fetchWarrantyNotifications: () => Promise<void>;
    fetchNotificationLogs: (assetId?: string) => Promise<void>;

    // Actions - 알림 관리
    deleteNotification: (notificationId: string) => Promise<void>;
    clearAllNotifications: () => void;

    // Actions - 필터
    setFilter: (filter: NotificationState['filter']) => void;
    clearFilter: () => void;

    // Actions - 유틸리티
    clearError: () => void;
    reset: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
    // Initial State
    notifications: [],
    lateReturnNotifications: [],
    warrantyNotifications: [],
    notificationLogs: [],
    unreadCount: 0,
    hasNewNotifications: false,
    filter: {},
    isLoading: false,
    error: null,

    // Actions - 전체 알림 조회
    fetchNotifications: async () => {
        try {
            set({ isLoading: true, error: null });

            const notifications = await notificationAPI.getNotifications();

            set({
                notifications,
                unreadCount: notifications.length, // 모든 알림을 카운트 (읽음 상태 없음)
                hasNewNotifications: notifications.length > 0,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : '알림 조회에 실패했습니다.',
                isLoading: false,
            });
        }
    },

    // Actions - 반납 지연 알림 조회
    fetchLateReturnNotifications: async () => {
        try {
            set({ isLoading: true, error: null });

            const notifications = await notificationAPI.getLateReturnNotifications();

            set({
                lateReturnNotifications: notifications,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : '반납 지연 알림 조회에 실패했습니다.',
                isLoading: false,
            });
        }
    },

    // Actions - 보증 만료 알림 조회
    fetchWarrantyNotifications: async () => {
        try {
            set({ isLoading: true, error: null });

            const notifications = await notificationAPI.getWarrantyNotifications();

            set({
                warrantyNotifications: notifications,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : '보증 만료 알림 조회에 실패했습니다.',
                isLoading: false,
            });
        }
    },

    // Actions - 알림 발송 이력 조회
    fetchNotificationLogs: async (assetId) => {
        try {
            set({ isLoading: true, error: null });

            const logs = await notificationAPI.getNotificationLogs(assetId);

            set({
                notificationLogs: logs,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : '알림 이력 조회에 실패했습니다.',
                isLoading: false,
            });
        }
    },

    // Actions - 모든 알림 제거 (클라이언트 측에서만)
    clearAllNotifications: () => {
        set({
            notifications: [],
            unreadCount: 0,
            hasNewNotifications: false,
        });
    },

    // Actions - 알림 삭제
    deleteNotification: async (notificationId) => {
        try {
            set({ isLoading: true, error: null });

            await notificationAPI.deleteNotification(notificationId);

            set((state) => ({
                notifications: state.notifications.filter(n => n.id !== notificationId),
                unreadCount: state.notifications.filter(n => n.id !== notificationId).length,
                isLoading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : '알림 삭제에 실패했습니다.',
                isLoading: false,
            });
        }
    },

    // Actions - 필터
    setFilter: (filter) => set({ filter }),
    clearFilter: () => set({ filter: {} }),

    // Actions - 유틸리티
    clearError: () => set({ error: null }),

    reset: () => set({
        notifications: [],
        lateReturnNotifications: [],
        warrantyNotifications: [],
        notificationLogs: [],
        unreadCount: 0,
        hasNewNotifications: false,
        filter: {},
        isLoading: false,
        error: null,
    }),
}));