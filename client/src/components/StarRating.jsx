import { useState } from 'react';

const StarRating = ({ rating, setRating, readOnly = false }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="star-rating" style={{ display: 'flex', gap: '4px' }}>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => !readOnly && setRating(index)}
                        onMouseEnter={() => !readOnly && setHover(index)}
                        onMouseLeave={() => !readOnly && setHover(rating)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            cursor: readOnly ? 'default' : 'pointer',
                            fontSize: '1.5rem',
                            color: index <= (hover || rating) ? '#ffd700' : '#ccc',
                            padding: 0
                        }}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
