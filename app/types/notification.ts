// MARK: - 알람 관련 Dto

export type NotificationType = 'Late return' | 'Warranty expiry';

export interface NotificationDto {
    id: string;
    type: NotificationType;
    message: string;
    createdAt: Date;
}


// 반납 지연 알림
export interface NotificationLateDto extends NotificationDto {
    type: 'Late return';
    assetId: string;
    dueDate: Date;
    overdueDays: number;
}

// 보증 만료 알림
export interface NotificationEndDto extends NotificationDto {
    type: 'Warranty expiry';
    assetId: string;
    warrantyEndDate: Date;
    daysUntilExpiry: number;
};


// 알림 발송 이력 조회
export interface NotificationLogDto {
    id: string; // 로그 아이디
    type: NotificationType;
    message: string;
    sentAt: Date;
    assetId: string;
};


