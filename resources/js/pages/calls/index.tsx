import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Phone, Video } from 'lucide-react';

interface Call {
    id: number;
    type: string;
    status: string;
    caller: {
        name: string;
    };
    receiver: {
        name: string;
    };
    created_at: string;
    duration?: number;
}

interface Props {
    calls: {
        data: Call[];
    };
    [key: string]: unknown;
}

export default function CallsIndex({ calls }: Props) {
    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <AppShell>
            <Head title="Call History" />
            
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Call History</h1>
                
                {calls.data.length === 0 ? (
                    <div className="text-center py-8">
                        <Phone className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">No calls yet</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {calls.data.map((call) => (
                            <div key={call.id} className="bg-white p-4 rounded-lg shadow flex items-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                    {call.type === 'video' ? (
                                        <Video className="w-6 h-6 text-blue-600" />
                                    ) : (
                                        <Phone className="w-5 h-5 text-blue-600" />
                                    )}
                                </div>
                                
                                <div className="flex-1">
                                    <h3 className="font-medium">
                                        {call.caller.name} → {call.receiver.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {call.status} • {formatTime(call.created_at)}
                                        {call.duration && ` • ${Math.floor(call.duration / 60)}:${(call.duration % 60).toString().padStart(2, '0')}`}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}