import React from 'react';
import icFile from './file.svg';

export const file = (item) => {
  return (
    <div className='d-flex justify-content-between'>
      <div className='item__file_name'>
        <img src={icFile} alt='folder'
             className='file_icon pr-3'/>
        {item.name}
      </div>
      <a href={item.file}>
        <button className='btn btn-outline-success'>
          <i className='fas fa-arrow-down'/>
        </button>
      </a>
    </div>
  );
};
