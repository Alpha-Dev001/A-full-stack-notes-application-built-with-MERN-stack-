import Navbar from '../components/Navbar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../lib/axios'
import toast from 'react-hot-toast';
import Loading from '../components/Loading'
import NoteCard from '../components/NoteCard';
import NoteNotFOund from '../components/NotesNotFound'

function HomePage() {
  const [isRateLimited,setIsRateLimited] = useState(false);
  const [notes,setNotes] =useState([]);
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async () => {
      try{
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false)
        console.log(res.data);
      }catch(error){
        console.log("Error fetching notes: ",error)
        if(error.response?.status === 429){
          setIsRateLimited(true)
        }
          toast.error("Failed to load notes")
        
      }finally{
        setLoading(false);
      }
    }
    fetchNotes();
  },[])
  return (
    <div className='min-h-screen'>
      <Navbar/>
      {isRateLimited && <RateLimitedUI/>}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <Loading/>}
        {notes.length === 0 && !isRateLimited && <NoteNotFOund/> }
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
               {notes.map(note=>{
                  return <NoteCard key={note._id} note={note} setNotes={setNotes} />
               })}
          </div>
        ) }
        
      </div>
    </div>
  )
}

export default HomePage
