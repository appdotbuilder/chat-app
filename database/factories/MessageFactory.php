<?php

namespace Database\Factories;

use App\Models\Message;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Message::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $messages = [
            "Hey! How are you doing? 😊",
            "Great! Thanks for asking 👍",
            "What are your plans for the weekend?",
            "I'm thinking of going to the movies 🎬",
            "That sounds awesome! Count me in 🙌",
            "Have you seen the latest news?",
            "Yeah, it's crazy what's happening",
            "Let's catch up soon ☕",
            "Definitely! I'd love that",
            "Hope you're having a great day! ✨",
            "Thanks! Same to you 🌟",
            "Did you finish the project?",
            "Almost done, just need to review it",
            "Let me know if you need any help",
            "Will do! Thanks for offering 🤝",
        ];

        return [
            'conversation_id' => Conversation::factory(),
            'user_id' => User::factory(),
            'content' => $this->faker->randomElement($messages),
            'type' => $this->faker->randomElement(['text', 'image', 'audio', 'gif', 'sticker']),
            'media_data' => null,
            'is_edited' => $this->faker->boolean(5),
            'is_deleted' => false,
            'is_view_once' => $this->faker->boolean(2),
            'scheduled_at' => null,
            'reply_to_message_id' => null,
            'reactions' => $this->faker->optional(0.3)->randomElements(['👍', '❤️', '😂', '😮', '😢', '🔥'], random_int(1, 3)),
        ];
    }

    /**
     * Indicate that the message is an image.
     */
    public function image(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'image',
            'content' => '📸 Image',
            'media_data' => [
                'url' => $this->faker->imageUrl(),
                'width' => 800,
                'height' => 600,
            ],
        ]);
    }

    /**
     * Indicate that the message is a voice note.
     */
    public function audio(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'audio',
            'content' => '🎵 Voice message',
            'media_data' => [
                'duration' => random_int(5, 120),
                'waveform' => array_fill(0, 50, random_int(10, 100)),
            ],
        ]);
    }
}