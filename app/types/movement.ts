

// MARK: - 자산 이동 이력 관련

// 자산 이동 타입
export type HistoryChangeType = 'type' | 'supplier' | 'brand' | 'serial number' | 'purchase date' | 'purchase order number' | 'warranty start date' | 'warranty end date' | 'category'

// 대출 요청
export interface RentRequest {
    assetId: string;
    userId: string;
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


// 관리자용 히스토리 개별 항목
export interface AdminHistoryDto {
    historyId: string;
    date: Date;
    changeType: HistoryChangeType;
    description: string;
}

// 관리자용 특정 상품 이동 이력 조회
export interface AdminMovementListDto {
    assetId: string;
    assetInfo: {
        name: string;
        serialNumber: string;
        description: string;  // 변경사항 표시
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






















