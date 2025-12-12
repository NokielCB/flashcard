import React from 'react';
import '../styles/study.css';

const StudyStats = ({ correct, incorrect }) => {
    const total = correct + incorrect;
    const accuracy = total > 0 ? ((correct / total) * 100).toFixed(0) : 0;

    return (
        <div className='stats-box'>
            <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ color: '#28a745', fontSize: '1.5em', fontWeight: 'bold' }}>{correct}</div>
                <div style={{ color: '#6c757d', fontSize: '0.8em' }}>Dobrze</div>
            </div>

            <div style={{ width: '1px', height: '40px', backgroundColor: '#ddd', margin: '0 10px' }}></div>
            <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ color: '#dc3545', fontSize: '1.5em', fontWeight: 'bold' }}>{incorrect}</div>
                <div style={{ color: '#6c757d', fontSize: '0.8em' }}>Źle</div>
            </div>

            <div style={{ width: '1px', height: '40px', backgroundColor: '#ddd', margin: '0 10px' }}></div>
            <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ color: '#007bff', fontSize: '1.5em', fontWeight: 'bold' }}>{accuracy}%</div>
                <div style={{ color: '#6c757d', fontSize: '0.8em' }}>Dokładność</div>
            </div>
        </div>
    );
};

export default StudyStats;