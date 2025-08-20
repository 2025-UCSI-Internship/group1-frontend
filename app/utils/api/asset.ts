// MARK: - 자산 관련 API 호출

import { apiClient } from './client';
import { API_ENDPOINTS } from '~/constants/endpoints';

// 자산관련 DTO 임포트 필요
import type {
    CreateAssetRequestDto,
    DeleteAssetRequestDto,
    DeleteAssetResponseDto,
    UpdateAssetRequestDto,
    UpdateAssetResponseDto,
    GetAssetsRequestDto,
    GetAssetsResponseDto,
    GetAssetByIdRequestDto,
    GetAssetByIdResponseDto,
} from '../../types/asset';

export const assetAPI = {
    // 자산 등록
    createAsset: async (data: CreateAssetRequestDto) => {
        const response = await apiClient.post(API_ENDPOINTS.ASSET.REGISTER, data);
        return response.data; // 여기서 데이터 이건 뭐지?
    },

    // 자산 삭제
    deleteAsset: async (assetId: string) => {
        const url = API_ENDPOINTS.ASSET.DELETE.replace(':asset_id', assetId);
        await apiClient.delete(url);
        // 리스폰 안받아?
    },


    // 자산 수정
    updateAsset: async (assetId: string, data: UpdateAssetRequestDto) => {
        const url = API_ENDPOINTS.ASSET.UPDATE.replace(':asset_id', assetId);
        const response = await apiClient.put(url, data); // TODO: - api 명세서 메서드 확인 필요
        return response.data;
    },

    // 자산 목록 조회
    getAssets: async (params?: GetAssetsRequestDto) => {
        const response = await apiClient.get(API_ENDPOINTS.ASSET.LIST, { params });
        return response.data;
    },

    // 특정 자산 조회
    getAssetById: async (assetId: string) => {
        const url = API_ENDPOINTS.ASSET.DETAIL.replace(':assetId', assetId);
        const response = await apiClient.get(url);
        return response.data;
    },

};


