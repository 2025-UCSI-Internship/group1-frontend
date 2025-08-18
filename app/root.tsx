
import type { LinksFunction } from "react-router";
import pretendardStylesheet from "./styles/fonts/pretendard.css?url";

export const links: LinksFunction = () => [
    // CDN 서버 연결
    {
        rel: "preconnect",
        href: "https://cdn.jsdelivr.net",
    },
    // Pretendard 폰트 CSS
    {
        rel: "stylesheet", 
        href: pretendardStylesheet,
    },
];
