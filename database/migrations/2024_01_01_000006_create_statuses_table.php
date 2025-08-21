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
        Schema::create('statuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('content')->nullable();
            $table->enum('type', ['text', 'image', 'video'])->default('text');
            $table->string('media_path')->nullable();
            $table->string('background_color')->nullable()->comment('For text statuses');
            $table->json('viewers')->nullable()->comment('List of users who viewed this status');
            $table->timestamp('expires_at')->comment('Status expires after 24 hours');
            $table->timestamps();
            
            $table->index(['user_id', 'expires_at']);
            $table->index('expires_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statuses');
    }
};