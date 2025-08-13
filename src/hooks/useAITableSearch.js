'use strict';
import { useEffect, useState } from 'react';

export function useAITableSearch(oneGroupData, allData) {
  const [filteredData, setFilteredData] = useState({
    oneGroup: oneGroupData || [],
    all: allData || []
  });

  useEffect(() => {
    setFilteredData({
      oneGroup: oneGroupData || [],
      all: allData || []
    });
  }, [oneGroupData, allData]);
  
  const handleSearch = fieldKeyword => {
    if (!fieldKeyword || fieldKeyword === '') {
      setFilteredData({
        oneGroup: oneGroupData || [],
        all: allData || []
      });
      return;
    }

    const searched = fieldKeyword.toLowerCase();
    
    const filteredOneGroup = oneGroupData?.filter(item => {
      return JSON.stringify(item).toLowerCase().includes(searched);
    })
      
    const filteredAll = allData?.filter(item => {
      return JSON.stringify(item).toLowerCase().includes(searched);
    })
    
    setFilteredData({
      oneGroup: filteredOneGroup,
      all: filteredAll
    });
  };

  const handleSearchReset = () => {
    setFilteredData({
      oneGroup: oneGroupData || [],
      all: allData || []
    });
  };

  return { handleSearch, handleSearchReset, filteredData };
}