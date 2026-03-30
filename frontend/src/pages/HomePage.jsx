import Navbar from '../components/Navbar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../lib/axios'
import toast from 'react-hot-toast';
import Loading from '../components/Loading'
import NoteCard from '../components/NoteCard';
import NoteCardSkeleton from '../components/NoteCardSkeleton';
import NotesNotFound from '../components/NotesNotFound';
import PageTransition from '../components/PageTransition';

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false)
        console.log(res.data);
      } catch (error) {
        console.log("Error fetching notes: ", error)
        if (error.response?.status === 429) {
          setIsRateLimited(true)
        }
        toast.error("Failed to load notes")

      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [])
  return (
    <div className='min-h-screen'>
      <Navbar />
      <PageTransition>
        <div className='max-w-7xl mx-auto p-4 mt-6'>
          {isRateLimited && <RateLimitedUI />}
          {loading && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <NoteCardSkeleton key={i} />
              ))}
            </div>
          )}
          {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}
          {!loading && notes.length > 0 && !isRateLimited && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-slideIn'>
              {notes.map(note => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </div>
  )
}

export default HomePage
