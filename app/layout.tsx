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
    // 标题优化：更具搜索价值和功能描述
    title: "免费P2P屏幕共享 联合库UNHub - 实时加密传输，极速连接", 
    // 描述优化：整合所有关键词和支持信息，强调免费、安全和P2P
    description: "UNHub P2P 屏幕分享工具：免费、实时、点对点（P2P）屏幕共享服务。使用简单的房间代码即时连接，由 Cloudflare 提供安全加密传输支持，杖雍皓提供高性能基础设施服务支持。无需下载，无需注册。", 
    // 关键词优化：增加“免费”、“安全”、“P2P”、“Cloudflare”等关键词
    keywords: [
        "免费屏幕共享", "P2P屏幕共享", "实时加密传输", "UNHub", 
        "在线屏幕共享工具", "WebRTC", "Cloudflare安全传输", 
        "杖雍皓基础设施", "无需下载", "屏幕分享"
    ], 
    // canonical URL: 添加规范 URL，告诉搜索引擎哪个是主要的版本
    metadataBase: new URL("https://p2p.zyhorg.cn"),
    alternates: {
        canonical: "https://p2p.zyhorg.cn",
    },
    // Open Graph 属性 (用于社交媒体分享)
    openGraph: {
        title: "UNHub 免费P2P屏幕共享 - 实时加密传输",
        description: "免费、实时、点对点（P2P）屏幕共享服务。由 Cloudflare 提供安全加密传输支持。",
        url: "https://p2p.zyhorg.cn",
        siteName: "联合库UNHub P2P 屏幕分享",
    },
    // Twitter Card 属性
    twitter: {
        card: 'summary_large_image',
        title: "UNHub 免费P2P屏幕共享",
        description: "免费、实时、点对点（P2P）屏幕共享服务。",
    },
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
                                                {/* Cloudflare 图片：在文本下方居中显示 */}
                        <div className="mt-2 flex w-full justify-center">
                            <Image 
                                src="/cloudflare.png" 
                                alt="Cloudflare" 
                                width={100} 
                                height={20} 
                                className="opacity-70" 
                            />
                        </div>
                        {/* 文本内容与您的最新版本保持一致，并进行了一些格式微调 */}
                        Design by &nbsp;
                        <Link href="https://tonghohin.vercel.app" className="underline" target="_blank">
                            <b>Hin</b>
                        </Link>
                        . &nbsp;&nbsp;
                        <Link href="https://docs.zyhorg.cn" className="underline" target="_blank">
                            <b>联合库UNHub</b>
                        </Link> P2P 屏幕共享 <br />
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