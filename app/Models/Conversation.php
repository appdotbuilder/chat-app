<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Conversation
 *
 * @property int $id
 * @property string $type
 * @property string|null $name
 * @property string|null $description
 * @property string|null $avatar
 * @property bool $is_archived
 * @property \Illuminate\Support\Carbon|null $last_message_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Message> $messages
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $participants
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation query()
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereIsArchived($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereLastMessageAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Conversation whereId($value)
 * @method static \Database\Factories\ConversationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Conversation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'type',
        'name',
        'description',
        'avatar',
        'is_archived',
        'last_message_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_archived' => 'boolean',
        'last_message_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all messages in this conversation.
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class)->orderBy('created_at', 'asc');
    }

    /**
     * Get all participants in this conversation.
     */
    public function participants(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'conversation_participants')
                    ->withPivot(['role', 'joined_at', 'last_read_at'])
                    ->withTimestamps();
    }

    /**
     * Get the latest message in this conversation.
     */
    public function latestMessage(): HasMany
    {
        return $this->messages()->latest();
    }
}