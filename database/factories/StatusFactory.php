<?php

namespace Database\Factories;

use App\Models\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Status>
 */
class StatusFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Status::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $textStatuses = [
            "Living my best life! ✨",
            "Coffee first, everything else second ☕",
            "Weekend vibes 🌞",
            "Grateful for today 🙏",
            "Making memories 📸",
            "Life is beautiful 🌸",
            "Blessed and thankful 💫",
            "Adventure awaits! 🗺️",
            "Stay positive 🌈",
            "Good vibes only ✌️",
        ];

        return [
            'user_id' => User::factory(),
            'content' => $this->faker->randomElement($textStatuses),
            'type' => $this->faker->randomElement(['text', 'image', 'video']),
            'media_path' => null,
            'background_color' => $this->faker->randomElement([
                '#25D366', '#FF6B6B', '#4ECDC4', '#45B7D1', 
                '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'
            ]),
            'viewers' => [],
            'expires_at' => now()->addHours(24),
        ];
    }

    /**
     * Indicate that the status has an image.
     */
    public function withImage(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'image',
            'media_path' => $this->faker->imageUrl(),
            'background_color' => null,
        ]);
    }

    /**
     * Indicate that the status has a video.
     */
    public function withVideo(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'video',
            'content' => '🎥 Video status',
            'media_path' => '/videos/status_' . $this->faker->uuid . '.mp4',
            'background_color' => null,
        ]);
    }
}