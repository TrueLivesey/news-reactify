import styles from './styles.module.scss';
import NewsBanners from '../../components/NewsBanners/NewsBanners';
import { useEffect } from 'react';
import { getNews } from '../../api/apiNews';
import { useState } from 'react';
import { NewsList } from '../../components/NewsList.jsx/NewsList';
import { Skeleton } from '../../components/Skeleton/Skeleton';

const Main = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);

        const response = await getNews();
        const news = response.news;

        setNews(news);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);

  return (
    <main className={styles.main}>
      {news.length > 0 && !isLoading ? (
        <NewsBanners item={news[0]} />
      ) : (
        <Skeleton count={1} type={'banner'} />
      )}
      {!isLoading ? <NewsList news={news} /> : <Skeleton count={10} type={'item'} />}
    </main>
  );
};

export default Main;
