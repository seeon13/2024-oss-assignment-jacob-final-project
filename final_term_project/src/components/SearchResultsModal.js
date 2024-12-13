// SearchResultsModal.js
import React from 'react';

const SearchResultsModal = ({ results, onClose }) => {
  return (
    <>
      <div className="modal-backdrop show" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}></div>

      <div className="modal show fade" tabIndex="-1" role="dialog" style={{ display:'block' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content bg-dark text-white" style={{maxHeight:'80vh', display:'flex', flexDirection:'column'}}>
            <div className="modal-header border-0">
              <h5 className="modal-title fs-2 fw-bold">검색 결과</h5>
            </div>
            <div className="modal-body overflow-auto" style={{flex:'1'}}>
              {results.map((book) => (
                <div 
                  key={`${book.RKI_NO}-${book.BOOK_NM_INFO}`} 
                  className="d-flex gap-4 mb-5" 
                  style={{alignItems:'center'}}
                >
                  <div style={{width:'16rem', flex:'0 0 16rem'}}>
                    <img
                      src={book.BOOK_IMAGE_URL}
                      alt={book.BOOK_NM_INFO}
                      className="img-fluid rounded"
                      style={{objectFit:'cover', height:'24rem', width:'100%'}}
                    />
                  </div>
                  <div className="d-flex flex-column" style={{gap:'0.75rem'}}>
                    <h5 className="fs-4 fw-bold">{book.BOOK_NM_INFO}</h5>
                    <p className="fs-5"><span className="fw-bold">저자:</span> {book.AUTHOR_NM_INFO}</p>
                    <p className="fs-5"><span className="fw-bold">출판사:</span> {book.PUBLSHCMPY_NM}</p>
                    <p className="fs-5"><span className="fw-bold">출판년도:</span> {book.PUBLCATN_YY}</p>
                    {book.VOLM_CNT && (
                      <p className="fs-5"><span className="fw-bold">권수:</span> {book.VOLM_CNT}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer border-0" style={{position:'sticky', bottom:0, backgroundColor:'#333'}}>
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

export default SearchResultsModal;