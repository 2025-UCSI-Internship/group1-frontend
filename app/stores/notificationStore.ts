import { create } from "zustand";
import type{
  NotificationDto,
  NotificationLateDto,
  NotificationEndDto,
  NotificationLogDto,
  NotificationType,
} from "../types/notification";
import { api } from "../utils/api";

// ==== State 타입 정의 ====
interface NotificationState {
  // 알림함
  inbox: NotificationDto[];
  unreadCount: number;

  // 알림 로그 (서버에 발송된 이력)
  logs: NotificationLogDto[];

  // 로딩 및 에러 상태
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchNotifications: () => Promise<void>;
  markRead: (id: string) => Promise<void>;
  markAllRead: () => Promise<void>;
  clearAll: () => void;

  fetchLogs: () => Promise<void>;
}

// ==== Zustand Store ====
export const useNotificationStore = create<NotificationState>((set, get) => ({
  // 초기값
  inbox: [],
  unreadCount: 0,
  logs: [],
  isLoading: false,
  error: null,

  // ===== 알림 불러오기 =====
  fetchNotifications: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await api<NotificationDto[]>("/notifications", { method: "GET" });

      set({
        inbox: data,
        unreadCount: data.length, // 단순히 전체 미확인 개수라고 가정
        isLoading: false,
      });
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : "Failed to fetch notifications",
        isLoading: false,
      });
    }
  },

  // ===== 알림 읽음 처리 =====
  markRead: async (id) => {
    // 낙관적 업데이트
    set((s) => {
      const wasUnread = s.inbox.some((n) => (n as any).id === id);
      const next = s.inbox.map((n) =>
        (n as any).id === id ? { ...n, status: "Read" } : n
      );
      return {
        inbox: next,
        unreadCount: wasUnread ? Math.max(0, s.unreadCount - 1) : s.unreadCount,
      };
    });

    try {
      await api<void>(`/notifications/${id}/read`, { method: "PATCH" });
    } catch (e) {
      // 롤백
      set((s) => {
        const next = s.inbox.map((n) =>
          (n as any).id === id ? { ...n, status: "Unread" } : n
        );
        return { inbox: next, unreadCount: s.unreadCount + 1 };
      });
      throw e;
    }
  },

  // ===== 전체 읽음 처리 =====
  markAllRead: async () => {
    // 낙관적 처리
    set((s) => {
      if (s.unreadCount === 0) return s;
      const next = s.inbox.map((n) => ({ ...n, status: "Read" }));
      return { inbox: next, unreadCount: 0 };
    });

    try {
      await api<void>("/notifications/read-all", { method: "PATCH" });
    } catch (e) {
      // 실패 시 복구 (단순 복원 처리)
      set((s) => ({
        inbox: s.inbox.map((n) =>
          (n as any).status === "Read" ? { ...n, status: "Unread" } : n
        ),
        unreadCount: s.inbox.length,
      }));
      throw e;
    }
  },

  // ===== 알림 전체 제거 =====
  clearAll: () => set({ inbox: [], unreadCount: 0 }),

  // ===== 로그 조회 =====
  fetchLogs: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await api<NotificationLogDto[]>("/notifications/logs", {
        method: "GET",
      });
      set({ logs: data, isLoading: false });
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : "Failed to fetch notification logs",
        isLoading: false,
      });
    }
  },
}));
