import { useState } from 'react';
import '../styles/study.css';
import { useLanguage } from '../context/LanguageContext';
import useDailyWords from '../hooks/useDailyWords';
import FlashCard from '../components/FlashCard';
import ProgressBar from '../components/ProgressBar';
import { X, Check } from 'lucide-react';
import StudyStats from '../components/StudyStats';

const Study = () => {
    const { targetLanguage } = useLanguage();
    const { dailyWords, isLoading, totalCards } = useDailyWords(targetLanguage);
    const [completedCards, setCompletedCards] = useState(0);
    const [isCurrentCardFlipped, setIsCurrentCardFlipped] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);

    const saveGlobalStats = (correct, incorrect) => {
        try {
            const currentStats = JSON.parse(localStorage.getItem('globalStats')) || {
                totalCorrect: 0,
                totalIncorrect: 0,
            };

            currentStats.totalCorrect += correct;
            currentStats.totalIncorrect += incorrect;
            localStorage.setItem('globalStats', JSON.stringify(currentStats));

            const streakData = JSON.parse(localStorage.getItem('streakData')) || { count: 0, lastDate: null };
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (streakData.lastDate === yesterdayStr) {
                streakData.count += 1;
                streakData.lastDate = today;
            } else {
                streakData.count = 1;
                streakData.lastDate = today;
            }
            localStorage.setItem('streakData', JSON.stringify(streakData));

        } catch (error) {
            console.error("Błąd zapisu statystyk:", error);
        }
    };

    const saveWeeklyProgress = (totalWords) => {
        const todayKey = new Date().toISOString().split('T')[0];
        try {
            const currentProgress = JSON.parse(localStorage.getItem('weeklyProgress')) || {};
            currentProgress[todayKey] = (currentProgress[todayKey] || 0) + totalWords;
            localStorage.setItem('weeklyProgress', JSON.stringify(currentProgress));
        } catch (error) {
            console.error("Błąd zapisu tygodniowego postępu:", error);
        }
    };

    const currentWord = dailyWords.length > completedCards ? dailyWords[completedCards] : null;

    const handleCardFlip = () => {
        setIsCurrentCardFlipped(prev => !prev);
    };

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
        } else {
            setIncorrectCount(prev => prev + 1);
        }
        if (completedCards < totalCards) {
            setCompletedCards(completedCards + 1);
            setIsCurrentCardFlipped(false);
        }
    };

    const handleResetStudy = () => {
        saveGlobalStats(correctCount, incorrectCount);
        saveWeeklyProgress(correctCount + incorrectCount);
        setCompletedCards(0);
        setIsCurrentCardFlipped(false);
        setCorrectCount(0);
        setIncorrectCount(0);
    };

    if (isLoading || (dailyWords.length === 0 && !isLoading)) {
        return <div style={{ textAlign: 'center', fontSize: '1.2em' }}>
            {isLoading ? 'Ładowanie fiszek na dziś...' : 'Brak fiszek w zestawie!'}
        </div>;
    }

    if (completedCards >= totalCards || !currentWord) {
        return (
            <div style={{ textAlign: 'center' }}>
                <h2>🎉 Zestaw Ukończony!</h2>
                {correctCount < 7 ? <p>Spróbuj jeszcze raz. To dopiero początek twojej nauki! </p> : <p>Gratulacje, nauczyłeś się dzisiejszych {correctCount} słówek.</p>}

                <StudyStats correct={correctCount} incorrect={incorrectCount} />

                <button className='again-button' onClick={handleResetStudy}>
                    Powtórz jeszcze raz
                </button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

            <ProgressBar current={completedCards + 1} total={totalCards} />

            <FlashCard
                word={currentWord}
                onFlip={handleCardFlip}
                targetLanguage={targetLanguage}
                isFlipped={isCurrentCardFlipped}
            />
            <div style={{ display: 'flex', gap: '20px', marginTop: '30px', width: '100%' }}>
                <button onClick={() => handleAnswer(false)} className='dont-know-button'>
                    <X /> Nie znam
                </button>
                <button className='know-button' onClick={() => handleAnswer(true)}>
                    <Check /> Znam
                </button>
            </div>

            <StudyStats correct={correctCount} incorrect={incorrectCount} />
        </div>
    );
};

export default Study;