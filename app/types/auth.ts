// MARK: -인증 관련 타입 정의

// 로그인 요청
interface LoginRequestDto {
    id: string;
    password: string;
}

// 로그인 응답
interface LoginResponseDto {
    accessToken: string;
    refreshToken: string;
    user: UserDto;
}

// 로그아웃 요청
interface LogoutRequestDto {
}


// 로그아웃 요청
interface LoginResponse {

}

// 회원가입 요청
interface SignupRequestDto {

}

// 회원가입 응답
interface SignupResponseDto {

}

// 사용자 정보
interface UserDto {

}

// 사용자 구분
enum UserRole {

}