// pages/BookListPage.js
import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const BookListPage = ({ onBookSelect }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayType, setDisplayType] = useState('grid');

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

  if (loading) {
    return (
      <div className="min-vh-100 bg-black d-flex justify-content-center align-items-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">로딩 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white">도서 목록</h2>
        <div className="btn-group">
          <button 
            className={`btn ${displayType === 'grid' ? 'btn-danger' : 'btn-dark'}`}
            style={{
              borderColor: '#e50914',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setDisplayType('grid')}
          >
            Grid
          </button>
          <button 
            className={`btn ${displayType === 'list' ? 'btn-danger' : 'btn-dark'}`}
            style={{
              borderColor: '#e50914',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setDisplayType('list')}
          >
            List
          </button>
        </div>
      </div>
      
      <div className={displayType === 'grid' ? 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4' : ''}>
        {books.map(book => (
          <div 
            key={`${book.RKI_NO}-${book.BOOK_NM_INFO}`} 
            className={displayType === 'grid' ? 'col' : 'mb-4'}
          >
            {displayType === 'grid' ? (
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
                <div style={{
                  width: '100%',
                  paddingBottom: '150%',  // 2:3 비율 유지
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={book.BOOK_IMAGE_URL} 
                    alt={book.BOOK_NM_INFO}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
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
            ) : (
              <div 
                className="card bg-dark"
                onClick={() => onBookSelect(book)}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  border: 'none'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div className="row g-0">
                  <div className="col-3 col-md-2" style={{ maxWidth: '200px' }}>
                    <div style={{
                      width: '100%',
                      paddingBottom: '150%',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={book.BOOK_IMAGE_URL}
                        alt={book.BOOK_NM_INFO}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-9 col-md-10">
                    <div className="card-body">
                      <h5 className="card-title text-white mb-3">{book.BOOK_NM_INFO}</h5>
                      <p className="card-text text-white-50 mb-2">저자: {book.AUTHOR_NM_INFO}</p>
                      <p className="card-text text-white-50 mb-2">출판사: {book.PUBLSHCMPY_NM}</p>
                      <p className="card-text text-white-50">출판년도: {book.PUBLCATN_YY}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListPage;