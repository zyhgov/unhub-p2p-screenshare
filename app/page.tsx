import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Monitor, Users } from "lucide-react";
import Image from "next/image"; // 引入 Image 组件
import Link from "next/link";
import { CustomRoomIdForm } from "./_components/custom-room-id-form";

export default function Home() {
    return (
        // 外部容器用于控制页面最大宽度，Logo 应在其中
        <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-8">
            
            {/* 徽标/Logo - 新增部分 */}
            <div className="flex w-full items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    {/* 使用 next/image 优化图片加载 */}
                    <Image 
                        src="/logo.svg" 
                        alt="联合库UNHub Logo" // 替换为您的品牌名称
                        width={32} // 根据您的 Logo 大小调整
                        height={32} 
                        className="h-8 w-8" 
                    />
                    <span className="text-xl font-semibold tracking-tight">UNHub 屏幕共享</span> {/* 可选：添加文字品牌名称 */}
                </Link>
                {/* 可以在这里添加导航或空白占位符 */}
            </div>
            {/* --- 徽标/Logo 结束 --- */}

            <div className="flex flex-col gap-4 text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">立即共享您的屏幕</h1>
                <p className="text-primary text-xl">创建一个房间，分享代码，并在几秒钟内开始向观众演示您的屏幕内容。</p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Monitor />
                            开始共享
                        </CardTitle>
                        <CardDescription>创建一个房间并与他人共享您的屏幕</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <Link href="/host">
                            <Button className="w-full">创建房间</Button>
                        </Link>
                        <CustomRoomIdForm />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users />
                            加入一个房间
                        </CardTitle>
                        <CardDescription>输入房间代码以查看某人的屏幕</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/join">
                            <Button variant="outline" className="w-full">
                                加入房间
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
            
            <Alert>
                <AlertCircle />
                <AlertTitle>注意</AlertTitle>
                <AlertDescription>移动设备暂时不支持屏幕共享。移动用户仍然可以加入一个房间来查看其他人共享的屏幕。</AlertDescription>
            </Alert>
        </div>
    );
}