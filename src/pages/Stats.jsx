import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import '../styles/stats.css';

const StatsPage = () => {

    const [globalStats] = useState(() => {
        return JSON.parse(localStorage.getItem('globalStats')) || { totalCorrect: 0, totalIncorrect: 0 };
    });

    const [streak] = useState(() => {
        const storedStreak = JSON.parse(localStorage.getItem('streakData')) || { count: 0, lastDate: null };

        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        if (storedStreak.lastDate !== today && storedStreak.lastDate !== yesterdayStr) {
            return 0;
        }
        return storedStreak.count;
    });

    const chartRef = useRef(null);

    const totalWords = globalStats.totalCorrect + globalStats.totalIncorrect;
    const accuracy = totalWords > 0
        ? Math.round((globalStats.totalCorrect / totalWords) * 100)
        : 0;

    const drawChart = useCallback((container, correct, incorrect) => {
        if (!container || (correct === 0 && incorrect === 0)) return;

        d3.select(container).select("svg").remove();

        const data = [
            { label: 'Znam', value: correct, color: '#4e38f5' },
            { label: 'Nie znam', value: incorrect, color: '#e6ecff' }
        ];

        const size = 250;
        const radius = size / 2;

        const svg = d3.select(container)
            .append("svg")
            .attr("viewBox", `0 0 ${size} ${size}`)
            .append("g")
            .attr("transform", `translate(${radius}, ${radius})`);

        const pie = d3.pie().value(d => d.value).sort(null);
        const arc = d3.arc().innerRadius(75).outerRadius(radius);

        svg.selectAll("path")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", d => d.data.color)
            .attr("stroke", "#fff")
            .style("stroke-width", "4px")
            .transition()
            .duration(1000)
            .attrTween("d", function (d) {
                const i = d3.interpolate(d.startAngle, d.endAngle);
                return t => { d.endAngle = i(t); return arc(d); };
            });

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .style("font-size", "28px")
            .style("font-weight", "bold")
            .style("fill", "#4e38f5")
            .text(`${accuracy}%`);
    }, [accuracy]);
    useEffect(() => {
        if (chartRef.current) {
            drawChart(chartRef.current, globalStats.totalCorrect, globalStats.totalIncorrect);
        }
    }, [globalStats, drawChart]);

    return (
        <div className="stats-page-container">

            <div className="overall-stats-panel">
                <div className="stat-card">
                    <h3 style={{ color: '#4e38f5' }}>{totalWords}</h3>
                    <p>Powtórzone fiszki</p>
                </div>
                <div className="stat-card">
                    {accuracy > 50 ? (
                        <h3 style={{ color: '#009e5cff' }}>{accuracy}%</h3>
                    ) : (
                        <h3 style={{ color: '#bd1c1cff' }}>{accuracy}%</h3>
                    )}
                    <p>Skuteczność</p>
                </div>
                <div className="stat-card">
                    <h3 style={{ color: '#ff9800' }}>{streak}</h3>
                    <p>Dni z rzędu</p>
                </div>
            </div>

            {totalWords > 0 ? (
                <div className="chart-section">
                    <div className='legend'>
                        <h3>Legenda</h3>
                        <div>
                            <div className="legend-item">
                                <span className="legend-color known"></span>
                                <div className="legend-info">
                                    <span className="legend-label">Znam</span>
                                </div>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color unknown"></span>
                                <div className="legend-info">
                                    <span className="legend-label">Nie znam</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={chartRef} className="d3-chart-container">
                    </div>
                </div>
            ) : (
                <div className="no-data-card">
                    <p>Tutaj pojawią się Twoje statystyki, gdy ukończysz pierwszą sesję nauki!</p>
                </div>
            )}
        </div>
    );
};

export default StatsPage;