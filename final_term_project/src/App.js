// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookflixMain from './components/BookflixMain';
import MyLibraryPage from './pages/MyLibraryPage';
import BookDetailModal from './components/BookDetailModal';

function App() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
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
          } 
        />
        <Route path="/library" element={<MyLibraryPage />} />
      </Routes>
    </Router>
  );
}

export default App;