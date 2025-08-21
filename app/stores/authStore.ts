// MARK: - 인증 및 사용자 관리 스토어

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../utils/api';
import type {
    UserDto,
    UserRole,
    LoginRequestDto,
    SignupRequestDto,
} from '../types/auth';

interface AuthState {
    // State
    user: UserDto | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (credentials: LoginRequestDto) => Promise<void>;
    signup: (data: SignupRequestDto) => Promise<void>;
    logout: () => Promise<void>;
    refreshAccessToken: () => Promise<void>;
    checkAuth: () => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // Initial State
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // Actions
            login: async (credentials) => {
                try {
                    set({ isLoading: true, error: null });

                    const response = await authAPI.login(credentials);

                    set({
                        user: response.user,
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : '로그인에 실패했습니다.',
                        isLoading: false,
                        isAuthenticated: false,
                    });
                    throw error;
                }
            },

            signup: async (data) => {
                try {
                    set({ isLoading: true, error: null });

                    // 비밀번호 확인
                    if (data.password !== data.confirmPassword) {
                        throw new Error('비밀번호가 일치하지 않습니다.');
                    }

                    await authAPI.signup(data);

                    set({ isLoading: false });

                    // 회원가입 후 자동 로그인
                    await get().login({
                        id: data.userId,
                        password: data.password,
                    });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : '회원가입에 실패했습니다.',
                        isLoading: false,
                    });
                    throw error;
                }
            },

            logout: async () => {
                try {
                    set({ isLoading: true, error: null });

                    // 서버에 로그아웃 요청
                    await authAPI.logout();

                    // 상태 초기화
                    set({
                        user: null,
                        accessToken: null,
                        refreshToken: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : '로그아웃에 실패했습니다.',
                        isLoading: false,
                    });
                }
            },

            refreshAccessToken: async () => {
                try {
                    const refreshToken = get().refreshToken;
                    if (!refreshToken) {
                        throw new Error('리프레시 토큰이 없습니다.');
                    }

                    const response = await authAPI.refreshToken(refreshToken);

                    set({
                        accessToken: response.accessToken,
                        refreshToken: response.refreshToken,
                    });
                } catch (error) {
                    // 토큰 갱신 실패 시 로그아웃
                    get().logout();
                    throw error;
                }
            },

            checkAuth: () => {
                const { accessToken, user } = get();
                set({
                    isAuthenticated: !!(accessToken && user),
                });
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'auth-storage', // localStorage key
            partialize: (state) => ({
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
            }),
        }
    )
);