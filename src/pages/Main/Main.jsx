import { getCategories, getNews } from '../../api/apiNews';
import { Categories } from '../../components/Categories/Categories';
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import NewsList from '../../components/NewsList/NewsList';
import { Pagination } from '../../components/Pagination/Pagination';
import { Search } from '../../components/Search/Search';
import { TOTAL_PAGES } from '../../consts/consts';
import { useFetch } from '../../helpers/hocs/useFetch';
import { useDebounce } from '../../helpers/hooks/useDebounce';
import { useFilters } from '../../helpers/hooks/useFilters';
import styles from './styles.module.scss';

const Main = () => {
  const { filters, changeFilters } = useFilters({
    page_number: 1,
    page_size: TOTAL_PAGES,
    category: null,
    keywords: '',
  });
  const debouncedKeywords = useDebounce(filters.keywords, 1500);
  const { data, isLoading } = useFetch(getNews, {
    ...filters,
    keywords: debouncedKeywords,
  });
  const { data: dataCategories } = useFetch(getCategories);

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES) {
      changeFilters('page_number', filters.page_number + 1);
    }
  };
  const handlePreviousPage = () => {
    if (filters.page_number > 1) {
      changeFilters('page_number', filters.page_number - 1);
    }
  };
  const handlePageClick = (pageNumber) => {
    changeFilters('page_number', pageNumber - 1);
  };

  return (
    <main className={styles.main}>
      {dataCategories ? (
        <Categories
          categories={dataCategories.categories}
          selectedCategory={filters.category}
          setSelectedCategory={(category) =>
            changeFilters('category', category)
          }
        />
      ) : null}

      <Search
        keywords={filters.keywords}
        setKeywords={(keywords) => changeFilters('keywords', keywords)}
      />

      <NewsBanner
        isLoading={isLoading}
        item={data && data.news && data.news[0]}
      />

      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
      />

      <NewsList isLoading={isLoading} news={data?.news} />

      <Pagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
      />
    </main>
  );
};

export default Main;
