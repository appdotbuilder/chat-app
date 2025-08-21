<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create main demo user
        User::factory()->create([
            'name' => 'Alex Johnson',
            'email' => 'alex@chatapp.com',
            'is_online' => true,
            'last_seen_at' => now(),
            'status_message' => 'Hey there! I am using ChatApp 🚀',
        ]);

        // Run the chat seeder
        $this->call(ChatSeeder::class);
    }
}
