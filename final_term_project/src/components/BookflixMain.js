// BookflixMain.js
import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchResultsModal from './SearchResultsModal';

const BookCarousel = ({ title, books, onBookSelect }) => {
  const [startIdx, setStartIdx] = useState(0);

  const showNext = () => {
    setStartIdx(prev => Math.min(prev + 4, books.length - 4));
  };

  const showPrev = () => {
    setStartIdx(prev => Math.max(prev - 4, 0));
  };

  return (
    <div className="my-5">
      <h2 className="text-white mb-4 fs-4 fw-bold">{title}</h2>
      <div className="position-relative">
        <button 
          onClick={showPrev} 
          className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
          disabled={startIdx === 0}
        >
          <ChevronLeft className="text-white" />
        </button>
        <div className="d-flex gap-3 overflow-hidden px-5" style={{scrollBehavior:'smooth'}}>
          {books.slice(startIdx, startIdx + 4).map((book) => (
            <div
              key={`${book.RKI_NO}-${book.BOOK_NM_INFO}`}
              className="flex-shrink-0"
              style={{ width: '16rem', cursor: 'pointer', transition:'transform 0.3s'}}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
              onClick={() => onBookSelect(book)}
            >
              <img
                src={book.BOOK_IMAGE_URL}
                alt={book.BOOK_NM_INFO}
                className="img-fluid rounded"
                style={{ height: '24rem', objectFit:'cover' }}
              />
            </div>
          ))}
        </div>
        <button 
          onClick={showNext} 
          className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
          disabled={startIdx >= books.length - 4}
        >
          <ChevronRight className="text-white" />
        </button>
      </div>
    </div>
  );
};

const BookflixMain = ({ onBookSelect }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://openapi.gg.go.kr/Poplitloanbook?KEY=ba7fe5b7afac4b22ad45fd9f679e9954&TYPE=json"
        );
        const data = await response.json();
        setBooks(data.Poplitloanbook[1].row);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const popularBooks = books.slice(0, 10);
  const newBooks = books.filter(book => book.PUBLCATN_YY >= "2023");

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    const filtered = books.filter(book => 
      book.BOOK_NM_INFO && book.BOOK_NM_INFO.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleCloseSearchModal = () => {
    setSearchResults(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen text-white" style={{backgroundColor:'#000'}}>
      <style>
        {`
          .custom-placeholder::placeholder {
            color: #ccc;
          }
        `}
      </style>

      {/* Header */}
      <header className="fixed-top" style={{backgroundColor:"#000"}}>
        <div className="container d-flex align-items-center justify-content-between py-3">
          <h1 className="m-0 fw-bold" style={{fontSize:'2rem', color:'#e50914'}}>Bookflix</h1>
          <div className="d-flex align-items-center gap-4">
            <div className="input-group" style={{maxWidth:'300px'}}>
              <input 
                type="text" 
                placeholder="책 검색..."
                className="form-control bg-transparent text-white border border-secondary custom-placeholder"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
              <span className="input-group-text bg-transparent border border-secondary" onClick={handleSearch} style={{cursor:'pointer'}}>
                <Search className="text-white" />
              </span>
            </div>
            {/* My library 버튼 */}
            <button 
              className="btn p-0" 
              style={{border:'none', background:'none', color:'#fff', fontSize:'1.25rem'}} 
              onClick={() => navigate('/library')}
            >
              My library
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4" style={{ paddingTop:'5rem'}}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{height:'30rem'}}>
            <div className="fs-4">로딩 중...</div>
          </div>
        ) : (
          <>
            <BookCarousel title="인기 도서" books={popularBooks} onBookSelect={onBookSelect} />
            <BookCarousel title="신간 도서" books={newBooks} onBookSelect={onBookSelect} />
            <BookCarousel title="추천 도서" books={books.slice(10, 20)} onBookSelect={onBookSelect} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-5 py-4 border-top border-secondary">
        <div className="container text-center text-secondary">
          <p className="m-0">&copy; 2024 Bookflix. All rights reserved.</p>
        </div>
      </footer>

      {/* 검색 결과 모달 */}
      {searchResults && searchResults.length > 0 && (
        <SearchResultsModal results={searchResults} onClose={handleCloseSearchModal} />
      )}
    </div>
  );
};

export default BookflixMain;