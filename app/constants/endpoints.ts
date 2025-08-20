// MARK: - 백엔드 API 경로

export const API_ENDPOINTS = {
    ASSET: {
        REGISTER: '/assets/add', // 신규 자산 등록
        LIST: '/assets', // 자산 목록 조회
        MODIFY: '/assets/:asset_id', // 자산 정보 수정
        DELETE: '/assets/:asset_id', // 자산 정보 삭제
        DETAIL: '/assets/:asset_id', // 특정 자산 정보 조회

    },

    AUTH: {
        LOGIN: '/auth/login', // 로그인
        LOGOUT: '/auth/logout', // 로그아웃
        SIGNUP: '' // 회원가입
    },

    TRACKING: {
        CHECKOUT: '/movements/checkoout', // 자산 대출
        CHECKIN: '/movements/checkin', // 자산 반납
        LIST: '/movements', // 이동 이력 조회
        MODIFY: '/movements/:movement_id', // 이동 이력 수정
    },

    NOTIFICATION: {
        CHECKOUT: '/notifications/checkout', // 반납 지연 알림
        WARRANTY: '/notifications/warranty', // 보증 만료 예정 알림
        LOG: '/notifications/logs', // 알림 발송 이력 조회
    },
};