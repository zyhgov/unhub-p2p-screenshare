"use client";

import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

interface ShareOptionsProps {
    roomId: string;
}

export function ShareOptions({ roomId }: ShareOptionsProps) {
    function copyRoomId() {
        navigator.clipboard.writeText(roomId);
        toast.success("房间代码已复制！", { // 翻译: Room code copied!
            description: "将此代码分享给其他人，让他们加入您的房间。" // 翻译: Share this code with others to let them join your room.
        });
    }

    function copyShareableLink() {
        // window.location.origin 在浏览器环境中可获取当前站点的基础URL
        const shareableUrl = `${window.location.origin}/join?room=${roomId}`;
        navigator.clipboard.writeText(shareableUrl);
        toast.success("分享链接已复制！", { // 翻译: Shareable link copied!
            description: "将此链接分享给其他人，让他们直接加入您的房间。" // 翻译: Share this link with others to let them join your room directly.
        });
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <p className="text-muted-foreground text-sm">房间代码</p> {/* 翻译: Room Code */}
                <code className="bg-muted flex w-full items-center justify-between gap-2 rounded-lg p-3 font-mono text-sm tracking-tight">
                    {roomId || "正在生成房间代码..."} {/* 翻译: Generating room code... */}
                    <Button variant="ghost" size="sm" onClick={copyRoomId} disabled={!roomId} className="text-muted-foreground size-4">
                        <CopyIcon />
                    </Button>
                </code>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background text-muted-foreground px-2">或</span> {/* 翻译: or */}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-muted-foreground text-sm">分享链接</p> {/* 翻译: Shareable Link */}
                <code className="bg-muted flex w-full items-center justify-between gap-2 rounded-lg p-3 font-mono text-sm tracking-tight">
                    {roomId ? `${window.location.origin}/join?room=${roomId}` : "正在生成链接..."} {/* 翻译: Generating link... */}
                    <Button variant="ghost" size="sm" onClick={copyShareableLink} disabled={!roomId} className="text-muted-foreground size-4">
                        <CopyIcon />
                    </Button>
                </code>
            </div>
        </div>
    );
}