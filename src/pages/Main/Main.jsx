import styles from './styles.module.scss';
import NewsBanners from '../../components/NewsBanners/NewsBanners';
import { useEffect } from 'react';
import { getNews } from '../../api/apiNews';
import { useState } from 'react';
import { NewsList } from '../../components/NewsList.jsx/NewsList';

const Main = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        const news = response.news;

        setNews(news);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);

  return (
    <main className={styles.main}>
      {news.length > 0 ? <NewsBanners item={news[0]} /> : null}
      <NewsList news={news} />
    </main>
  );
};

export default Main;
