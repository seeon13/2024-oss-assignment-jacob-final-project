// pages/BookFilterPage.js
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const BookQuote = ({ text, author }) => (
  <div className="text-center" style={{ opacity: 0.7 }}>
    <p className="text-white fs-5 mb-2" style={{ fontStyle: 'italic' }}>"{text}"</p>
    <p className="text-white-50">- {author}</p>
  </div>
);

const quotes = [
  { 
    text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.", 
    author: "George R.R. Martin" 
  },
  { 
    text: "Reading is to the mind what exercise is to the body.", 
    author: "Joseph Addison" 
  },
  { 
    text: "Books are a uniquely portable magic.", 
    author: "Stephen King" 
  },
  { 
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", 
    author: "Dr. Seuss" 
  },
  { 
    text: "There is no friend as loyal as a book.", 
    author: "Ernest Hemingway" 
  }
];

const BookFilterPage = ({ onBookSelect }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('year');
  const [filterValue, setFilterValue] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  
  // 랜덤 명언 선택
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://openapi.gg.go.kr/Poplitloanbook?KEY=ba7fe5b7afac4b22ad45fd9f679e9954&TYPE=json"
        );
        const data = await response.json();
        const fetchedBooks = data.Poplitloanbook[1].row;
        setBooks(fetchedBooks);
        updateFilterOptions(fetchedBooks, filterType);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    updateFilterOptions(books, filterType);
    setFilterValue('');
    setFilteredBooks([]);
  }, [filterType, books]); // filterType 추가

  const updateFilterOptions = (books, type) => {
    if (!books.length) return;

    let options = new Set();
    switch (type) {
      case 'year':
        options = new Set(books.map(book => book.PUBLCATN_YY));
        break;
      case 'publisher':
        options = new Set(books.map(book => book.PUBLSHCMPY_NM));
        break;
      case 'author':
        options = new Set(books.map(book => book.AUTHOR_NM_INFO));
        break;
      default:
        break;
    }
    setFilterOptions([...options].sort());
  };

  const handleSearch = () => {
    if (!filterValue) return;

    let results = [];
    switch (filterType) {
      case 'year':
        results = books.filter(book => book.PUBLCATN_YY === filterValue);
        break;
      case 'publisher':
        results = books.filter(book => book.PUBLSHCMPY_NM === filterValue);
        break;
      case 'author':
        results = books.filter(book => book.AUTHOR_NM_INFO === filterValue);
        break;
      default:
        break;
    }
    setFilteredBooks(results);
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-black d-flex justify-content-center align-items-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-black">
      <div className="container px-4">
        <div className="text-center mb-5 py-5">
          <h1 className="display-4 text-white mb-4">도서 필터</h1>
          <p className="lead text-white-50 mb-0">
            원하는 기준으로 도서를 찾아보세요
          </p>
        </div>

        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <div className="card bg-dark border-0">
              <div className="card-body p-4">
                <div className="mb-4">
                  <div className="btn-group w-100">
                    <button 
                      className={`btn ${filterType === 'year' ? 'btn-danger' : 'btn-outline-light'}`}
                      onClick={() => setFilterType('year')}
                    >
                      출판년도
                    </button>
                    <button 
                      className={`btn ${filterType === 'publisher' ? 'btn-danger' : 'btn-outline-light'}`}
                      onClick={() => setFilterType('publisher')}
                    >
                      출판사
                    </button>
                    <button 
                      className={`btn ${filterType === 'author' ? 'btn-danger' : 'btn-outline-light'}`}
                      onClick={() => setFilterType('author')}
                    >
                      저자
                    </button>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <select 
                    className="form-select bg-dark text-white border-secondary"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    style={{ flex: 1 }}
                  >
                    <option value="">
                      {filterType === 'year' ? '출판년도 선택' :
                       filterType === 'publisher' ? '출판사 선택' : '저자 선택'}
                    </option>
                    {filterOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <button 
                    className="btn btn-danger px-4 d-flex align-items-center gap-2"
                    onClick={handleSearch}
                    disabled={!filterValue}
                  >
                    <Search size={18} />
                    검색
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            {filteredBooks.map(book => (
              <div className="col" key={book.RKI_NO}>
                <div 
                  className="card bg-dark h-100" 
                  onClick={() => onBookSelect(book)}
                  style={{
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out',
                    border: 'none'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div className="position-relative" style={{paddingTop: '150%'}}>
                    <img 
                      src={book.BOOK_IMAGE_URL} 
                      className="position-absolute top-0 start-0 w-100 h-100"
                      alt={book.BOOK_NM_INFO}
                      style={{objectFit: 'cover'}}
                    />
                  </div>
                  <div className="card-body">
                    <h6 className="card-title text-white mb-2 text-truncate">
                      {book.BOOK_NM_INFO}
                    </h6>
                    <p className="card-text text-white-50 small mb-1 text-truncate">
                      {book.AUTHOR_NM_INFO}
                    </p>
                    <p className="card-text text-white-50 small mb-0">
                      {book.PUBLCATN_YY}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center" style={{minHeight: '40vh'}}>
            <BookQuote text={randomQuote.text} author={randomQuote.author} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookFilterPage;