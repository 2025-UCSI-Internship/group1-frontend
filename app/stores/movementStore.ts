// MARK: - 자산 대여/반납 관리 스토어

import { create } from 'zustand';
import { movementAPI } from '../utils/api';
import type {
    RentRequest,
    LoanRequest,
    AdminMovementListDto,
    UserHistoryDto,
    UserAssetListDto,
} from '../types';

interface MovementState {
    // State - 사용자 대여 관련
    currentRentals: UserAssetListDto[];  // 현재 대여 중인 자산 목록
    rentalHistory: UserHistoryDto[];      // 과거 대여 이력

    // State - 관리자용 이력
    movementHistory: AdminMovementListDto | null;  // 특정 자산의 이동 이력

    // State - 로딩 및 에러
    isLoading: boolean;
    error: string | null;

    // Actions - 사용자 대여/반납
    rentAsset: (assetId: string) => Promise<void>;
    returnAsset: (assetId: string) => Promise<void>;

    // Actions - 사용자 이력 조회
    fetchCurrentRentals: () => Promise<void>;
    fetchRentalHistory: () => Promise<void>;

    // Actions - 관리자 이력 조회
    fetchAssetMovementHistory: (assetId: string) => Promise<void>;

    // Actions - 유틸리티
    clearError: () => void;
    reset: () => void;
}

export const useMovementStore = create<MovementState>((set, get) => ({
    // Initial State
    currentRentals: [],
    rentalHistory: [],
    movementHistory: null,
    isLoading: false,
    error: null,

    // Actions - 자산 대여
    rentAsset: async (assetId) => {
        try {
            set({ isLoading: true, error: null });

            // 대여 요청
            await movementAPI.checkout(assetId);

            // 현재 대여 목록 갱신
            await get().fetchCurrentRentals();

            set({ isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : '자산 대여에 실패했습니다.',
                isLoading: false,
            });
            throw error;
        }
    },

    // Actions - 자산 반납
    returnAsset: async (assetId) => {
        try {
            set({ isLoading: true, error: null });

            // 반납 요청
            await movementAPI.checkin(assetId);

            // 현재 대여 목록 및 이력 갱신
            await Promise.all([
                get().fetchCurrentRentals(),
                get().fetchRentalHistory(),
            ]);

            set({ isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : '자산 반납에 실패했습니다.',
                isLoading: false,
            });
            throw error;
        }
    },

    // Actions - 현재 대여 중인 자산 조회
    fetchCurrentRentals: async () => {
        try {
            set({ isLoading: true, error: null });

            const rentals = await movementAPI.getMovementList('user', { status: 'loaned' });

            set({
                currentRentals: rentals,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : '대여 목록 조회에 실패했습니다.',
                isLoading: false,
            });
        }
    },

    // Actions - 대여 이력 조회
    fetchRentalHistory: async () => {
        try {
            set({ isLoading: true, error: null });

            const history = await movementAPI.getMovementList('user', { status: 'returned' });

            set({
                rentalHistory: history,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : '대여 이력 조회에 실패했습니다.',
                isLoading: false,
            });
        }
    },

    // Actions - 관리자: 특정 자산의 이동 이력 조회
    fetchAssetMovementHistory: async (assetId) => {
        try {
            set({ isLoading: true, error: null });

            const history = await movementAPI.getMovementList('admin', { assetId });

            set({
                movementHistory: history,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : '자산 이력 조회에 실패했습니다.',
                isLoading: false,
            });
        }
    },

    // Actions - 유틸리티
    clearError: () => set({ error: null }),

    reset: () => set({
        currentRentals: [],
        rentalHistory: [],
        movementHistory: null,
        isLoading: false,
        error: null,
    }),
}));