import React, { useState } from 'react';

interface EmojiPickerProps {
    onEmojiSelect: (emoji: string) => void;
    isVisible: boolean;
    onClose: () => void;
}

export function EmojiPicker({ onEmojiSelect, isVisible, onClose }: EmojiPickerProps) {
    const [activeCategory, setActiveCategory] = useState('smileys');

    const emojiCategories = {
        smileys: {
            name: 'Smileys & People',
            icon: '😊',
            emojis: [
                '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
                '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
                '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
                '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
            ]
        },
        animals: {
            name: 'Animals & Nature',
            icon: '🐶',
            emojis: [
                '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
                '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒',
                '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇',
            ]
        },
        food: {
            name: 'Food & Drink',
            icon: '🍎',
            emojis: [
                '🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑',
                '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒',
                '🌶️', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🍞', '🥖',
            ]
        },
        activities: {
            name: 'Activities',
            icon: '⚽',
            emojis: [
                '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱',
                '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳',
                '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️',
            ]
        },
        objects: {
            name: 'Objects',
            icon: '⌚',
            emojis: [
                '⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️',
                '🗜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥',
                '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭',
            ]
        }
    };

    if (!isVisible) return null;

    return (
        <div className="absolute bottom-full right-0 mb-2 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Pick an emoji</h3>
                <button 
                    onClick={onClose}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                    ✕
                </button>
            </div>

            {/* Category tabs */}
            <div className="flex border-b border-gray-100 overflow-x-auto">
                {Object.entries(emojiCategories).map(([key, category]) => (
                    <button
                        key={key}
                        onClick={() => setActiveCategory(key)}
                        className={`flex-shrink-0 p-3 text-lg hover:bg-gray-50 ${
                            activeCategory === key ? 'bg-[#25D366]/10 border-b-2 border-[#25D366]' : ''
                        }`}
                    >
                        {category.icon}
                    </button>
                ))}
            </div>

            {/* Emoji grid */}
            <div className="p-3 h-80 overflow-y-auto">
                <div className="grid grid-cols-8 gap-1">
                    {emojiCategories[activeCategory as keyof typeof emojiCategories].emojis.map((emoji, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                onEmojiSelect(emoji);
                                onClose();
                            }}
                            className="w-8 h-8 flex items-center justify-center text-lg hover:bg-gray-100 rounded transition-colors"
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}