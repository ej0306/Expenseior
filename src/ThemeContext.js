import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();




// const themeStyles = {
//   light: {
//     width50: {
//       width: '50%',
//     },
//     width100: {
//       width: '100%',
//     },
//     icon: {
//       fontSize: '1.2rem',
//       cursor: 'pointer',
//     },
//     input: {
//       border: '1px solid rgb(255, 1, 1) !important',
//     },
//     container: {
//       height: '85vh',
//     },
//     loginPageBox: {
//       backgroundColor: 'blueviolet',
//     },
//     secondBox: {
//       height: '100% !important',
//       overflowY: 'scroll !important',
//       backgroundColor: '#b8cac9',
//     },
//   },
//   dark: {
//     width50: {
//       width: '50%',
//     },
//     width100: {
//       width: '100%',
//     },
//     icon: {
//       fontSize: '1.2rem',
//       cursor: 'pointer',
//     },
//     input: {
//       border: '1px solid rgb(255, 1, 1) !important',
//     },
//     container: {
//       height: '85vh',
//     },
//     loginPageBox: {
//       backgroundColor: 'blueviolet',
//     },
//     secondBox: {
//       height: '100% !important',
//       overflowY: 'scroll !important',
//       backgroundColor: '#b8cac9',
//     },
//   },
// };


// const ThemeContextProvider = (props) => {
//   const [theme, setTheme] = useState('light'); // Set the initial theme to 'light'

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//   };

//   const themeStyles = {
//     light: {
//       itemsCenter: {
//         alignItems: 'center',
//         backgroundColor: 'white',
//       },
//       // mantineylyj0r:{
//       //   backgroundColor: 'yellow'
//       // },
//     },
//     dark: {
//       itemsCenter: {
//         alignItems: 'center',
//         backgroundColor: 'darkslategrey'
//       },
//       // mantineylyj0r: {
//       //   backgroundColor: 'grey'
//       // },
//     },
//   };
//   // const themeStyles = {
//   //   light: {
//   //     backgroundColor: '#FFFFFF',
//   //     color: '#000000',
//   //   },
//   //   dark: {
//   //     backgroundColor: '#000000',
//   //     color: '#FFFFFF',
//   //   },
//   // };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
//       {props.children}
//     </ThemeContext.Provider>
//   );
// };

const themeStyles = {
  light: {
    pageBackground: '#white',
    itemsCenter: { backgroundColor: '#f0f0f0' },
    // mantineylyj0r: { backgroundColor: 'transparent' },
    // mantine
    // Other light theme styles
  },
  dark: {
    pageBackground: '#darkslategrey',
    itemsCenter: { backgroundColor: '#darkslategrey' },
    mantineylyj0r: { backgroundColor: 'darkslategrey' },
    // Other dark theme styles
    mantine9gkgch: { backgroundColor: 'darkslategrey'}    
  },
};

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Optional: Store the theme preference in localStorage
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // const themeStyles = {
  //   light: {
  //     itemsCenter: {
  //       pageBackground: '#ffffff',
  //       itemsCenter: { backgroundColor: '#f0f0f0' },
  //       mantineYlyj0r: { backgroundColor: '#d3d3d3' },
  //       // Other light theme styles
  //     }
  //   },
  //   dark: {
  //     itemsCenter:{
  //       pageBackground: '#121212',
  //       itemsCenter: { backgroundColor: '#darkslategrey' },
  //       mantineYlyj0r: { backgroundColor: '#4d4d4d' },
  //       // Other dark theme styles
  //     }
  //   },
  // };
  

  return (
    <ThemeContext.Provider value={{ theme, themeStyles, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export default ThemeContextProvider;
