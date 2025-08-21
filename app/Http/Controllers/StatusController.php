<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatusController extends Controller
{
    /**
     * Display statuses.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get user's own statuses
        $myStatuses = $user ? $user->statuses()->where('expires_at', '>', now())->latest()->get() : collect();
        
        // Get statuses from contacts
        $contactStatuses = $user ? Status::where('expires_at', '>', now())
            ->whereIn('user_id', $user->contacts()->pluck('contact_user_id'))
            ->with('user')
            ->latest()
            ->get()
            ->groupBy('user_id') : collect();

        return Inertia::render('status/index', [
            'myStatuses' => $myStatuses,
            'contactStatuses' => $contactStatuses,
        ]);
    }

    /**
     * Store a new status.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:500',
            'type' => 'in:text,image,video',
            'background_color' => 'nullable|string|max:7',
        ]);

        $user = $request->user();

        Status::create([
            'user_id' => $user->id,
            'content' => $validated['content'],
            'type' => $validated['type'] ?? 'text',
            'background_color' => $validated['background_color'],
            'expires_at' => now()->addHours(24),
        ]);

        return redirect()->route('status.index');
    }
}