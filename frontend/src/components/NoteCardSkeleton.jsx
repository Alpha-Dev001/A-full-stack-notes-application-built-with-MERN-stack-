import React from 'react';

const NoteCardSkeleton = () => {
  return (
    <div className='card bg-base-100 border-t-4 border-solid border-base-300 animate-pulse'>
      <div className='card-body'>
        <div className="flex items-start justify-between mb-3">
          <div className='h-6 bg-base-300 rounded w-3/4'></div>
          <div className='h-5 bg-base-300 rounded w-5'></div>
        </div>
        
        <div className='space-y-2 mb-4'>
          <div className='h-4 bg-base-300 rounded w-full'></div>
          <div className='h-4 bg-base-300 rounded w-5/6'></div>
          <div className='h-4 bg-base-300 rounded w-4/5'></div>
        </div>
        
        <div className='card-actions justify-between items-center mt-auto'>
          <div className='flex items-center gap-2'>
            <div className='h-4 bg-base-300 rounded w-4'></div>
            <div className='h-4 bg-base-300 rounded w-20'></div>
          </div>
          <div className='h-8 bg-base-300 rounded w-8'></div>
        </div>
      </div>
    </div>
  );
};

export default NoteCardSkeleton;
