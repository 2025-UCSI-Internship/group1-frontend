// MARK: - 인증 관련 타입 정의

// 사용자 역할 
export type UserRole = 'ADMIN' | 'USER';

// 사용자 정보
export interface UserDto {
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: UserRole;
}

// 로그인 요청
export interface LoginRequestDto {
    id: string;
    password: string;
}

// 로그인 응답
export interface LoginResponseDto {
    accessToken: string;
    refreshToken: string;
    user: UserDto;
}

// 로그아웃 요청
export interface LogoutRequestDto {
    // 빈 인터페이스 - 추후 필요시 추가
}

// 로그아웃 응답
export interface LogoutResponseDto {
    success: boolean;
    message?: string;
}

// 회원가입 요청
export interface SignupRequestDto {
    userId: string;
    password: string;
    confirmPassword: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: UserRole;
}

// 회원가입 응답
export interface SignupResponseDto {
    success: boolean;
    message: string;
}

// 토큰 갱신 요청
export interface RefreshTokenRequestDto {
    refreshToken: string;
}

// 토큰 갱신 응답
export interface RefreshTokenResponseDto {
    accessToken: string;
    refreshToken: string;
}