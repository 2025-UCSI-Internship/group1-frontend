// MARK: - 자산 이동 이력 관련

// 자산 이동 타입
export type HistoryChangeType = 'type' | 'supplier' | 'brand' | 'serial number' | 'purchase date' | 'purchase order number' | 'warranty start date' | 'warranty end date' | 'category'

// 대출 요청
export interface RentRequest {
    assetId: string;
    userId?: string;  // 선택적 - 현재 사용자 기준
}

// 대출 응답
export interface RentResponse {
    success: boolean;
    message?: string;
}

// 반납 요청
export interface LoanRequest {
    assetId: string;
}

// 반납 응답
export interface LoanResponse {
    success: boolean;
    message?: string;
}

// 사용자 대여 이력
export interface UserHistoryDto {
    assetId: string;
    assetName: string;
    serialNumber: string;
    type: string;
    brand: string;
    loanDate: Date;
    returnDate: Date | null;
    status: 'returned' | 'overdue' | 'loaned';
    overdueDays?: number;
}

// 사용자 현재 대여 목록
export interface UserAssetListDto {
    assetId: string;
    assetName: string;
    serialNumber: string;
    type: string;
    brand: string;
    loanDate: Date;
    dueDate: Date;
    status: 'loaned' | 'overdue';
    overdueDays?: number;
}

// 관리자용 히스토리 개별 항목
export interface AdminHistoryDto {
    historyId: string;
    date: Date;
    changeType: HistoryChangeType;
    description: string;
    changedBy?: string;  // 변경한 사용자
}

// 관리자용 특정 자산 이동 이력 조회
export interface AdminMovementListDto {
    assetId: string;
    assetInfo: {
        name: string;
        serialNumber: string;
        type: string;
        brand: string;
        status: string;
    }
    histories: AdminHistoryDto[];
}

// 일반 사용자용 이동 이력
export interface UserMovementListDto {
    date: Date;
    changeType: HistoryChangeType;
    assetInfo: {
        name: string;
        serialNumber: string;
    }
}

// 관리자용 사용자별 대여 이력 조회 요청
export interface GetUserMovementRequestDto {
    userId: string;
    dateFrom?: Date;
    dateTo?: Date;
}

// 관리자용 사용자별 대여 이력 조회 응답
export interface GetUserMovementResponseDto {
    userId: string;
    userName: string;
    movements: UserHistoryDto[];
}

// Export all types
export type {
    MovementStatus,
    UserType,
} from './common';