import React from 'react';
import { cn } from '@/lib/utils';

interface StatusRingProps {
    userName: string;
    avatar?: string;
    hasStatus?: boolean;
    isViewed?: boolean;
    className?: string;
    onClick?: () => void;
}

export function StatusRing({ 
    userName, 
    avatar, 
    hasStatus = false, 
    isViewed = false, 
    className,
    onClick 
}: StatusRingProps) {
    return (
        <div 
            className={cn("flex flex-col items-center cursor-pointer", className)}
            onClick={onClick}
        >
            <div className={cn(
                "relative",
                hasStatus && "p-0.5 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
            )}>
                <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-lg bg-gradient-to-br from-[#25D366] to-[#20B858]",
                    hasStatus && (isViewed ? "opacity-50" : ""),
                    hasStatus && "bg-white p-0.5"
                )}>
                    {hasStatus && (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#25D366] to-[#20B858] flex items-center justify-center">
                            {avatar ? (
                                <img src={avatar} alt={userName} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <span className="text-white font-semibold">{userName[0]}</span>
                            )}
                        </div>
                    )}
                    {!hasStatus && (
                        avatar ? (
                            <img src={avatar} alt={userName} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <span>{userName[0]}</span>
                        )
                    )}
                </div>
                
                {!hasStatus && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#25D366] border-3 border-white rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">+</span>
                    </div>
                )}
            </div>
            
            <span className="text-xs text-gray-600 mt-2 text-center truncate w-20">
                {hasStatus ? userName : 'My Status'}
            </span>
        </div>
    );
}