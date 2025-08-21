import { type RouteConfig } from "@react-router/dev/routes";
import { index, route, layout } from "@react-router/dev/routes";

export default [
    // 랜딩 페이지 (레이아웃 없음)
    index("routes/landing.tsx"),

    // 인증 관련 라우트 (레이아웃 없음)
    route("login", "routes/auth/login.tsx"),
    route("signup", "routes/auth/signup.tsx"),

    // 메인 레이아웃이 적용되는 라우트
    layout("routes/layouts/main-layout.tsx", [
        route("assets", "routes/assets/index.tsx"),
        route("assets/:id", "routes/assets/detail.tsx"),
        route("history", "routes/history/index.tsx"),
        route("notifications", "routes/notifications/index.tsx"),
        route("register", "routes/register/index.tsx"),
    ]),
] satisfies RouteConfig;