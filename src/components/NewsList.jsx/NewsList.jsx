import styles from './styles.module.scss';
import { NewsItem } from '../NewsItem/NewsItem';
import PropTypes from 'prop-types';

export const NewsList = ({ news }) => {
  return (
    <ul className={styles.list}>
      {news.map((item) => {
        return <NewsItem key={item.id} item={item} />;
      })}
    </ul>
  );
};

NewsList.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string,
      title: PropTypes.string,
      published: PropTypes.string,
      author: PropTypes.string,
    }),
  ).isRequired,
};
