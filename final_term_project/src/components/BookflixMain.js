// components/BookflixMain.js
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  // 다양한 책 목록 생성
  const popularBooks = books.slice(0, 10);
  const newBooks = books.filter(book => book.PUBLCATN_YY >= "2023");
  const recommendedBooks = books.slice(10, 20);
  
  // 주요 출판사 책들
  const majorPublisherBooks = books.filter(book => 
    ["문학동네", "창비", "민음사", "위즈덤하우스"].includes(book.PUBLSHCMPY_NM)
  ).slice(0, 10);
  
  // 베스트셀러 (임의의 기준으로 선정)
  const bestsellerBooks = books.slice(5, 15);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height:'30rem'}}>
        <div className="fs-4 text-white">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="container px-4">
      <BookCarousel title="인기 도서" books={popularBooks} onBookSelect={onBookSelect} />
      <BookCarousel title="신간 도서" books={newBooks} onBookSelect={onBookSelect} />
      <BookCarousel title="추천 도서" books={recommendedBooks} onBookSelect={onBookSelect} />
      <BookCarousel title="주요 출판사 도서" books={majorPublisherBooks} onBookSelect={onBookSelect} />
      <BookCarousel title="베스트셀러" books={bestsellerBooks} onBookSelect={onBookSelect} />
    </div>
  );
};

export default BookflixMain;