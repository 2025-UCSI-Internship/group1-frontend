import type { LinksFunction } from "react-router";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import pretendardStylesheet from "./styles/fonts/pretendard.css?url";
import globalStylesheet from "./styles/global.css?url";

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
    // Global CSS (Tailwind 포함)
    {
        rel: "stylesheet",
        href: globalStylesheet,
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}