// components/BookDetailModal.js
import React, { useEffect } from 'react';

const BookDetailModal = ({ book, onClose, similarBooks }) => {
  useEffect(() => {
    // 모달이 열릴 때 body의 스크롤 막기
    document.body.style.overflow = 'hidden';
    
    // 모달이 닫힐 때 스크롤 복원
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!book) return null;

  return (
    <>
      <div className="modal-backdrop show" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}></div>
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content bg-dark text-white p-4">
            <div className="modal-header border-0">
              <h5 className="modal-title fs-1 fw-bold">{book.BOOK_NM_INFO}</h5>
            </div>
            <div className="modal-body d-flex" style={{gap: '3rem', minHeight:'300px'}}>
              <div className="flex-shrink-0" style={{flex:'0 0 40%'}}>
                <img 
                  src={book.BOOK_IMAGE_URL} 
                  alt={book.BOOK_NM_INFO} 
                  style={{
                    width:'100%', 
                    height:'100%', 
                    objectFit:'cover', 
                    borderRadius:'.25rem'
                  }}
                />
              </div>
              <div className="d-flex flex-column justify-content-center" style={{flex:'1', gap:'1rem'}}>
                <p className="fs-3"><span className="fw-bold">저자:</span> {book.AUTHOR_NM_INFO}</p>
                <p className="fs-3"><span className="fw-bold">출판사:</span> {book.PUBLSHCMPY_NM}</p>
                <p className="fs-3"><span className="fw-bold">출판년도:</span> {book.PUBLCATN_YY}</p>
                {book.VOLM_CNT && (
                  <p className="fs-3"><span className="fw-bold">권수:</span> {book.VOLM_CNT}</p>
                )}
              </div>
            </div>
            <div className="modal-footer border-0">
              <button 
                type="button" 
                className="btn btn-secondary fs-5" 
                style={{color:'#e50914', backgroundColor:'#000', border:'none'}} 
                onClick={onClose}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetailModal;