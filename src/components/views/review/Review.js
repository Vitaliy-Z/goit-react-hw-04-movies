import { useState, useEffect } from 'react';
import { fetchReviews } from '../../Api/serviceApi';
import ReviewStyle from './review.module.css';

// const STATE = { idle: 'idle', pending: 'pending', resolved: 'resolved' };

export default function Review({ movieId }) {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    fetchReviews(movieId).then(res => setReviewList(res.results));
  }, [movieId]);

  if (reviewList.length !== 0) {
    return (
      <ul className={ReviewStyle.list}>
        {reviewList.map(rev => (
          <li key={rev.id} className={ReviewStyle.item}>
            <h2 className={ReviewStyle.title}>Author: {rev.author}</h2>
            <p className={ReviewStyle.text}>{rev.content}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className={ReviewStyle.title}>
      We don't have any reviews for this movie.
    </p>
  );
}
