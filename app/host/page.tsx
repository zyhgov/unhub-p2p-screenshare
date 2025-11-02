"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Monitor, Users } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Peer from "peerjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ShareOptions } from "./_components/share-options";

export default function HostPage() {
    const [roomId, setRoomId] = useState("");
    const [peer, setPeer] = useState<Peer | null>(null);
    const [activeStream, setActiveStream] = useState<MediaStream | null>(null);
    const [connections, setConnections] = useState<string[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const customRoomId = searchParams.get("room");

    useEffect(() => {
        try {
            const newPeer = customRoomId ? new Peer(customRoomId) : new Peer();
            setPeer(newPeer);

            newPeer.on("open", (id) => {
                setRoomId(id);
            });

            newPeer.on("error", (err) => {
                toast.error("创建房间失败", { // 翻译: Failed to create room
                    description: err.message
                });
                router.push("/");
            });

            newPeer.on("connection", (connection) => {
                setConnections((prev) => [...prev, connection.peer]);
                connection.on("close", () => {
                    setConnections((prev) => prev.filter((peerId) => peerId !== connection.peer));
                });
            });

            return () => {
                newPeer.destroy();
            };
        } catch (error) {
            console.error("Error initializing peer:", error);
            toast.error("创建房间失败", { // 翻译: Failed to create room
                description: "请重试。" // 翻译: Please try again.
            });
            router.push("/");
        }
    }, [customRoomId, router]); // 添加 router 到依赖数组

    useEffect(() => {
        if (!peer) return;

        if (!activeStream && connections.length > 0) {
            toast.info("有新的观众连接", { // 翻译: New viewer connected
                description: "点击开始分享您的屏幕。", // 翻译: Click to start sharing your screen.
                duration: Infinity,
                action: {
                    label: "开始分享", // 翻译: Start Sharing
                    onClick: async () => {
                        try {
                            const stream = await navigator.mediaDevices.getDisplayMedia({
                                video: true,
                                audio: true
                            });
                            setActiveStream(stream);
                        } catch (err) {
                            console.error("Screen sharing error:", err);
                            toast.error("屏幕分享错误", { // 翻译: Screen sharing error
                                description: "启动屏幕分享失败。请重试。" // 翻译: Failed to start screen sharing. Please try again.
                            });
                        }
                    }
                }
            });
        } else if (activeStream) {
            connections.forEach((connection) => {
                const call = peer.call(connection, activeStream);
                // 当屏幕分享停止时
                const videoTrack = activeStream.getVideoTracks()[0];
                if (videoTrack) {
                    videoTrack.onended = () => {
                        call.close();
                        activeStream.getTracks().forEach((track) => track.stop());
                        setActiveStream(null); // 添加这行来更新状态
                    };
                }
            });
        }
    }, [peer, activeStream, connections]);

    function endSession() {
        if (activeStream) {
            activeStream.getTracks().forEach((track) => track.stop());
            setActiveStream(null);
        }
        if (peer) {
            peer.destroy();
            setPeer(null);
        }
        setConnections([]);
        setRoomId("");
        toast.info("会话已结束", { // 翻译: Session ended
            description: "您的屏幕共享会话已终止。" // 翻译: Your screen sharing session has been terminated.
        });
        router.push("/");
    }

    return (
        <div className="px-4 py-8">
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
                <Button variant="outline" asChild>
                    <Link href="/" className="flex items-center self-start">
                        <ArrowLeft />
                        返回首页 {/* 翻译: Back to Home */}
                    </Link>
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Monitor />
                            您的屏幕共享房间 {/* 翻译: Your Screen Sharing Room */}
                        </CardTitle>
                        <CardDescription>
                            与他人分享您的房间代码或链接，让他们观看您的屏幕。如果需要分享音频，请确保您使用的是 Chrome 或 Edge 浏览器，并选择分享一个标签页。 {/* 翻译: Share your room code or link with others to let them view your screen. To share audio as well, ensure you're using Chrome or Edge, and select the option to share a tab. */}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <ShareOptions roomId={roomId} />
                        <div className="bg-muted/50 flex items-center justify-between rounded-lg p-4">
                            <div className="text-muted-foreground flex items-center gap-2">
                                <Users className="size-4" />
                                <span className="text-sm">当前观众 {/* 翻译: Current Viewers */}</span>
                            </div>
                            <span className="text-lg font-semibold">{connections.length}</span>
                        </div>
                        {activeStream && (
                            <Button variant="destructive" onClick={endSession} className="self-end">
                                停止分享 {/* 翻译: Stop sharing */}
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}