<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Call;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CallTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_access_calls_page(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('calls.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('calls/index'));
    }

    public function test_user_can_initiate_call(): void
    {
        $caller = User::factory()->create();
        $receiver = User::factory()->create();

        $callData = [
            'receiver_id' => $receiver->id,
            'type' => 'voice',
        ];

        $response = $this->actingAs($caller)
            ->post(route('calls.store'), $callData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('calls', [
            'caller_id' => $caller->id,
            'receiver_id' => $receiver->id,
            'type' => 'voice',
            'status' => 'ongoing',
        ]);
    }

    public function test_user_can_end_call(): void
    {
        $caller = User::factory()->create();
        $receiver = User::factory()->create();
        
        $call = Call::factory()->create([
            'caller_id' => $caller->id,
            'receiver_id' => $receiver->id,
            'status' => 'ongoing',
        ]);

        $updateData = [
            'status' => 'answered',
            'duration' => 120,
        ];

        $response = $this->actingAs($caller)
            ->put(route('calls.update', $call), $updateData);

        $response->assertRedirect(route('calls.index'));
        $this->assertDatabaseHas('calls', [
            'id' => $call->id,
            'status' => 'answered',
            'duration' => 120,
        ]);
        
        $call->refresh();
        $this->assertNotNull($call->ended_at);
    }

    public function test_call_history_shows_user_calls(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        // Create calls where user is caller
        Call::factory()->count(2)->create([
            'caller_id' => $user->id,
            'receiver_id' => $otherUser->id,
        ]);

        // Create calls where user is receiver
        Call::factory()->count(3)->create([
            'caller_id' => $otherUser->id,
            'receiver_id' => $user->id,
        ]);

        // Create call not involving user
        Call::factory()->create();

        $response = $this->actingAs($user)->get(route('calls.index'));

        $response->assertInertia(fn ($page) => $page
            ->component('calls/index')
            ->has('calls.data', 5) // Should have 5 calls (2 + 3)
        );
    }

    public function test_video_call_can_be_created(): void
    {
        $caller = User::factory()->create();
        $receiver = User::factory()->create();

        $callData = [
            'receiver_id' => $receiver->id,
            'type' => 'video',
        ];

        $response = $this->actingAs($caller)
            ->post(route('calls.store'), $callData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('calls', [
            'caller_id' => $caller->id,
            'receiver_id' => $receiver->id,
            'type' => 'video',
        ]);
    }
}