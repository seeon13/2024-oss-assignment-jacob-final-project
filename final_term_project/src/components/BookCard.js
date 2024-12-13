// components/BookCard.js
import React from 'react';

const BookCard = ({ book, displayType, onClick }) => {
  if (displayType === 'list') {
    return (
      <div 
        className="card bg-dark mb-3" 
        style={{cursor: 'pointer'}}
        onClick={onClick}
      >
        <div className="row g-0">
          <div className="col-md-2">
            <img 
              src={book.BOOK_IMAGE_URL} 
              className="img-fluid rounded-start"
              alt={book.BOOK_NM_INFO}
              style={{height: '200px', objectFit: 'cover'}}
            />
          </div>
          <div className="col-md-10">
            <div className="card-body">
              <h5 className="card-title text-white">{book.BOOK_NM_INFO}</h5>
              <p className="card-text text-white-50">
                저자: {book.AUTHOR_NM_INFO}
              </p>
              <p className="card-text text-white-50">
                출판사: {book.PUBLSHCMPY_NM}
              </p>
              <p className="card-text text-white-50">
                출판년도: {book.PUBLCATN_YY}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col">
      <div 
        className="card bg-dark h-100" 
        onClick={onClick}
        style={{
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img 
          src={book.BOOK_IMAGE_URL} 
          className="card-img-top"
          alt={book.BOOK_NM_INFO}
          style={{height: '300px', objectFit: 'cover'}}
        />
        <div className="card-body">
          <h5 className="card-title text-white">{book.BOOK_NM_INFO}</h5>
          <p className="card-text text-white-50">
            {book.AUTHOR_NM_INFO}
          </p>
          <p className="card-text text-white-50">
            {book.PUBLSHCMPY_NM} | {book.PUBLCATN_YY}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;