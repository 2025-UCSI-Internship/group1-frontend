// MARK: - 인증 관련 API

import { apiClient } from './client';
import { API_ENDPOINTS } from '~/constants/endpoints';
import type {
    UserDto,
    UserRole,
    LoginRequestDto,
    LoginResponseDto,
    SignupRequestDto,
    SignupResponseDto,
    RefreshTokenResponseDto,
} from '../../types/auth';

export const authAPI = {
    // 로그인
    login: async (data: LoginRequestDto): Promise<LoginResponseDto> => {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
        return response.data;
    },

    // 로그아웃
    logout: async (): Promise<void> => {
        await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    },

    // 회원가입
    signup: async (data: SignupRequestDto): Promise<SignupResponseDto> => {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.SIGNUP, data);
        return response.data;
    },

    // 토큰 갱신
    refreshToken: async (refreshToken: string): Promise<RefreshTokenResponseDto> => {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
        return response.data;
    },

    // 현재 사용자 정보 조회
    getCurrentUser: async (): Promise<UserDto> => {
        const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
        return response.data;
    },
};