import styles from './styles.module.scss';
import formatTimeAgo from '../../helpers/formatTimeAgo';
import Image from '../Image/Image';
import PropTypes from 'prop-types';

const NewsBanners = ({ item }) => {
  console.log(item);

  return (
    <div className={styles.banner}>
      <Image image={item.image} />
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.extra}>
        {formatTimeAgo(item.published)} by {item.author}
      </p>
    </div>
  );
};

NewsBanners.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    published: PropTypes.string,
    author: PropTypes.string,
  }),
};

export default NewsBanners;
