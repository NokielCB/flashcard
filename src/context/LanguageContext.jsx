import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [targetLanguage, setTargetLanguage] = useState(
        localStorage.getItem("targetLang") || 'en'
    );

    useEffect(() => {
        localStorage.setItem("targetLang", targetLanguage);
    }, [targetLanguage]);

    const toggleLanguage = () => {
        setTargetLanguage(prevLang => (prevLang === 'en' ? 'es' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ targetLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
export const useLanguage = () => {
    return useContext(LanguageContext);
};