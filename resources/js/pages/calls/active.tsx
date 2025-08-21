import React from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { PhoneOff, Mic, Video } from 'lucide-react';

interface Props {
    call: {
        id: number;
        type: string;
        caller: {
            name: string;
        };
        receiver: {
            name: string;
        };
    };
    [key: string]: unknown;
}

export default function ActiveCall({ call }: Props) {
    const handleEndCall = () => {
        router.put(route('calls.update', call.id), {
            status: 'answered',
            duration: 60, // Mock duration
        });
    };

    return (
        <AppShell>
            <Head title={`${call.type === 'video' ? 'Video' : 'Voice'} Call`} />
            
            <div className="fixed inset-0 bg-gradient-to-br from-green-400 to-blue-500 flex flex-col items-center justify-center text-white">
                <div className="text-center mb-8">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl font-bold">
                            {call.receiver.name[0]}
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold">{call.receiver.name}</h2>
                    <p className="text-lg opacity-80">
                        {call.type === 'video' ? 'Video calling...' : 'Calling...'}
                    </p>
                </div>
                
                <div className="flex space-x-6">
                    <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                        <Mic className="w-8 h-8" />
                    </button>
                    
                    {call.type === 'video' && (
                        <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                            <Video className="w-8 h-8" />
                        </button>
                    )}
                    
                    <button
                        onClick={handleEndCall}
                        className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                        <PhoneOff className="w-8 h-8" />
                    </button>
                </div>
            </div>
        </AppShell>
    );
}