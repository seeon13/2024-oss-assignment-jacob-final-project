// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookflixMain from './components/BookflixMain';
import MyLibraryPage from './pages/MyLibraryPage';
import BookDetailModal from './components/BookDetailModal';
import BookListPage from './pages/BookListPage';
import BookSearchPage from './pages/BookSearchPage';
import BookFilterPage from './pages/BookFilterPage';
import AddBookPage from './pages/AddBookPage';  
import EditBookPage from './pages/EditBookPage';
import Layout from './components/Layout';

function App() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <>
              <BookflixMain onBookSelect={setSelectedBook} />
              {selectedBook && (
                <BookDetailModal 
                  book={selectedBook} 
                  onClose={() => setSelectedBook(null)}
                  similarBooks={[]} 
                />
              )}
            </>
          } />
          <Route path="library" element={<MyLibraryPage />} />
          <Route path="library/add" element={<AddBookPage />} />
          <Route path="library/edit/:id" element={<EditBookPage />} />
          <Route path="list" element={
            <>
              <BookListPage onBookSelect={setSelectedBook} />
              {selectedBook && (
                <BookDetailModal 
                  book={selectedBook} 
                  onClose={() => setSelectedBook(null)}
                  similarBooks={[]} 
                />
              )}
            </>
          } />
          <Route path="search" element={
            <>
              <BookSearchPage onBookSelect={setSelectedBook} />
              {selectedBook && (
                <BookDetailModal 
                  book={selectedBook} 
                  onClose={() => setSelectedBook(null)}
                  similarBooks={[]} 
                />
              )}
            </>
          } />
          <Route path="filter" element={
            <>
              <BookFilterPage onBookSelect={setSelectedBook} />
              {selectedBook && (
                <BookDetailModal 
                  book={selectedBook} 
                  onClose={() => setSelectedBook(null)}
                  similarBooks={[]} 
                />
              )}
            </>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;