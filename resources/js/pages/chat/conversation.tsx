import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Message {
    id: number;
    content: string;
    user: {
        name: string;
    };
}

interface Conversation {
    name?: string;
}

interface Props {
    conversation: Conversation;
    messages: Message[];
    [key: string]: unknown;
}

export default function Conversation({ conversation, messages }: Props) {
    return (
        <AppShell>
            <Head title={`Chat - ${conversation.name || 'Conversation'}`} />
            
            <div className="flex h-screen bg-gray-50">
                <div className="flex-1 flex flex-col">
                    <div className="p-4 bg-white border-b">
                        <h1 className="text-xl font-semibold">
                            {conversation.name || 'Conversation'}
                        </h1>
                    </div>
                    
                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map((message) => (
                            <div key={message.id} className="mb-4">
                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                    <p className="text-sm font-medium text-gray-600">
                                        {message.user.name}
                                    </p>
                                    <p className="text-gray-900">{message.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}