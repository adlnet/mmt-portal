'use strict'
import { useState } from 'react';

export function useTableSearch(initialData) {

  const [filteredData, setFilteredData]  = useState(initialData);

  const handleSearch = (fieldKeyword, data) => {
    if (!fieldKeyword || fieldKeyword === '') {
        setFilteredData(data);
        return;
    }

    const searched  = fieldKeyword.toLowerCase();

    const filtered = [];
  
    for (const transcript of data) {
        if (Object.values(transcript).some(val => String(val).toLowerCase().includes(searched))) {
        filtered.push(transcript);
        }
    }
    setFilteredData(filtered);
  }

  return { handleSearch, filteredData, setFilteredData };
}