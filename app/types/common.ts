
// MARK: -공통 유틸 타입 정의

// api 응답
interface ApiReponse<T> {

}

// interface ApiRequest<T> {

// }


// 에러 응답
interface ErrorResponse {

}

interface ApiError {

}



enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}