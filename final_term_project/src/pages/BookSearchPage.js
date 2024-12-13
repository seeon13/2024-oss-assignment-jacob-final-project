// pages/BookSearchPage.js
import React, { useState } from 'react';
import { Search, BookOpen, User2, Building2 } from 'lucide-react';

const SearchTypeButton = ({ active, icon: Icon, label, onClick }) => (
  <button
    className={`btn ${active ? 'btn-danger' : 'btn-outline-light'} d-flex align-items-center gap-2`}
    onClick={onClick}
    style={{
      transition: 'all 0.3s ease',
      transform: active ? 'scale(1.05)' : 'scale(1)'
    }}
  >
    <Icon size={18} />
    <span>{label}</span>
  </button>
);

const BookQuote = ({ text, author }) => (
  <div className="text-center" style={{ opacity: 0.7 }}>
    <p className="text-white fs-5 mb-2" style={{ fontStyle: 'italic' }}>"{text}"</p>
    <p className="text-white-50">- {author}</p>
  </div>
);

const BookSearchPage = ({ onBookSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);

  // 독서 관련 명언 목록
  const quotes = [
    { text: "책은 마음의 거울이다", author: "버지니아 울프" },
    { text: "독서는 과거의 가장 현명한 사람들과의 대화이다", author: "데카르트" },
    { text: "책을 읽는다는 것은 또 다른 삶을 사는 것이다", author: "작자 미상" },
    { text: "좋은 책은 인생의 나침반이다", author: "톨스토이" },
    { text: "책은 인생의 나침반이자 등대이다", author: "에디슨" }
  ];

  // 랜덤하게 하나의 명언 선택
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setShowNoResults(false);
    try {
      const response = await fetch(
        "https://openapi.gg.go.kr/Poplitloanbook?KEY=ba7fe5b7afac4b22ad45fd9f679e9954&TYPE=json"
      );
      const data = await response.json();
      let books = data.Poplitloanbook[1].row;
      
      const filteredBooks = books.filter(book => {
        const searchTerm = searchQuery.toLowerCase();
        switch(searchType) {
          case 'title':
            return book.BOOK_NM_INFO.toLowerCase().includes(searchTerm);
          case 'author':
            return book.AUTHOR_NM_INFO.toLowerCase().includes(searchTerm);
          case 'publisher':
            return book.PUBLSHCMPY_NM.toLowerCase().includes(searchTerm);
          default:
            return false;
        }
      });
      
      setSearchResults(filteredBooks);
      setShowNoResults(filteredBooks.length === 0);
    } catch (error) {
      console.error("Error searching books:", error);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-vh-100 bg-black">
      <div className="container px-4">
        {/* Hero Section */}
        <div className="text-center mb-5 py-5">
          <h1 className="display-4 text-white mb-4">도서 검색</h1>
          <p className="lead text-white-50 mb-0">
            제목, 저자, 출판사로 원하는 도서를 찾아보세요
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-5">
          {/* Search Type Buttons */}
          <div className="d-flex justify-content-center gap-3 mb-4">
            <SearchTypeButton
              active={searchType === 'title'}
              icon={BookOpen}
              label="제목"
              onClick={() => setSearchType('title')}
            />
            <SearchTypeButton
              active={searchType === 'author'}
              icon={User2}
              label="저자"
              onClick={() => setSearchType('author')}
            />
            <SearchTypeButton
              active={searchType === 'publisher'}
              icon={Building2}
              label="출판사"
              onClick={() => setSearchType('publisher')}
            />
          </div>

          {/* Search Input */}
          <div className="d-flex justify-content-center mb-5">
            <div className="position-relative" style={{width: '100%', maxWidth: '600px'}}>
              <input 
                type="text"
                className="form-control form-control-lg bg-dark text-white border-danger"
                style={{
                  paddingLeft: '3rem',
                  paddingRight: '3rem',
                  fontSize: '1.2rem'
                }}
                placeholder={`${
                  searchType === 'title' ? '제목으로 검색...' :
                  searchType === 'author' ? '저자명으로 검색...' :
                  '출판사로 검색...'
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Search 
                className="position-absolute text-secondary"
                style={{left: '1rem', top: '50%', transform: 'translateY(-50%)'}}
              />
              {searchQuery && (
                <button
                  className="btn position-absolute"
                  style={{right: '0.5rem', top: '50%', transform: 'translateY(-50%)'}}
                  onClick={() => setSearchQuery('')}
                >
                  <span className="text-secondary">×</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : showNoResults ? (
          <div className="text-center py-5">
            <h3 className="text-white-50">검색 결과가 없습니다</h3>
            <p className="text-white-50">다른 검색어로 시도해보세요</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            {searchResults.map(book => (
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
          // 검색 결과가 없을 때 명언 표시
          <div className="d-flex align-items-center justify-content-center" style={{minHeight: '40vh'}}>
            <BookQuote text={randomQuote.text} author={randomQuote.author} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSearchPage;