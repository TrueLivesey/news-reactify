import PropTypes from 'prop-types';
import formatTimeAgo from '../../helpers/formatTimeAgo';
import withSkeleton from '../../helpers/hocs/withSkeleton';
import Image from '../Image/Image';
import styles from './styles.module.scss';

const NewsBanner = ({ item }) => {
  return (
    <div className={styles.banner}>
      <Image image={item?.image} />
      <h3 className={styles.title}>{item?.title}</h3>
      <p className={styles.extra}>
        {item ? `${formatTimeAgo(item.published)} by ${item.author}` : null}
      </p>
    </div>
  );
};

const NewsBannerWithSkeleton = withSkeleton(NewsBanner, 'banner', 1);

NewsBanner.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    published: PropTypes.string,
    author: PropTypes.string,
  }),
};

export default NewsBannerWithSkeleton;
