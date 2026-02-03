'use strict';

import React from 'react';

export default function InputField({
  type,
  placeholder,
  name,
  value,
  onFocus,
  onBlur,
  onChange,
  required,
  maxLength,
  style
}) {
  const checkSpecialChar =(e)=>{
    if(/[<>/?+={};#$%&*()`~\\]/.test(e.key)){
     e.preventDefault();
    }};
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      required={required}
      placeholder={placeholder}
      name={name}
      maxLength={maxLength || "200"}
      min="100000000"
      max="999999999"
      onKeyPress={(e)=>checkSpecialChar(e)}
      style={style}
      className='shadow focus:shadow-md rounded-md p-1 pl-2 w-full border border-gray-200 text-gray-700 focus:ring-2 ring-blue-400 outline-none  transition-all  duration-200'
    />
  );
}
