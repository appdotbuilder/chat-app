<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Status
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $content
 * @property string $type
 * @property string|null $media_path
 * @property string|null $background_color
 * @property array|null $viewers
 * @property \Illuminate\Support\Carbon $expires_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Status newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Status newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Status query()
 * @method static \Illuminate\Database\Eloquent\Builder|Status whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Status whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Status whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Status whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Status whereMediaPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Status whereBackgroundColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Status whereViewers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Status whereExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Status whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Status whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Status active()
 * @method static \Database\Factories\StatusFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Status extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'content',
        'type',
        'media_path',
        'background_color',
        'viewers',
        'expires_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'viewers' => 'array',
        'expires_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the status.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include active statuses (not expired).
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('expires_at', '>', now());
    }
}