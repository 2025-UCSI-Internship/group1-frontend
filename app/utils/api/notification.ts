// MARK: - 알림 관련 API

import { apiClient } from "./client";
import { API_ENDPOINTS } from "~/constants";
import type {
    NotificationDto,
    NotificationLateDto,
    NotificationEndDto,
    NotificationLogDto,
} from '../../types/notification';

export const notificationAPI = {
    // 반납 지연 알림 조회
    getLateReturnNotifications: async (): Promise<NotificationLateDto[]> => {
        const response = await apiClient.get(API_ENDPOINTS.NOTIFICATION.CHECKOUT);
        return response.data;
    },

    // 보증 만료 알림 조회
    getWarrantyNotifications: async (): Promise<NotificationEndDto[]> => {
        const response = await apiClient.get(API_ENDPOINTS.NOTIFICATION.WARRANTY);
        return response.data;
    },

    // 알림 발송 이력 조회
    getNotificationLogs: async (assetId?: string): Promise<NotificationLogDto[]> => {
        const params = assetId ? { assetId } : {};
        const response = await apiClient.get(API_ENDPOINTS.NOTIFICATION.LOG, { params });
        return response.data;
    },

    // 전체 알림 조회 (반납 지연 + 보증 만료 통합)
    getNotifications: async (): Promise<NotificationDto[]> => {
        try {
            const [lateReturns, warranties] = await Promise.all([
                notificationAPI.getLateReturnNotifications(),
                notificationAPI.getWarrantyNotifications(),
            ]);

            // 두 타입의 알림을 합쳐서 반환
            return [...lateReturns, ...warranties];
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
            return [];
        }
    },
};