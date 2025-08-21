<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Call;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CallController extends Controller
{
    /**
     * Display call history.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $calls = $user ? Call::where(function($query) use ($user) {
                $query->where('caller_id', $user->id)
                      ->orWhere('receiver_id', $user->id);
            })
            ->with(['caller', 'receiver'])
            ->latest()
            ->paginate(50) : collect();

        return Inertia::render('calls/index', [
            'calls' => $calls,
        ]);
    }

    /**
     * Initiate a call.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'type' => 'required|in:voice,video',
        ]);

        $user = $request->user();

        $call = Call::create([
            'caller_id' => $user->id,
            'receiver_id' => $validated['receiver_id'],
            'type' => $validated['type'],
            'status' => 'ongoing',
            'started_at' => now(),
        ]);

        return Inertia::render('calls/active', [
            'call' => $call->load(['caller', 'receiver']),
        ]);
    }

    /**
     * End a call.
     */
    public function update(Request $request, Call $call)
    {
        $validated = $request->validate([
            'status' => 'required|in:answered,declined,missed',
            'duration' => 'nullable|integer|min:0',
        ]);

        $call->update([
            'status' => $validated['status'],
            'duration' => $validated['duration'],
            'ended_at' => now(),
        ]);

        return redirect()->route('calls.index');
    }
}