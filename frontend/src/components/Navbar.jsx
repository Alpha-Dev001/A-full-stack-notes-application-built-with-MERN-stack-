import React from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon, BrainCircuitIcon } from 'lucide-react'

function Navbar() {
  return (
    <header className='bg-base-300/80 backdrop-blur-md border-b border-base-content/10 sticky top-0 z-50'>
      <div className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 sm:gap-3'>
            <div className='p-2 bg-primary/20 rounded-lg'>
              <BrainCircuitIcon className='size-5 sm:size-6 text-primary' />
            </div>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-primary font-mono tracking-tighter hover:text-primary/80 transition-colors duration-200'>
              MindVault
            </h1>
          </div>
          <div className='flex items-center gap-2 sm:gap-4'>
            <Link to={"/app/create"} className='btn btn-primary btn-sm sm:btn-md hover:btn-primary/90 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl'>
              <PlusIcon className='size-4 sm:size-5' />
              <span className='hidden sm:inline'>New Note</span>
              <span className='sm:hidden'>+</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
