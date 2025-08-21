import type { BooleanLiteral } from 'typescript';
import { create } from 'zustand';


interface UIState {
    isGlobalLoading: boolean;

    sidebarOpen: boolean;
    activeMenu: 'home' | 'register' | 'history' | 'notification' | 'logout' | null;

    // 모달상태
    modals: {
        // 자산 관련
        registerAsset: boolean;
        updateAsset: boolean;
        deleteAsset: boolean;
        assetFilter: boolean;

        // 대여 관련
        returnAsset: boolean;
        loanAsset: boolean;


        // 시스템
        logoutConfirm: boolean; // 로그아웃 확인 모달
        notification: boolean; // 일반 알림 모달

    };

    // 알림 메세지(모달에 표시할 내용)
    notificationContent: {
        title?: string;
        message?: string;
        type: 'info' | 'success' | 'confirm' | 'error' | 'warning';
        confirmAction?: () => void; // confirm 타입일 때 OK 버튼 액션
    } | null;


    // 필터 상태
    filters: {
        type: string[];
        category: string[];
        status: string[];
    };

    // qa 선택된 자산 정보
    selectedAssetId: string | null;

    // 액션?
    setGlobalLoading: (loading: boolean) => void;

    // 사이드바 관련
    setSidebar: (open: boolean) => void;
    setActiveMenu: (menu: UIState['activeMenu']) => void;


    // 모달 관련
    openModal: (modalName: keyof UIState['modals']) => void;
    closeModal: (modalName: keyof UIState['modals']) => void;
    closeAllModals: () => void;

    // 알림 관련
    showNotification: (
        message: string,
        type?: 'info' | 'success' | 'confirm' | 'error' | 'warning',
        title?: string,
        confirmAction?: () => void,
    ) => void;
    clearNotification: () => void;

    // 필터 관련
    setFilter: <K extends keyof UIState['filters']>(
        filterType: K,
        values: UIState['filters'][K],
    ) => void;
    resetFilters: () => void;

    // 자산 선택
    setSelectedAssetId: (assetId: string | null) => void; // 어드민 계정으로 자산 선택시 해당 자산의 히스토리 볼 수 있어야함

}

// useUIStore 훅생성인가? 얘부터는 뭔가 초기확 같기도 하고 콜론대신에 콤마쓰고 set이란게 뭐지 진짜 모르겟네
// 커스텀 훅이면 hooks 폴더에 만들어야하는거아닌가
export const useUIStore = create<UIState>((set, get) => ({
    isGlobalLoading: false,
    sidebarOpen: false,
    activeMenu: 'home',
    // 모달상태
    modals: {
        // 자산 관련
        registerAsset: false,
        updateAsset: false,
        deleteAsset: false,
        assetFilter: false,

        // 대여 관련
        returnAsset: false,
        loanAsset: false,


        // 시스템
        logoutConfirm: false, // 로그아웃 확인 모달
        notification: false, // 일반 알림 모달

    },

    // 알림 메세지(모달에 표시할 내용)
    notificationContent: null,


    // 필터 상태
    filters: {
        type: [],
        category: [],
        status: [],
    },

    // qa 선택된 자산 정보
    selectedAssetId: null,

    // 액션?
    setGlobalLoading: (loading) => set({ isGlobalLoading: loading }),

    // 사이드바 관련
    setSidebar: (open) => set({ sidebarOpen: open }),
    setActiveMenu: (menu) => set({ activeMenu: menu }),// 이런데 사용한 set은 뭐고 menu 파라미터 여기 타입은 뭐지예?


    // 모달 관련
    openModal: (modalName) =>
        set((state) => ({
            modals: { ...state.modals, [modalName]: true } // 이건뭐노
        })), // 화살표 함수 끝나면 콤마 붙여야하나?

    closeModal: (modalName) =>
        set((state) => ({
            modals: { ...state.modals, [modalName]: false } // props룰 동적으로 받는건가..?[modalName]은 뭐지
        })),

    // 이부분은 싹다 구조도 이해안됨... set에 뭐가 들어가있는거임
    closeAllModals: () =>
        set((state) => ({
            modals: Object.keys(state.modals).reduce((acc, key) => ({
                ...acc,
                [key]: false
            }), {} as UIState['modals'])
        })),

    // 알림 관련
    showNotification: (
        message,
        type = 'info',
        title,
        confirmAction
    ) => {
        set({
            notificationContent: { message, type, title, confirmAction },
            modals: {
                ...get().modals, // 이건뭐노
                notification: true
            }
        }); // 여긴 또 왜 세미콜론 붙임
    },

    clearNotification: () => { // 여긴 중괄호 안에 set 존재하네
        set({
            notificationContent: null,
            modals: {
                ...get().modals, // 이건뭐노
                notification: false
            }
        });
    },

    // 필터 관련
    setFilter: (filterType, values) =>
        set((state) => ({
            filters: {
                ...state.filters,
                [filterType]: values
            }
        })), // 여긴 set 안에 화살표 함수 있는 것 같응데...?


    resetFilters: () =>
        set({
            filters: {
                type: [],
                category: [],
                status: [],
            }
        }),// 여긴 set 안에 인스턴스 = 객체가 존재하는 건가
    // 필터 객체 형식으로 들어있는 것 같은데 뭐지

    // 자산 선택
    setSelectedAssetId: (assetId) => set({ selectedAssetId: assetId }),// 어드민 계정으로 자산 선택시 해당 자산의 히스토리 볼 수 있어야함

    // 우리 시스템에 토스트는 없음

}));