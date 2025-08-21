<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Message
 *
 * @property int $id
 * @property int $conversation_id
 * @property int $user_id
 * @property string|null $content
 * @property string $type
 * @property array|null $media_data
 * @property bool $is_edited
 * @property bool $is_deleted
 * @property bool $is_view_once
 * @property \Illuminate\Support\Carbon|null $scheduled_at
 * @property string|null $reply_to_message_id
 * @property array|null $reactions
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Conversation $conversation
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Message|null $replyTo
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Message newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Message newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Message query()
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereConversationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereMediaData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereIsEdited($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereIsDeleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereIsViewOnce($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereScheduledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereReplyToMessageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereReactions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereUpdatedAt($value)
 * @method static \Database\Factories\MessageFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Message extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'conversation_id',
        'user_id',
        'content',
        'type',
        'media_data',
        'is_edited',
        'is_deleted',
        'is_view_once',
        'scheduled_at',
        'reply_to_message_id',
        'reactions',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'media_data' => 'array',
        'reactions' => 'array',
        'is_edited' => 'boolean',
        'is_deleted' => 'boolean',
        'is_view_once' => 'boolean',
        'scheduled_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the conversation that owns the message.
     */
    public function conversation(): BelongsTo
    {
        return $this->belongsTo(Conversation::class);
    }

    /**
     * Get the user that sent the message.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the message this is replying to.
     */
    public function replyTo(): BelongsTo
    {
        return $this->belongsTo(Message::class, 'reply_to_message_id');
    }
}