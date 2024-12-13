// EditBookModal.js
import React, { useState } from 'react';

const EditBookModal = ({ book, onClose, onSave }) => {
  const [BOOK_NM_INFO, setBOOK_NM_INFO] = useState(book.BOOK_NM_INFO || '');
  const [AUTHOR_NM_INFO, setAUTHOR_NM_INFO] = useState(book.AUTHOR_NM_INFO || '');
  const [PUBLSHCMPY_NM, setPUBLSHCMPY_NM] = useState(book.PUBLSHCMPY_NM || '');
  const [PUBLCATN_YY, setPUBLCATN_YY] = useState(book.PUBLCATN_YY || '');
  const [BOOK_IMAGE_URL, setBOOK_IMAGE_URL] = useState(book.BOOK_IMAGE_URL || '');
  const [COMMENT, setCOMMENT] = useState(book.COMMENT || '');
  const [STARS, setSTARS] = useState(book.STARS !== undefined ? book.STARS : '');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!BOOK_NM_INFO.trim()) newErrors.BOOK_NM_INFO = "Required";
    if (!AUTHOR_NM_INFO.trim()) newErrors.AUTHOR_NM_INFO = "Required";
    if (!PUBLSHCMPY_NM.trim()) newErrors.PUBLSHCMPY_NM = "Required";
    if (!PUBLCATN_YY.trim()) newErrors.PUBLCATN_YY = "Required";
    if (!BOOK_IMAGE_URL.trim()) newErrors.BOOK_IMAGE_URL = "Required";
    if (!COMMENT.trim()) newErrors.COMMENT = "Required";
    if (STARS === '' || isNaN(STARS)) newErrors.STARS = "Must be a number";
    else {
      const starsValue = Number(STARS);
      if (starsValue < 0 || starsValue > 5) newErrors.STARS = "Must be between 0 and 5";
    }
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedBook = {
      ...book,
      BOOK_NM_INFO,
      AUTHOR_NM_INFO,
      PUBLSHCMPY_NM,
      PUBLCATN_YY,
      BOOK_IMAGE_URL,
      COMMENT,
      STARS: Number(STARS)
    };
    onSave(updatedBook);
  };

  const getInputClass = (field) => errors[field] ? 'form-control bg-transparent text-white border border-danger is-invalid' : 'form-control bg-transparent text-white border border-secondary';

  return (
    <>
      <div className="modal-backdrop show" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}></div>
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-0">
              <h5 className="modal-title">Edit Book</h5>
              <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Book Title</label>
                <input className={getInputClass('BOOK_NM_INFO')} value={BOOK_NM_INFO} onChange={(e) => setBOOK_NM_INFO(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Author</label>
                <input className={getInputClass('AUTHOR_NM_INFO')} value={AUTHOR_NM_INFO} onChange={(e) => setAUTHOR_NM_INFO(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Publish Company</label>
                <input className={getInputClass('PUBLSHCMPY_NM')} value={PUBLSHCMPY_NM} onChange={(e) => setPUBLSHCMPY_NM(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Publication Year</label>
                <input className={getInputClass('PUBLCATN_YY')} value={PUBLCATN_YY} onChange={(e) => setPUBLCATN_YY(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Book Image Url</label>
                <input className={getInputClass('BOOK_IMAGE_URL')} value={BOOK_IMAGE_URL} onChange={(e) => setBOOK_IMAGE_URL(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Comment</label>
                <textarea className={getInputClass('COMMENT')} rows="3" value={COMMENT} onChange={(e) => setCOMMENT(e.target.value)}></textarea>
              </div>
              <div className="mb-3">
              <label className="form-label">Stars</label>
              <input type="number" className={getInputClass('STARS')} value={STARS} onChange={(e) => setSTARS(e.target.value)} />
              </div>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBookModal;
