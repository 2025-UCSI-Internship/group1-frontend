// MARK: -인증 관련 타입 정의

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
    refreshToken: string;
}

// 로그아웃 응답
export interface LoginResponseDto {
    logoutToken: boolean;
}

// 회원가입 요청
export interface SignupRequestDto {
    id: string;
    role: UserRole;
    name: string;
    password: string;
    passwordConfirm: boolean;
    eMail: string;
    phone: string;
    createAt: Date;
}

// 회원가입 응답
export interface SignupResponseDto {
    signupToken: boolean;
}

// 사용자 정보
export interface UserDto {
    userId: string;
    role: UserRole;
    name: string;
    email: string;
    password: string;
}

// 사용자 구분
export type UserRole = 'admin' | 'user'