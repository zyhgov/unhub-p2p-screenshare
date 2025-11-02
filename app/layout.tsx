import { ClarityScript } from "@/components/clarity-script";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image"; // 确保引入 Image
import Link from "next/link";
import "./globals.css";

// 保持 Inter 字体定义不变，因为您在 globals.css 中全局应用了 OpenAISans
const inter = Inter({ subsets: ["latin"] }); 

export const metadata = {
    // 标题强调“联合库UNHub 屏幕分享”
    title: "联合库UNHub 屏幕分享 - 实时共享您的屏幕", // 翻译: Screen Share - Share Your Screen Instantly
    // 描述
    description: "使用简单的房间代码，与任何人即时共享您的屏幕。无需下载或注册。由联合库UNHub提供。", // 翻译: Share your screen instantly with anyone using a simple room code. No downloads or sign-ups required.
    // 关键词
    keywords: ["联合库UNHub", "屏幕共享", "webrtc", "在线屏幕共享", "浏览器屏幕共享", "免费屏幕共享", "实时共享屏幕", "屏幕共享工具"], // 翻译: ["screen sharing", "webrtc", "online screen share", "browser screen sharing", "free screen sharing", "share your screen", "share screen", "screen share"]
    other: {
        "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ""
    }
} satisfies Metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        // 将 HTML 语言设置为中文 (zh)
        <html lang="zh">
            {/* 保持 className={inter.className}，但由于 globals.css 已强制使用 OpenAISans，此处主要为兼容性考虑 */}
            <body className={inter.className}>
                <main className="from-background to-muted flex min-h-screen flex-col justify-between bg-linear-to-b">
                    {children}
                    <footer className="text-muted-foreground px-4 py-8 text-center text-sm">
                                              {/* Cloudflare 图片：换行并在下方居中显示 */}
                        <div className="mt-2 flex w-full justify-center">
                            <Image 
                                src="/cloudflare.png" 
                                alt="Cloudflare" 
                                width={100} 
                                height={20} 
                                className="opacity-70" 
                            />
                        </div>
                        {/* 页脚文本 */}
                        Design by &nbsp;
                        <Link href="https://tonghohin.vercel.app" className="underline" target="_blank">
                            <b>Hin</b>
                        </Link>
                        . &nbsp;&nbsp;<b>联合库UNHub</b> P2P 屏幕分享 <br />
                        <b>杖雍皓</b>提供基础设施服务支持 <br />
                        <b>Cloudflare</b> 提供安全加密传输服务支持
                    </footer>
                </main>
                <ClarityScript />
                <Toaster richColors />
            </body>
        </html>
    );
}