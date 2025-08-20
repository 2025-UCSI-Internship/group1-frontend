import { apiClient } from "./client";
import { API_ENDPOINTS } from "~/constants";
import type {
    RentRequest,
    LoanRequest,
    AdminMovementListDto,
    UserMovementListDto
} from '../../types/movement';
import type { UserType } from '../../types/common';


export const movementAPI = {
    // 자산 대출
    checkout: async (assetId: string) => {
        const url = API_ENDPOINTS.TRACKING.CHECKOUT.replace(':asset_id', assetId);
        const response = await apiClient.post(url);
        return response.data;
    },

    // 자산 반납
    checkin: async (assetId: string) => {
        const url = API_ENDPOINTS.TRACKING.CHECKIN.replace(':asset_id', assetId);
        const response = await apiClient.post(url)
        return response.data;
    },


    // 이동 이력
    getMovementList: async (userType: UserType, params?: any) => {
        const response = await apiClient.get(API_ENDPOINTS.TRACKING.LIST, { params });
        return response.data
    },
};






