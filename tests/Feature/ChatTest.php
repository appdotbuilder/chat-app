<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_access_chat_index(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('chat.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('chat/index'));
    }

    public function test_guest_cannot_access_chat(): void
    {
        $response = $this->get(route('chat.index'));

        $response->assertRedirect(route('login'));
    }

    public function test_user_can_send_message_in_conversation(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        
        $conversation = Conversation::factory()->create();
        $conversation->participants()->attach([
            $user->id => ['role' => 'member'],
            $otherUser->id => ['role' => 'member'],
        ]);

        $messageData = [
            'conversation_id' => $conversation->id,
            'content' => 'Hello, this is a test message!',
            'type' => 'text',
        ];

        $response = $this->actingAs($user)
            ->post(route('chat.messages.store'), $messageData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('messages', [
            'conversation_id' => $conversation->id,
            'user_id' => $user->id,
            'content' => 'Hello, this is a test message!',
            'type' => 'text',
        ]);
    }

    public function test_user_cannot_send_message_to_conversation_they_are_not_part_of(): void
    {
        $user = User::factory()->create();
        $conversation = Conversation::factory()->create();

        $messageData = [
            'conversation_id' => $conversation->id,
            'content' => 'This should not work!',
            'type' => 'text',
        ];

        $response = $this->actingAs($user)
            ->post(route('chat.messages.store'), $messageData);

        $response->assertStatus(403);
    }

    public function test_conversation_last_message_time_updates_when_message_sent(): void
    {
        $user = User::factory()->create();
        $conversation = Conversation::factory()->create();
        $conversation->participants()->attach($user->id, ['role' => 'member']);

        $messageData = [
            'conversation_id' => $conversation->id,
            'content' => 'Test message',
            'type' => 'text',
        ];

        $this->actingAs($user)
            ->post(route('chat.messages.store'), $messageData);

        $conversation->refresh();
        $this->assertNotNull($conversation->last_message_at);
    }

    public function test_user_can_view_conversation_they_participate_in(): void
    {
        $user = User::factory()->create();
        $conversation = Conversation::factory()->create();
        $conversation->participants()->attach($user->id, ['role' => 'member']);

        Message::factory()->count(3)->create([
            'conversation_id' => $conversation->id,
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user)
            ->get(route('chat.show', $conversation));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('chat/conversation')
            ->has('conversation')
            ->has('messages', 3)
        );
    }

    public function test_user_cannot_view_conversation_they_do_not_participate_in(): void
    {
        $user = User::factory()->create();
        $conversation = Conversation::factory()->create();

        $response = $this->actingAs($user)
            ->get(route('chat.show', $conversation));

        $response->assertRedirect(route('chat.index'));
    }
}