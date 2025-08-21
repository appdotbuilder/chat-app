<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Status;
use App\Models\Call;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    /**
     * Display the main chat interface.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get user's conversations with latest messages
        $conversations = $user ? $user->conversations()
            ->with(['participants', 'latestMessage.user'])
            ->orderByDesc('last_message_at')
            ->limit(20)
            ->get() : collect();

        // Get recent statuses from contacts (for authenticated users)
        $statuses = $user ? Status::where('expires_at', '>', now())
            ->whereIn('user_id', $user->contacts()->pluck('contact_user_id'))
            ->with('user')
            ->latest()
            ->limit(10)
            ->get() : collect();

        // Get recent calls
        $calls = $user ? Call::where(function($query) use ($user) {
                $query->where('caller_id', $user->id)
                      ->orWhere('receiver_id', $user->id);
            })
            ->with(['caller', 'receiver'])
            ->latest()
            ->limit(20)
            ->get() : collect();

        return Inertia::render('chat/index', [
            'conversations' => $conversations,
            'statuses' => $statuses,
            'calls' => $calls,
        ]);
    }

    /**
     * Show a specific conversation.
     */
    public function show(Request $request, Conversation $conversation)
    {
        $user = $request->user();
        
        // Check if user is participant in this conversation
        if (!$conversation->participants()->where('user_id', $user->id)->exists()) {
            return redirect()->route('chat.index');
        }

        // Get messages in this conversation
        $messages = $conversation->messages()
            ->with(['user', 'replyTo.user'])
            ->latest()
            ->limit(50)
            ->get()
            ->reverse()
            ->values();

        // Mark messages as read
        $conversation->participants()
            ->updateExistingPivot($user->id, ['last_read_at' => now()]);

        return Inertia::render('chat/conversation', [
            'conversation' => $conversation->load('participants'),
            'messages' => $messages,
        ]);
    }

    /**
     * Send a message in a conversation.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'content' => 'required|string|max:1000',
            'type' => 'in:text,image,video,audio,document,location,contact,gif,sticker',
            'reply_to_message_id' => 'nullable|exists:messages,id',
        ]);

        $user = $request->user();
        $conversation = Conversation::findOrFail($validated['conversation_id']);

        // Check if user is participant
        if (!$conversation->participants()->where('user_id', $user->id)->exists()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Create message
        $message = Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => $user->id,
            'content' => $validated['content'],
            'type' => $validated['type'] ?? 'text',
            'reply_to_message_id' => $validated['reply_to_message_id'] ?? null,
        ]);

        // Update conversation's last message time
        $conversation->update(['last_message_at' => now()]);

        return Inertia::render('chat/conversation', [
            'conversation' => $conversation->load('participants'),
            'messages' => $conversation->messages()
                ->with(['user', 'replyTo.user'])
                ->latest()
                ->limit(50)
                ->get()
                ->reverse()
                ->values(),
        ]);
    }
}