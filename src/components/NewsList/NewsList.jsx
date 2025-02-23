import PropTypes from 'prop-types';
import withSkeleton from '../../helpers/hocs/withSkeleton';
import { NewsItem } from '../NewsItem/NewsItem';
import styles from './styles.module.scss';

const NewsList = ({ news }) => {
  return (
    <ul className={styles.list}>
      {news ? (
        news.map((item) => <NewsItem key={item.id} item={item} />)
      ) : (
        <p className={styles.error}>
          Data loading error. Try to reboot the page
        </p>
      )}
    </ul>
  );
};

const NewsListWithSkeleton = withSkeleton(NewsList, 'item', 10);

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

export default NewsListWithSkeleton;
