import React from 'react';

const Table = ({ columns, data }) => {

const widthClasses = {
    1: 'w-1/12', 
    2: 'w-2/12', 
    3: 'w-3/12', 
    4: 'w-4/12', 
    5: 'w-5/12', 
    6: 'w-6/12', 
}
console.log(data)

  console.log(columns);
  return (
    <div className='p-2'>
      <div className='flex w-full bg-zinc-100 p-2'>
        {columns.map((column, i) => (
          <span key={i} className={`${widthClasses[column.width]} pl-2 font-bold`}>
            {column.title}
          </span>
        ))}
      </div>

      {data.map((row, i) => (
        <div
          key={i}
          className='flex w-full py-3 px-2 border-t text-zinc-700 text-sm hover:scale-[1.01] hover:bg-zinc-50 transition-transform duration-300'
        >
          {columns.map((column, i) => (
            <span key={i} className={`${widthClasses[column.width]} pl-2 ${column.style || ''}`}>
              {row[column.value]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
