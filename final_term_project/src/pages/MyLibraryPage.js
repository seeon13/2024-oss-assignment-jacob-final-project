// MyLibraryPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditBookModal from './EditBookModal';
import AddBookModal from './AddBookModal';

const API_URL = "https://675c6bebfe09df667f63d7a1.mockapi.io/BOOKFLIX";

const MyLibraryPage = () => {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    // data에 RKI_NO 필드가 존재한다고 가정. 
    // (REST API에 있는 데이터 예시를 보면 RKI_NO가 존재)
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (RKI_NO) => {
    const res = await fetch(`${API_URL}/${RKI_NO}`, { method: 'DELETE' });
    if (res.ok) {
      fetchBooks();
    } else {
      console.error("Failed to delete the book.");
    }
  };

  const handleEditSave = async (updatedBook) => {
    const res = await fetch(`${API_URL}/${updatedBook.RKI_NO}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedBook)
    });
    if (res.ok) {
      setEditBook(null);
      fetchBooks();
    } else {
      console.error("Failed to update the book.");
    }
  };

  const handleAddSave = async (newBook) => {
    // RKI_NO를 새로 생성해줌(고유한 값 가정)
    newBook.RKI_NO = Date.now(); 
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newBook)
    });
    if (res.ok) {
      setShowAddModal(false);
      fetchBooks();
    } else {
      console.error("Failed to add the book.");
    }
  };

  return (
    <div className="min-h-screen text-white" style={{backgroundColor:'#000'}}>
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
              className="btn p-0"
              style={{border:'none', background:'none', color:'#fff', fontSize:'1.25rem'}}
              onClick={() => setShowAddModal(true)}
            >
              Add
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
                    <button className="btn btn-sm btn-secondary" onClick={() => setEditBook(book)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(book.RKI_NO)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-5 py-4 border-top border-secondary" style={{marginTop:'5rem'}}>
        <div className="container text-center text-secondary">
          <p className="m-0">&copy; 2024 Bookflix. All rights reserved.</p>
        </div>
      </footer>

      {editBook && (
        <EditBookModal 
          book={editBook} 
          onClose={() => setEditBook(null)} 
          onSave={handleEditSave} 
        />
      )}

      {showAddModal && (
        <AddBookModal 
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddSave}
        />
      )}
    </div>
  );
};

export default MyLibraryPage;