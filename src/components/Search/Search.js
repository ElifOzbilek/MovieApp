
import React, { useState, useEffect, useRef } from 'react';
import "./Search.css";


const Search = ({ onSearch }) => {
    const [value, setValue] = useState('');
    const debounceTimeout = useRef(null);
  
    const handleInputChange = (e) => {
      const newValue = e.target.value;
      setValue(newValue);
  
    
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
  
     
      debounceTimeout.current = setTimeout(() => {
        if (newValue.length >= 3) {
          onSearch(newValue);
        }else {
          onSearch('');
        }
      }, 500); 
    };
  
    const handleClearClick = () => {
      setValue('');
      onSearch(''); 
    };
  
    return (
      <div className='searchContainer'>
        <div className="inputWrapper">
          <i className="fa-solid fa-magnifying-glass searchIcon"></i>
          <input 
            type="text" 
            className="form-control searchBar" 
            aria-describedby="helpId" 
            value={value}
            onChange={handleInputChange}
          />
          {value && (
            <i 
              className="fa-solid fa-x clearIcon"
              onClick={handleClearClick}
            ></i>
          )}
        </div>
      </div>
    );
  };

export default Search;