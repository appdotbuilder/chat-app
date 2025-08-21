<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('content')->nullable();
            $table->enum('type', ['text', 'image', 'video', 'audio', 'document', 'location', 'contact', 'gif', 'sticker'])->default('text');
            $table->json('media_data')->nullable()->comment('Store media file paths, dimensions, etc.');
            $table->boolean('is_edited')->default(false);
            $table->boolean('is_deleted')->default(false);
            $table->boolean('is_view_once')->default(false);
            $table->timestamp('scheduled_at')->nullable();
            $table->string('reply_to_message_id')->nullable();
            $table->json('reactions')->nullable()->comment('Store message reactions');
            $table->timestamps();
            
            $table->index(['conversation_id', 'created_at']);
            $table->index(['user_id', 'created_at']);
            $table->index('scheduled_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};