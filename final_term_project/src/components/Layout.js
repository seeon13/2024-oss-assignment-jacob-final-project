// components/Layout.js
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white" style={{backgroundColor:'#000'}}>
      <header className="fixed-top" style={{backgroundColor:"#000"}}>
        <div className="container d-flex align-items-center justify-content-between py-3">
          <h1 className="m-0 fw-bold" style={{fontSize:'2rem', color:'#e50914'}} onClick={() => navigate('/')} role="button">Bookflix</h1>
          <div className="d-flex align-items-center gap-4">
            <button 
              className="btn p-0" 
              style={{border:'none', background:'none', color:'#fff', fontSize:'1.25rem'}} 
              onClick={() => navigate('/list')}
            >
              List
            </button>
            <button 
              className="btn p-0" 
              style={{border:'none', background:'none', color:'#fff', fontSize:'1.25rem'}} 
              onClick={() => navigate('/search')}
            >
              Search
            </button>
            <button 
              className="btn p-0" 
              style={{border:'none', background:'none', color:'#fff', fontSize:'1.25rem'}} 
              onClick={() => navigate('/filter')}
            >
              Filter
            </button>
            <button 
              className="btn p-0" 
              style={{border:'none', background:'none', color:'#fff', fontSize:'1.25rem'}} 
              onClick={() => navigate('/library')}
            >
              My Library
            </button>
          </div>
        </div>
      </header>
      <main className="container" style={{paddingTop:'5rem'}}>
        <Outlet />
      </main>
      <footer className="mt-5 py-4 border-top border-secondary">
        <div className="container text-center text-secondary">
          <p className="m-0">&copy; 2024 Bookflix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;