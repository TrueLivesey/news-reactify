import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const Search = ({ keywords, setKeywords }) => {
  return (
    <div className={styles.search}>
      <input
        type='text'
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder='Javascript'
        className={styles.input}
      />
    </div>
  );
};

Search.propTypes = {
  keywords: PropTypes.string.isRequired,
  setKeywords: PropTypes.func.isRequired,
};
