import React from 'react';

const FlashCard = ({ word, onFlip, targetLanguage, isFlipped }) => {
    const translation = word[targetLanguage] || 'Brak tłumaczenia';
    const example = targetLanguage === 'en' ? word.example.en : word.example.es;

    const handleFlip = () => {
        onFlip();
    };

    return (
        <div
            onClick={handleFlip}
            className="flashcard"
            style={{
                backgroundColor: isFlipped ? '#f0f8ff' : '#ffffff',
            }}
        >
            {isFlipped ? (
                <div>
                    <h3 style={{ color: '#007bff', margin: '0 0 10px 0' }}>{translation}</h3>
                    <p style={{ fontStyle: 'italic', color: '#666' }}>
                        "{example}"
                    </p>
                    <small>Kategoria: {word.category} | Poziom: {word.difficulty === 'hard' ? 'Trudny' : 'Łatwy'}</small>
                </div>
            ) : (
                <div>
                    <h2 style={{ color: '#333', margin: '0' }}>{word.pl}</h2>
                    <p style={{ color: '#999', marginTop: '15px' }}>Kliknij, aby sprawdzić!</p>
                </div>
            )}
        </div>
    );
};

export default FlashCard;