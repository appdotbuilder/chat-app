<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Status;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StatusTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_access_status_page(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('status.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('status/index'));
    }

    public function test_user_can_create_status(): void
    {
        $user = User::factory()->create();

        $statusData = [
            'content' => 'Having a great day! 🌟',
            'type' => 'text',
            'background_color' => '#25D366',
        ];

        $response = $this->actingAs($user)
            ->post(route('status.store'), $statusData);

        $response->assertRedirect(route('status.index'));
        $this->assertDatabaseHas('statuses', [
            'user_id' => $user->id,
            'content' => 'Having a great day! 🌟',
            'type' => 'text',
            'background_color' => '#25D366',
        ]);
    }

    public function test_status_expires_after_24_hours(): void
    {
        $user = User::factory()->create();

        $status = Status::factory()->create([
            'user_id' => $user->id,
            'expires_at' => now()->addHours(24),
        ]);

        $this->assertTrue($status->expires_at->isAfter(now()->addHours(23)));
        $this->assertTrue($status->expires_at->isBefore(now()->addHours(25)));
    }

    public function test_active_status_scope_only_returns_non_expired_statuses(): void
    {
        $user = User::factory()->create();

        // Create active status
        $activeStatus = Status::factory()->create([
            'user_id' => $user->id,
            'expires_at' => now()->addHours(12),
        ]);

        // Create expired status
        $expiredStatus = Status::factory()->create([
            'user_id' => $user->id,
            'expires_at' => now()->subHours(1),
        ]);

        $activeStatuses = Status::active()->get();

        $this->assertTrue($activeStatuses->contains($activeStatus));
        $this->assertFalse($activeStatuses->contains($expiredStatus));
    }
}