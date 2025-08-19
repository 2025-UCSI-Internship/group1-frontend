// MARK: - 브라우저 주소창 페이지 경로

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login', // 로그인
    LOGOUT: '/logout', // 로그아웃
    SINGUP: '/signup', // 회원가입
    ASSETS: '/assets',
    ASSET_DETAIL: '/assets/:asset_id',
    ASSET_ADD: '/assets/add', // 모달창
    TRACKING: '/movements', // 이동 이력 조회
    NOTIFICATION: '/notifications', // 알림 조회
} as const;
