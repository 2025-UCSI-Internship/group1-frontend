// MARK: - 자산 관랸 스토어
// TODO: - 민지


import { create } from 'zustand';
import { assetAPI } from '../utils/api';
import type {
    AssetDto,
    CreateAssetRequestDto,
    UpdateAssetRequestDto,
    GetAssetsRequestDto
} from '../types';

interface AssetState {
    // State
    assets: AssetDto[];
    currentAsset: AssetDto | null;
    isLoading: boolean;
    error: string | null;
    filters: GetAssetsRequestDto;

    // Actions
    fetchAssets: (params?: GetAssetsRequestDto) => Promise<void>;
    fetchAssetById: (assetId: string) => Promise<void>;
    createAsset: (data: CreateAssetRequestDto) => Promise<void>;
    updateAsset: (assetId: string, data: UpdateAssetRequestDto)
        => Promise<void>;
    deleteAsset: (assetId: string) => Promise<void>;
    setFilters: (filters: GetAssetsRequestDto) => void;
    clearError: () => void;
    reset: () => void;
}

export const useAssetStore = create<AssetState>((set, get) =>
({
    // Initial State
    assets: [],
    currentAsset: null,
    isLoading: false,
    error: null,
    filters: {},

    // Actions
    fetchAssets: async (params) => {
        try {
            set({ isLoading: true, error: null });
            const filters = params || get().filters;
            const data = await assetAPI.getAssets(filters);

            set({
                assets: data.assets,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch assets',
                isLoading: false,
            });
        }
    },

    fetchAssetById: async (assetId) => {
        try {
            set({ isLoading: true, error: null });
            const asset = await assetAPI.getAssetById(assetId);

            set({
                currentAsset: asset,
                isLoading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch asset by id',
                isLoading: false,
            });
        }
    },

    createAsset: async (data) => {
        try {
            set({ isLoading: true, error: null });
            const newAsset = await assetAPI.createAsset(data);

            set((state) => ({
                assets: [newAsset, ...state.assets],
                isLoading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to create asset',
                isLoading: false,
            });
            throw error;
        }
    },

    updateAsset: async (assetId, data) => {
        try {
            set({ isLoading: true, error: null });
            const updatedAsset = await assetAPI.updateAsset(assetId,
                data);

            set((state) => ({
                assets: state.assets.map(asset =>
                    asset.assetId === assetId ? updatedAsset : asset
                ),
                currentAsset: state.currentAsset?.assetId === assetId ?
                    updatedAsset : state.currentAsset,
                isLoading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to update asset',
                isLoading: false,
            });
            throw error;
        }
    },

    deleteAsset: async (assetId) => {
        try {
            set({ isLoading: true, error: null });
            await assetAPI.deleteAsset(assetId);

            set((state) => ({
                assets: state.assets.filter(asset => asset.assetId !==
                    assetId),
                currentAsset: state.currentAsset?.assetId === assetId ?
                    null : state.currentAsset,
                isLoading: false,
            }));
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to delete asset',
                isLoading: false,
            });
            throw error;
        }
    },

    setFilters: (filters) => set({ filters }),
    clearError: () => set({ error: null }),
    reset: () => set({
        assets: [],
        currentAsset: null,
        isLoading: false,
        error: null,
        filters: {},
    }),
}));