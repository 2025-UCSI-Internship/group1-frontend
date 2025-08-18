// 유효성 검증

export const validation = {
    EMAIL: {
        PATTERN:/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i, // 정규식
    },

    PASSWORD: {
        MIN_LENGTH: 8,// 최소 길이 지정
        PATTERN: /^[A-Za-z0-9]+$/, // 영문,숫자만 허용
    },

    USER_NAME: {
        MIN_LENGTH: 1,
        PATTERN: /^[A-Za-z]+$/, // 영문만 허용
    }

} as const;
