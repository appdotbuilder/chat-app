<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Call
 *
 * @property int $id
 * @property int $caller_id
 * @property int $receiver_id
 * @property string $type
 * @property string $status
 * @property int|null $duration
 * @property \Illuminate\Support\Carbon|null $started_at
 * @property \Illuminate\Support\Carbon|null $ended_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $caller
 * @property-read \App\Models\User $receiver
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Call newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Call newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Call query()
 * @method static \Illuminate\Database\Eloquent\Builder|Call whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Call whereCallerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Call whereReceiverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Call whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Call whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Call whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Call whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Call whereEndedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Call whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Call whereUpdatedAt($value)
 * @method static \Database\Factories\CallFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Call extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'caller_id',
        'receiver_id',
        'type',
        'status',
        'duration',
        'started_at',
        'ended_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'duration' => 'integer',
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user who made the call.
     */
    public function caller(): BelongsTo
    {
        return $this->belongsTo(User::class, 'caller_id');
    }

    /**
     * Get the user who received the call.
     */
    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}