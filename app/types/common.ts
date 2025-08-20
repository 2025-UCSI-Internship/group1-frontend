
// MARK: -공통 유틸 타입 정의

export type UserType = 'admin' | 'user';

// api 응답
export interface ApiResponse<T> {

}

// interface ApiRequest<T> {

// }


// 에러 응답
export interface ErrorResponse {

}

interface ApiError {

}



enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}