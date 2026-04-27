import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">AI工具展示</Link>
      <div className="navbar-links">
        {isAuthenticated && (
          <Link to="/add-tool" className="btn-add">+ 上传AI工具</Link>
        )}
        {isAuthenticated ? (
          <>
            <span style={{ opacity: 0.7 }}>
              {JSON.parse(localStorage.getItem('user') || '{}').username}
            </span>
            <button onClick={onLogout} className="btn-logout">退出</button>
          </>
        ) : (
          <>
            <Link to="/login">登录</Link>
            <Link to="/register" className="btn-primary">注册</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
