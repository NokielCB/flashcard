import { useState, useEffect, useMemo } from 'react';
import seedrandom from 'seedrandom';

const WORDS_PER_DAY = 10;
const API_URL = '/words.json';

//Ai pomogło
const shuffleArray = (array, rng) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const useDailyWords = (targetLanguage) => {
    const [allWords, setAllWords] = useState([]);
    const [dailyWords, setDailyWords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const seedString = useMemo(() => {
        const today = new Date();
        return today.toISOString().slice(0, 10);
    }, []);

    useEffect(() => {
        setIsLoading(true);

        const fetchDataAndShuffle = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Błąd HTTP: ${response.status}`);
                }
                const data = await response.json();
                const baseWords = data.words || [];

                setAllWords(baseWords);

                if (baseWords.length === 0) {
                    setDailyWords([]);
                    setIsLoading(false);
                    return;
                }
                const rng = seedrandom(seedString);
                const shuffledWords = shuffleArray(baseWords, rng);
                const selectedWords = shuffledWords.slice(0, WORDS_PER_DAY);

                setDailyWords(selectedWords);
            } catch (error) {
                console.error("Błąd ładowania danych bazowych:", error);
                setDailyWords([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDataAndShuffle();
    }, [seedString, targetLanguage]);

    return {
        dailyWords,
        allWords,
        isLoading,
        totalCards: Math.min(dailyWords.length, WORDS_PER_DAY)
    };
};

export default useDailyWords;