import styles from './styles.module.scss';
import formatTimeAgo from '../../helpers/formatTimeAgo';
import PropTypes from 'prop-types';

export const NewsItem = ({ item }) => {
  return (
    <li className={styles.item}>
      <div className={styles.wrapper} style={{ backgroundImage: `url(${item.image})` }}></div>
      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.extra}>
          {formatTimeAgo(item.published)} by {item.author}
        </p>
      </div>
    </li>
  );
};

NewsItem.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    published: PropTypes.string,
    author: PropTypes.string,
  }),
};
