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
        const response = await apiClient.post(API_ENDPOINTS.TRACKING.CHECKIN, assetId);
        return response.data;
    },


    // 이동 이력
    getMovementList: async (userType: UserType, params?: any) => {
        const response = await apiClient.get(API_ENDPOINTS.TRACKING.LIST, { params }) // 왜 params 중괄호?
        return response.data
    },
};





/*임포트 구문에서 중괄호 써서 임포트 하는 경우는 무슨 경우? 
이동 이력 params에 any타입 -> 현재 뭐가 들어가는?*/
