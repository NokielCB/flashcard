import React, { useState, useMemo } from 'react';
import useDailyWords from '../hooks/useDailyWords';
import { useLanguage } from '../context/LanguageContext';
import { Search } from 'lucide-react';
import WordCard from '../components/WordCard';
import '../styles/words.css';

const WordsPage = () => {
    const { targetLanguage } = useLanguage();
    const { allWords, isLoading } = useDailyWords(targetLanguage);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredWords = useMemo(() => {
        if (!searchTerm) {
            return allWords;
        }

        const lowerCaseSearch = searchTerm.toLowerCase();

        const results = allWords.filter(word =>
            (word.pl && word.pl.toLowerCase().includes(lowerCaseSearch)) ||
            (word[targetLanguage] && word[targetLanguage].toLowerCase().includes(lowerCaseSearch))
        );

        return results;

    }, [allWords, searchTerm, targetLanguage]);

    if (isLoading) {
        return <div className="words-page-loading">Ładowanie pełnej bazy słów...</div>;
    }

    return (
        <div className="words-page">
            <h2 className="words-page-title">📖 Wszystkie Fiszki</h2>
            <div className="search-bar-container">
                <Search size={20} className="search-icon" />
                <input
                    type="text"
                    placeholder={`Szukaj w języku polskim lub ${targetLanguage.toUpperCase()}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
            {filteredWords.length > 0 ? (
                <div className="words-list-container">
                    {filteredWords.map(word => (
                        <WordCard
                            key={word.id}
                            word={word}
                            targetLanguage={targetLanguage}
                        />
                    ))}
                </div>
            ) : (
                <p className="no-results-message">Brak wyników dla "{searchTerm}".</p>
            )}

            <p className="footer-stats">
                Wyświetlono {filteredWords.length} z {allWords.length} fiszek.
            </p>
        </div>
    );
};

export default WordsPage;