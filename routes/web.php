<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\CallController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return auth()->check() ? 
        redirect()->route('chat.index') : 
        Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('chat.index');
    })->name('dashboard');

    // Chat routes
    Route::controller(ChatController::class)->group(function () {
        Route::get('/chat', 'index')->name('chat.index');
        Route::get('/chat/{conversation}', 'show')->name('chat.show');
        Route::post('/chat/messages', 'store')->name('chat.messages.store');
    });

    // Status routes
    Route::controller(StatusController::class)->group(function () {
        Route::get('/status', 'index')->name('status.index');
        Route::post('/status', 'store')->name('status.store');
    });

    // Call routes
    Route::controller(CallController::class)->group(function () {
        Route::get('/calls', 'index')->name('calls.index');
        Route::post('/calls', 'store')->name('calls.store');
        Route::put('/calls/{call}', 'update')->name('calls.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
