import React from 'react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
    message: string;
    isOwnMessage: boolean;
    timestamp: string;
    userName?: string;
    reactions?: string[];
    isEdited?: boolean;
    replyTo?: {
        user: string;
        content: string;
    };
    type?: 'text' | 'image' | 'audio' | 'video' | 'document' | 'gif' | 'sticker';
}

export function ChatBubble({
    message,
    isOwnMessage,
    timestamp,
    userName,
    reactions,
    isEdited,
    replyTo,
    type = 'text'
}: ChatBubbleProps) {
    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const renderMessageContent = () => {
        switch (type) {
            case 'image':
                return (
                    <div className="space-y-2">
                        <div className="w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">📸</span>
                        </div>
                        <p className="text-sm">{message}</p>
                    </div>
                );
            case 'audio':
                return (
                    <div className="flex items-center space-x-3 min-w-48">
                        <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            ▶️
                        </button>
                        <div className="flex-1">
                            <div className="flex space-x-1 mb-1">
                                {Array.from({ length: 20 }, (_, i) => (
                                    <div 
                                        key={i} 
                                        className="w-1 bg-white/60 rounded"
                                        style={{ height: `${Math.random() * 20 + 4}px` }}
                                    />
                                ))}
                            </div>
                            <span className="text-xs opacity-75">0:45</span>
                        </div>
                    </div>
                );
            case 'gif':
                return (
                    <div className="space-y-2">
                        <div className="w-40 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">GIF</span>
                        </div>
                        <p className="text-sm">{message}</p>
                    </div>
                );
            case 'sticker':
                return (
                    <div className="w-24 h-24 flex items-center justify-center text-4xl">
                        😊
                    </div>
                );
            default:
                return <p>{message}</p>;
        }
    };

    return (
        <div className={cn(
            "flex mb-4",
            isOwnMessage ? "justify-end" : "justify-start"
        )}>
            <div className={cn(
                "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm relative",
                isOwnMessage 
                    ? "bg-[#25D366] text-white rounded-tr-md" 
                    : "bg-white text-gray-900 rounded-tl-md border border-gray-100"
            )}>
                {/* Reply indicator */}
                {replyTo && (
                    <div className={cn(
                        "border-l-4 pl-3 mb-2 text-sm opacity-75",
                        isOwnMessage ? "border-white/30" : "border-[#25D366]"
                    )}>
                        <p className="font-medium text-xs">{replyTo.user}</p>
                        <p className="truncate">{replyTo.content}</p>
                    </div>
                )}

                {/* Group message sender */}
                {!isOwnMessage && userName && (
                    <p className="text-xs font-medium text-[#25D366] mb-1">{userName}</p>
                )}

                {/* Message content */}
                {renderMessageContent()}

                {/* Message info */}
                <div className={cn(
                    "flex items-center justify-end space-x-1 mt-1",
                    type === 'sticker' ? 'absolute bottom-1 right-1 bg-black/20 rounded px-1' : ''
                )}>
                    {isEdited && (
                        <span className={cn(
                            "text-xs opacity-60",
                            type === 'sticker' ? 'text-white' : ''
                        )}>edited</span>
                    )}
                    <span className={cn(
                        "text-xs opacity-60",
                        type === 'sticker' ? 'text-white' : ''
                    )}>
                        {formatTime(timestamp)}
                    </span>
                    {isOwnMessage && (
                        <span className={cn(
                            "text-xs opacity-60",
                            type === 'sticker' ? 'text-white' : ''
                        )}>
                            ✓✓
                        </span>
                    )}
                </div>

                {/* Reactions */}
                {reactions && reactions.length > 0 && (
                    <div className="absolute -bottom-2 left-4 bg-white border border-gray-200 rounded-full px-2 py-1 flex space-x-1 shadow-sm">
                        {reactions.map((reaction, index) => (
                            <span key={index} className="text-sm">{reaction}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}