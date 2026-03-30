import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeftIcon, Trash2Icon, FileTextIcon, PenToolIcon } from 'lucide-react';
import Loading from "../components/Loading";
import RateLimitedUI from "../components/RateLimitedUI";
import NotesNotFound from "../components/NotesNotFound";
import api from "../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [noteNotFound, setNoteNotFound] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log("Error fetching notes: ", error)
        if (error.response?.status === 429) {
          setIsRateLimited(true)
        } else if (error.response?.status === 404) {
          setNoteNotFound(true)
        }
        toast.error("Failed to Fetch note ")

      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note updated successfully")
      navigate("/app")
    } catch (error) {
      console.log("Error updating note: ", error)
      if (error.response?.status === 429) {
        setIsRateLimited(true)
      }
      toast.error("Failed to update note")
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted successfully")
      navigate("/app")
    } catch (error) {
      console.log("Error deleting note: ", error)
      if (error.response?.status === 429) {
        setIsRateLimited(true)
      }
      toast.error("Failed to delete note")
    }
  }

  if (loading) {
    return (
      <Loading />
    )
  };

  if (isRateLimited) {
    return (
      <RateLimitedUI />
    )
  };

  if (noteNotFound) {
    return (
      <NotesNotFound />
    )
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/app" className="btn btn-ghost hover:btn-ghost/80 transition-colors duration-200">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline hover:btn-error/90 transition-all duration-200 hover:scale-105">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 mt-6">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-6">
                <div className='p-3 bg-primary/20 rounded-lg'>
                  <FileTextIcon className='size-6 text-primary' />
                </div>
                <div>
                  <h2 className='card-title text-2xl'>Edit Note</h2>
                  <p className='text-base-content/60 text-sm'>Update your thoughts and ideas</p>
                </div>
              </div>

              <div className='form-control mb-6'>
                <label className='label'>
                  <span className='label-text font-medium flex items-center gap-2'>
                    <PenToolIcon size={16} />
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder='Enter note title...'
                  className='input input-bordered input-lg focus:input-primary transition-all duration-200'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className='form-control mb-6'>
                <label className='label'>
                  <span className='label-text font-medium'>Content</span>
                </label>
                <textarea
                  type="text"
                  placeholder='Write your note here...'
                  className='textarea textarea-bordered textarea-lg h-40 focus:textarea-primary transition-all duration-200 resize-none'
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
                <label className='label'>
                  <span className='label-text-alt text-base-content/60'>
                    {note.content?.length || 0} characters
                  </span>
                </label>
              </div>

              <div className="card-actions justify-between">
                <div className="text-sm text-base-content/60">
                  Created: {new Date(note.createdAt).toLocaleString()}
                </div>
                <button
                  onClick={handleUpdate}
                  type='submit'
                  className='btn btn-primary hover:btn-primary/90 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl'
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <PenToolIcon size={16} />
                      Update Note
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;