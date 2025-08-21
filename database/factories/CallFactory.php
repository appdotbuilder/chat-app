<?php

namespace Database\Factories;

use App\Models\Call;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Call>
 */
class CallFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     */
    protected $model = Call::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(['missed', 'answered', 'declined']);
        
        return [
            'caller_id' => User::factory(),
            'receiver_id' => User::factory(),
            'type' => $this->faker->randomElement(['voice', 'video']),
            'status' => $status,
            'duration' => $status === 'answered' ? random_int(30, 3600) : null,
            'started_at' => $status === 'answered' ? $this->faker->dateTimeBetween('-1 week', 'now') : null,
            'ended_at' => $status === 'answered' ? $this->faker->dateTimeBetween('started_at', 'now') : null,
        ];
    }

    /**
     * Indicate that the call was answered.
     */
    public function answered(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'answered',
            'duration' => random_int(60, 1800),
            'started_at' => $this->faker->dateTimeBetween('-1 week', 'now'),
            'ended_at' => $this->faker->dateTimeBetween('started_at', 'now'),
        ]);
    }

    /**
     * Indicate that the call was missed.
     */
    public function missed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'missed',
            'duration' => null,
            'started_at' => null,
            'ended_at' => null,
        ]);
    }

    /**
     * Indicate that the call is a video call.
     */
    public function video(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'video',
        ]);
    }

    /**
     * Indicate that the call is a voice call.
     */
    public function voice(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'voice',
        ]);
    }
}