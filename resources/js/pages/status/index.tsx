import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Status {
    id: number;
    content: string;
    created_at: string;
    user: {
        name: string;
    };
}

interface Props {
    myStatuses: Status[];
    contactStatuses: Record<string, Status[]>;
    [key: string]: unknown;
}

export default function StatusIndex({ myStatuses, contactStatuses }: Props) {
    return (
        <AppShell>
            <Head title="Status Updates" />
            
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Status Updates</h1>
                
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">My Status</h2>
                        {myStatuses.length === 0 ? (
                            <p className="text-gray-500">No status updates</p>
                        ) : (
                            <div className="space-y-2">
                                {myStatuses.map((status) => (
                                    <div key={status.id} className="bg-white p-4 rounded-lg shadow">
                                        <p>{status.content}</p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            {new Date(status.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Recent Updates</h2>
                        {Object.keys(contactStatuses).length === 0 ? (
                            <p className="text-gray-500">No recent updates</p>
                        ) : (
                            <div className="space-y-4">
                                {Object.entries(contactStatuses).map(([userId, statuses]) => (
                                    <div key={userId}>
                                        {statuses.map((status) => (
                                            <div key={status.id} className="bg-white p-4 rounded-lg shadow">
                                                <p className="font-medium">{status.user.name}</p>
                                                <p>{status.content}</p>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    {new Date(status.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}