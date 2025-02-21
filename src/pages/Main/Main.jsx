import { useEffect, useState } from 'react';
import { getCategories, getNews } from '../../api/apiNews';
import { Categories } from '../../components/Categories/Categories';
import NewsBanners from '../../components/NewsBanners/NewsBanners';
import { NewsList } from '../../components/NewsList.jsx/NewsList';
import { Pagination } from '../../components/Pagination/Pagination';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import styles from './styles.module.scss';

const Main = () => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pageSize = 10;

  const fetchNews = async (currentPage) => {
    try {
      setIsLoading(true);

      const response = await getNews({
        page_number: currentPage,
        page_size: pageSize,
        category: selectedCategory === 'All' ? null : selectedCategory,
      });
      const news = response.news;

      setNews(news);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      const categories = response.categories;

      setCategories(['All', ...categories]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, selectedCategory]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className={styles.main}>
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {news.length > 0 && !isLoading ? (
        <NewsBanners item={news[0]} />
      ) : (
        <Skeleton count={1} type={'banner'} />
      )}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        totalPages={totalPages}
        currentPage={currentPage}
      />
      {!isLoading ? <NewsList news={news} /> : <Skeleton count={10} type={'item'} />}
      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </main>
  );
};

export default Main;
