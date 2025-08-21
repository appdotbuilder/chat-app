import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { MessageCircle, Phone, Users, Settings, Search, Plus, Video, Mic, Send, MoreVertical, Smile, Paperclip } from 'lucide-react';

interface Conversation {
    id: number;
    type: string;
    name?: string;
    participants: Array<{
        id: number;
        name: string;
        avatar?: string;
        is_online?: boolean;
    }>;
    latest_message?: {
        content: string;
        created_at: string;
        user: {
            name: string;
        };
    };
    last_message_at?: string;
    [key: string]: unknown;
}

interface Status {
    id: number;
    content: string;
    type: string;
    user: {
        id: number;
        name: string;
        avatar?: string;
    };
    created_at: string;
    [key: string]: unknown;
}

interface Call {
    id: number;
    type: string;
    status: string;
    caller: {
        id: number;
        name: string;
    };
    receiver: {
        id: number;
        name: string;
    };
    created_at: string;
    duration?: number;
    [key: string]: unknown;
}

interface Props {
    conversations: Conversation[];
    statuses: Status[];
    calls: Call[];
    [key: string]: unknown;
}

export default function ChatIndex({ conversations, statuses, calls }: Props) {
    const [activeTab, setActiveTab] = useState<'chat' | 'status' | 'calls' | 'settings'>('chat');
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { props } = usePage();
    const auth = props.auth as { user?: { id: number; name: string } };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation) return;

        router.post(route('chat.messages.store'), {
            conversation_id: selectedConversation.id,
            content: newMessage,
            type: 'text',
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => setNewMessage(''),
        });
    };

    const getConversationName = (conversation: Conversation) => {
        if (conversation.type === 'group') {
            return conversation.name || 'Group Chat';
        }
        return conversation.participants.find(p => p.id !== auth.user?.id)?.name || 'Unknown';
    };

    const getConversationAvatar = (conversation: Conversation) => {
        if (conversation.type === 'group') {
            return conversation.participants[0]?.name?.[0] || 'G';
        }
        const otherParticipant = conversation.participants.find(p => p.id !== auth.user?.id);
        return otherParticipant?.name?.[0] || 'U';
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString();
        }
    };

    return (
        <AppShell>
            <Head title="ChatApp - Messaging" />
            
            <div className="flex h-screen bg-gray-50">
                {/* Sidebar */}
                <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-xl font-semibold text-gray-900">ChatApp</h1>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-[#25D366] focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="flex border-b border-gray-100">
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`flex-1 py-3 px-4 text-center transition-colors ${
                                activeTab === 'chat' 
                                    ? 'text-[#25D366] border-b-2 border-[#25D366]' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <MessageCircle className="w-5 h-5 mx-auto mb-1" />
                            <span className="text-xs">Chats</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('status')}
                            className={`flex-1 py-3 px-4 text-center transition-colors ${
                                activeTab === 'status' 
                                    ? 'text-[#25D366] border-b-2 border-[#25D366]' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <Users className="w-5 h-5 mx-auto mb-1" />
                            <span className="text-xs">Status</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('calls')}
                            className={`flex-1 py-3 px-4 text-center transition-colors ${
                                activeTab === 'calls' 
                                    ? 'text-[#25D366] border-b-2 border-[#25D366]' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <Phone className="w-5 h-5 mx-auto mb-1" />
                            <span className="text-xs">Calls</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`flex-1 py-3 px-4 text-center transition-colors ${
                                activeTab === 'settings' 
                                    ? 'text-[#25D366] border-b-2 border-[#25D366]' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <Settings className="w-5 h-5 mx-auto mb-1" />
                            <span className="text-xs">Settings</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                        {activeTab === 'chat' && (
                            <div>
                                {conversations.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                        <MessageCircle className="w-16 h-16 mb-4 text-gray-300" />
                                        <h3 className="font-medium mb-2">No conversations yet</h3>
                                        <p className="text-sm text-center">Start a new chat to begin messaging</p>
                                        <button className="mt-4 bg-[#25D366] text-white px-4 py-2 rounded-full hover:bg-[#20B858] transition-colors">
                                            <Plus className="w-4 h-4 inline mr-2" />
                                            New Chat
                                        </button>
                                    </div>
                                ) : (
                                    conversations.map((conversation) => (
                                        <div
                                            key={conversation.id}
                                            onClick={() => setSelectedConversation(conversation)}
                                            className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 ${
                                                selectedConversation?.id === conversation.id ? 'bg-[#25D366]/5 border-r-4 border-r-[#25D366]' : ''
                                            }`}
                                        >
                                            <div className="relative">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#25D366] to-[#20B858] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                                    {getConversationAvatar(conversation)}
                                                </div>
                                                {conversation.participants.some(p => p.is_online) && (
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                                )}
                                            </div>
                                            <div className="ml-3 flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold text-gray-900 truncate">
                                                        {getConversationName(conversation)}
                                                    </h3>
                                                    <span className="text-xs text-gray-500">
                                                        {conversation.last_message_at && formatTime(conversation.last_message_at)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {conversation.latest_message ? 
                                                        `${conversation.latest_message.user.name}: ${conversation.latest_message.content}` :
                                                        'No messages yet'
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'status' && (
                            <div className="p-4">
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Plus className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Share Your Status</h3>
                                    <p className="text-sm text-gray-500 mb-4">Let your contacts know what's on your mind</p>
                                    <button className="bg-[#25D366] text-white px-6 py-2 rounded-full hover:bg-[#20B858] transition-colors">
                                        Add Status
                                    </button>
                                </div>

                                {statuses.length > 0 && (
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Recent Updates</h4>
                                        {statuses.map((status) => (
                                            <div key={status.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#25D366] to-[#20B858] rounded-full flex items-center justify-center text-white font-semibold">
                                                    {status.user.name[0]}
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <h3 className="font-medium text-gray-900">{status.user.name}</h3>
                                                    <p className="text-sm text-gray-500">{formatDate(status.created_at)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'calls' && (
                            <div>
                                {calls.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                                        <Phone className="w-16 h-16 mb-4 text-gray-300" />
                                        <h3 className="font-medium mb-2">No calls yet</h3>
                                        <p className="text-sm text-center">Your call history will appear here</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-100">
                                        {calls.map((call) => (
                                            <div key={call.id} className="flex items-center p-4 hover:bg-gray-50">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                                                    {call.type === 'video' ? (
                                                        <Video className="w-6 h-6" />
                                                    ) : (
                                                        <Phone className="w-5 h-5" />
                                                    )}
                                                </div>
                                                <div className="ml-3 flex-1">
                                                    <h3 className="font-medium text-gray-900">
                                                        {call.caller.name === auth.user?.name ? call.receiver.name : call.caller.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {call.status === 'missed' ? '📞 Missed' : 
                                                         call.status === 'answered' ? '✅ Answered' : 
                                                         call.status === 'declined' ? '❌ Declined' : '📞 Ongoing'}
                                                        {call.duration && ` • ${Math.floor(call.duration / 60)}:${(call.duration % 60).toString().padStart(2, '0')}`}
                                                    </p>
                                                </div>
                                                <span className="text-xs text-gray-400">
                                                    {formatTime(call.created_at)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="p-4 space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-4">Account Settings</h3>
                                    <div className="space-y-3">
                                        <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                👤
                                            </div>
                                            <span className="text-gray-700">Profile</span>
                                        </button>
                                        <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                                🔐
                                            </div>
                                            <span className="text-gray-700">Privacy & Security</span>
                                        </button>
                                        <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center">
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                                🔔
                                            </div>
                                            <span className="text-gray-700">Notifications</span>
                                        </button>
                                        <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-center">
                                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                                                🌙
                                            </div>
                                            <span className="text-gray-700">Dark Mode</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col">
                    {selectedConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#25D366] to-[#20B858] rounded-full flex items-center justify-center text-white font-semibold">
                                        {getConversationAvatar(selectedConversation)}
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-gray-900">{getConversationName(selectedConversation)}</h2>
                                        <p className="text-sm text-gray-500">
                                            {selectedConversation.participants.some(p => p.is_online) ? '🟢 Online' : 'Last seen recently'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <Phone className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <Video className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-full">
                                        <MoreVertical className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100">
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                        <MessageCircle className="w-8 h-8 text-[#25D366]" />
                                    </div>
                                    <h3 className="font-medium text-gray-700 mb-2">Start a conversation</h3>
                                    <p className="text-sm text-gray-500">Messages you send will appear here</p>
                                </div>
                            </div>

                            {/* Message Input */}
                            <form onSubmit={handleSendMessage} className="flex items-center p-4 bg-white border-t border-gray-200 space-x-3">
                                <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
                                    <Paperclip className="w-5 h-5 text-gray-600" />
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="w-full px-4 py-2 pr-12 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-[#25D366] focus:bg-white"
                                    />
                                    <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full">
                                        <Smile className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                                {newMessage.trim() ? (
                                    <button 
                                        type="submit"
                                        className="p-2 bg-[#25D366] text-white rounded-full hover:bg-[#20B858] transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
                                        <Mic className="w-5 h-5 text-gray-600" />
                                    </button>
                                )}
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#25D366]/5 to-[#20B858]/5">
                            <div className="text-center">
                                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <MessageCircle className="w-16 h-16 text-[#25D366]" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to ChatApp! 👋</h2>
                                <p className="text-lg text-gray-600 mb-8 max-w-md">
                                    Select a conversation from the sidebar to start chatting, or create a new one to get started.
                                </p>
                                <button className="bg-[#25D366] text-white px-8 py-3 rounded-full hover:bg-[#20B858] transition-colors font-semibold">
                                    <Plus className="w-5 h-5 inline mr-2" />
                                    Start New Chat
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}