// src/Components/FallingStars.jsx
import React from 'react';
import './FallingStars.css'; // This CSS file will contain the animation styles

const generateStars = (count = 70) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
        const style = {
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
            transform: `scale(${0.4 + Math.random() * 0.6})`,
            filter: `blur(${Math.random() * 0.7}px)`,
            opacity: 0,
        };
        stars.push(<div key={i} className="star" style={style}></div>);
    }
    return stars;
};

const FallingStars = () => {
    return (
        <div className="star-container">
            {generateStars()}
        </div>
    );
};

export default FallingStars;