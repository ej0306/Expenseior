import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import './ThemeToggle.css'; // Import a CSS file specifically for ThemeToggle styles

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="ThemeToggle-container">
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
}

export default ThemeToggle;
