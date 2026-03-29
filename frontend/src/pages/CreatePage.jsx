
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, FileTextIcon, PenToolIcon } from 'lucide-react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios'

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [titleError, setTitleError] = useState("")
  const [contentError, setContentError] = useState("")

  const navigate = useNavigate()

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError("Title is required");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!content.trim()) {
      setContentError("Content is required");
      isValid = false;
    } else {
      setContentError("");
    }

    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setLoading(true)

    try {
      await api.post("/notes", {
        title,
        content
      })
      toast.success("Created notes successfully!")
      setTitle("")
      setContent("")
      navigate("/app")

    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to load notes")
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-3 sm:px-4 py-4 sm:py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to="/app" className='btn btn-ghost mb-4 sm:mb-6 hover:btn-ghost/80 transition-colors duration-200'>
            <ArrowLeftIcon className='size-5' />
            <span className='hidden sm:inline'>Back to Notes</span>
            <span className='sm:hidden'>Back</span>
          </Link>

          <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300'>
            <div className='card-body p-4 sm:p-6'>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className='p-2 sm:p-3 bg-primary/20 rounded-lg'>
                  <FileTextIcon className='size-5 sm:size-6 text-primary' />
                </div>
                <div>
                  <h2 className='card-title text-xl sm:text-2xl'>Create New Note</h2>
                  <p className='text-base-content/60 text-xs sm:text-sm'>Capture your thoughts and ideas</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
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
                    className={`input input-bordered input-md sm:input-lg focus:input-primary transition-all duration-200 ${titleError ? 'input-error' : ''}`}
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (titleError) setTitleError("");
                    }}
                  />
                  {titleError && (
                    <label className='label'>
                      <span className='label-text-alt text-error'>{titleError}</span>
                    </label>
                  )}
                </div>

                <div className='form-control mb-6'>
                  <label className='label'>
                    <span className='label-text font-medium'>Content</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder='Write your note here...'
                    className={`textarea textarea-bordered textarea-md sm:textarea-lg h-32 sm:h-40 focus:textarea-primary transition-all duration-200 resize-none ${contentError ? 'textarea-error' : ''}`}
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      if (contentError) setContentError("");
                    }}
                  />
                  {contentError && (
                    <label className='label'>
                      <span className='label-text-alt text-error'>{contentError}</span>
                    </label>
                  )}
                  <label className='label'>
                    <span className='label-text-alt text-base-content/60'>
                      {content.length} characters
                    </span>
                  </label>
                </div>

                <div className="card-actions justify-end gap-2 sm:gap-3 flex-col sm:flex-row">
                  <Link to="/app" className='btn btn-ghost hover:btn-ghost/80 transition-colors duration-200 w-full sm:w-auto'>
                    Cancel
                  </Link>
                  <button
                    type='submit'
                    className='btn btn-primary hover:btn-primary/90 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto'
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <PenToolIcon size={16} />
                        Create Note
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default CreatePage
