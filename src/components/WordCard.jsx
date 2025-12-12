import React from 'react';
import '../styles/words.css';

const WordCard = ({ word, targetLanguage }) => {
    const translation = word[targetLanguage] || 'Brak tłumaczenia';
    const example = (word.example && word.example[targetLanguage])
        ? word.example[targetLanguage]
        : 'Brak przykładu.';

    return (
        <div className="word-card">
            <div className="word-card-header">
                <div>
                    <h3 className="word-card-pl">{word.pl}</h3>
                    <p className="word-card-translation">
                        {translation}
                    </p>
                </div>
                <div className="word-card-details">
                    <p className="word-card-category">{word.category || 'N/A'}</p>
                    <p className="word-card-difficulty">{word.difficulty === 'hard' ? 'Trudny' : 'Łatwy'}</p>
                </div>
            </div>
            <div className="word-card-example-container">
                <p className="word-card-example-text">
                    "{example}"
                </p>
            </div>
        </div>
    );
};

export default WordCard;