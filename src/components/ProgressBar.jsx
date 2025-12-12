import React from 'react';
import '../styles/study.css';
const ProgressBar = ({ current, total }) => {

    const percent = total > 0 ? (current / total) * 100 : 0;

    return (
        <div className='progress-bar-box'>
            <div className='progress-text-box'>
                <span className='progress-text'>
                    Karta {current} z {total}
                </span>
            </div>
            <div className='progress-bar-empty'>
                <div className='progress'
                    style={{
                        width: `${percent}%`,
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;