import { Outlet } from "react-router-dom";
import '../index.css';
import { ES, GB } from "country-flag-icons/react/3x2";
import Navigation from "./Navigation";
import { BookOpen } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Layout() {
    const { targetLanguage, toggleLanguage } = useLanguage();

    const currentFlag = targetLanguage === 'en' ? <GB title="English" className="flags" /> : <ES title="Spanish" className="flags" />;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', width: '100vw', position: 'relative' }}>
            <div className='wrapper-box'>
                <div className='wrapper'>
                    <button className='flags-container' onClick={toggleLanguage}> {currentFlag} </button>
                    <div className="website-title-box" style={{ marginTop: '20px' }}>
                        <BookOpen size={50} color="#4e38f5" />
                        <h1 className="website-title">Codziene Fiszki</h1>
                    </div>
                    <p className="under-title">Codzienna nauka 10 nowych słówek</p>
                </div>
                <Navigation />
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Outlet key={targetLanguage} />
                </div>
            </div>
        </div>
    );
}