import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register the necessary modules
Chart.register(...registerables);

const ReviewChart = ({ reviews }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (reviews.length > 0) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const starLabels = reviews.map(review => review.rating + " Sao");
            const starCounts = reviews.map(review => review.quantity);

            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar', // Set chart type to horizontal bar
                data: {
                    labels: starLabels,
                    datasets: [{
                        label: 'Số lượng đánh giá',
                        data: starCounts,
                        backgroundColor: 'rgba(255, 165, 0, 1)'
                    }]
                },
                options: {
                    indexAxis: 'y', // Use y-axis as the index axis for horizontal chart
                    scales: {
                        x: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }
                }
            });
        }
    }, [reviews]);

    return <canvas ref={chartRef} />;
};

export default ReviewChart;