// pages/MyLibraryPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = "https://675c6bebfe09df667f63d7a1.mockapi.io/BOOKFLIX";

const MyLibraryPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (RKI_NO) => {
    // 삭제 확인 다이얼로그
    const isConfirmed = window.confirm("정말로 이 책을 삭제하시겠습니까?");
    
    if (isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/${RKI_NO}`, { method: 'DELETE' });
        if (res.ok) {
          await fetchBooks(); // 목록 새로고침
        } else {
          throw new Error("Delete failed");
        }
      } catch (error) {
        console.error("Failed to delete the book:", error);
        alert("책 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

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
    <div className="min-vh-100 text-white" style={{backgroundColor:'#000'}}>
      <header className="fixed-top" style={{backgroundColor:"#000"}}>
        <div className="container d-flex align-items-center justify-content-between py-3">
          <h1 className="m-0 fw-bold" style={{fontSize:'2rem', color:'#e50914'}}>Bookflix</h1>
          <div className="d-flex align-items-center gap-4">
            <button 
              className="btn p-0" 
              style={{border:'none', background:'none', color:'#fff', fontSize:'1.25rem'}} 
              onClick={() => navigate('/')}
            >
              Home
            </button>
            <button
              className="btn btn-danger"
              onClick={() => navigate('/library/add')}
            >
              Add Book
            </button>
          </div>
        </div>
      </header>

      <main className="container" style={{paddingTop:'5rem'}}>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {books.map(book => (
            <div className="col" key={book.RKI_NO}>
              <div className="card bg-dark text-white h-100" style={{border:'none'}}>
                <div style={{width:'100%', height:'20rem', background:'#000', display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <img 
                    src={book.BOOK_IMAGE_URL} 
                    className="card-img-top" 
                    alt={book.BOOK_NM_INFO} 
                    style={{objectFit:'contain', height:'100%', width:'100%'}}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title fs-5 fw-bold">{book.BOOK_NM_INFO}</h5>
                  <p className="card-text fs-6">{book.AUTHOR_NM_INFO}</p>
                  <p className="card-text fs-6">{book.PUBLSHCMPY_NM} | {book.PUBLCATN_YY}</p>
                  {book.COMMENT && <p className="card-text fs-6">{book.COMMENT}</p>}
                  {book.STARS !== undefined && <p className="card-text fs-6">Stars: {book.STARS}</p>}
                  <div className="d-flex gap-3">
                    <button className="btn btn-sm btn-secondary" onClick={() => navigate(`/library/edit/${book.RKI_NO}`)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(book.RKI_NO)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyLibraryPage;