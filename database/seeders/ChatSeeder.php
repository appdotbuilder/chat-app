<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Status;
use App\Models\Call;
use App\Models\Contact;
use Illuminate\Database\Seeder;

class ChatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create demo users
        $users = User::factory()->count(10)->create([
            'is_online' => true,
            'last_seen_at' => now(),
        ]);

        // Add some offline users
        $users = $users->concat(User::factory()->count(5)->create([
            'is_online' => false,
            'last_seen_at' => now()->subMinutes(random_int(10, 1440)),
        ]));

        // Create contacts relationships
        foreach ($users->take(8) as $user) {
            $contactUsers = $users->except([$user->id])->random(random_int(3, 8));
            foreach ($contactUsers as $contactUser) {
                Contact::firstOrCreate([
                    'user_id' => $user->id,
                    'contact_user_id' => $contactUser->id,
                ], [
                    'is_favorite' => fake()->boolean(20),
                ]);
            }
        }

        // Create private conversations
        $mainUser = $users->first();
        $contacts = $users->except([$mainUser->id])->take(6);
        
        foreach ($contacts as $contact) {
            $conversation = Conversation::create([
                'type' => 'private',
                'last_message_at' => now()->subMinutes(random_int(1, 1440)),
            ]);

            // Add participants
            $conversation->participants()->attach([
                $mainUser->id => ['role' => 'member', 'joined_at' => now()],
                $contact->id => ['role' => 'member', 'joined_at' => now()],
            ]);

            // Create messages
            for ($i = 0; $i < random_int(5, 20); $i++) {
                Message::factory()->create([
                    'conversation_id' => $conversation->id,
                    'user_id' => fake()->randomElement([$mainUser->id, $contact->id]),
                    'created_at' => now()->subMinutes(random_int(1, 1440)),
                ]);
            }

            $latestMessage = $conversation->messages()->latest()->first();
            if ($latestMessage) {
                $conversation->update([
                    'last_message_at' => $latestMessage->getAttribute('created_at')
                ]);
            }
        }

        // Create group conversations
        for ($i = 0; $i < 3; $i++) {
            $conversation = Conversation::factory()->group()->create([
                'last_message_at' => now()->subMinutes(random_int(1, 1440)),
            ]);

            // Add participants including main user
            $participants = collect([$mainUser])->concat($users->except([$mainUser->id])->random(random_int(3, 8)));
            
            foreach ($participants as $participant) {
                $conversation->participants()->attach($participant->id, [
                    'role' => $participant->id === $mainUser->id ? 'admin' : 'member',
                    'joined_at' => now()->subDays(random_int(1, 30)),
                ]);
            }

            // Create group messages
            for ($j = 0; $j < random_int(10, 30); $j++) {
                Message::factory()->create([
                    'conversation_id' => $conversation->id,
                    'user_id' => $participants->random()->id,
                    'created_at' => now()->subMinutes(random_int(1, 1440)),
                ]);
            }

            $latestMessage = $conversation->messages()->latest()->first();
            if ($latestMessage) {
                $conversation->update([
                    'last_message_at' => $latestMessage->getAttribute('created_at')
                ]);
            }
        }

        // Create statuses
        foreach ($users->take(8) as $user) {
            Status::factory()->count(random_int(1, 3))->create([
                'user_id' => $user->id,
                'created_at' => now()->subHours(random_int(1, 23)),
            ]);
        }

        // Create calls
        foreach ($contacts->take(5) as $contact) {
            Call::factory()->count(random_int(1, 5))->create([
                'caller_id' => fake()->randomElement([$mainUser->id, $contact->id]),
                'receiver_id' => fake()->randomElement([$mainUser->id, $contact->id]),
                'created_at' => now()->subDays(random_int(1, 7)),
            ]);
        }
    }
}