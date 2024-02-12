import React, { useEffect, useState } from 'react';

import './ModelRating.css';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';
import { useNavigate } from 'react-router-dom';

const ModelRating = ({ to, profile }) => {
    const [likeState, setLikeState] = useState(false);
    const [dislikeState, setDislikeState] = useState(false);
    const navigate = useNavigate();

    const handleClick = (rating) => {
        // rating: 1 = positive, -1 = negative
        
        if (!profile) {
            navigate('/login')
        }

        
    }

    useEffect(() => {
        if (profile) {
            const ratings = JSON.parse(profile.ratings);
            
            for (const model of ratings) {
                if (model.id === to) {
    
                    if (model.positive > 0) {
                        setLikeState(true);
                        break;
                    }
    
                    setDislikeState(true);
    
                    break;
                }
            }
        }

    }, [likeState, dislikeState, profile, to])

    return (
        <div className='rating-container'>
            <p>Rate the model:</p>
            <div className='rating-button'>
                <img src={like} alt='like icon'/>
                <button className={likeState ? 'like-button' : ''} onClick={() => handleClick(1)}>
                    Like
                </button>
            </div>
            <div className='rating-button'>
                <img src={dislike} alt='dislike icon'/>
                <button className={dislikeState ? 'dislike-button' : ''} onClick={() => handleClick(-1)}>
                    Dislike
                </button>
            </div>
        </div>
    );
}

export default ModelRating;