import { useState, useEffect } from 'react';
import { fetchInformationAboutCast } from '../../Api/serviceApi';
import castStyle from './cast.module.css';

export default function Cast({ movieId }) {
  const [castList, setCastList] = useState(null);

  useEffect(() => {
    fetchInformationAboutCast(movieId).then(res => setCastList(res.cast));
  }, [movieId]);

  return (
    <>
      <ul className={castStyle.list}>
        {castList &&
          castList.map(cast => (
            <li key={cast.cast_id} className={castStyle.item}>
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/555px-Noimage.svg.png'
                }
                alt={cast.name}
                className={castStyle.image}
              />
              <p>
                Name: <span className={castStyle.text}>{cast.name}</span>
              </p>
              <p>
                Character:{' '}
                <span className={castStyle.text}>{cast.character}</span>
              </p>
            </li>
          ))}
      </ul>
    </>
  );
}
