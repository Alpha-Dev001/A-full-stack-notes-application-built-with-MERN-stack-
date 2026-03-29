import { Trash2Icon, ClockIcon, ArrowUpRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { formatDate } from '../lib/utils';
import api from "../lib/axios"

function NoteCard({ note, setNotes }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setIsDeleting(true);
    try {
      await api.delete(`/notes/${id}`)
      setNotes((prev) => prev.filter(note => note._id !== id))
      toast.success("Note deleted successfully")
    } catch (error) {
      console.log("error in delete")
      toast.error("Failed to delete the note.")
    } finally {
      setIsDeleting(false);
    }
  }

  const getPreviewText = (text, maxLength = 120) => {
    if (!text) return 'No content...';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Link
      to={`/app/note/${note._id}`}
      className='group relative bg-gradient-to-br from-white via-white to-gray-50 dark:from-base-100 dark:via-base-100 dark:to-base-200/80 rounded-2xl border border-gray-200/50 dark:border-base-300/60 shadow-lg shadow-gray-900/5 dark:shadow-black/20 hover:shadow-2xl hover:shadow-gray-900/10 dark:hover:shadow-black/40 transition-all duration-500 overflow-hidden'
    >
      {/* Premium gradient overlay - always visible but subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-transparent"></div>

      {/* Subtle inner shadow - always visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/3 to-transparent"></div>

      {/* Content */}
      <div className='relative p-6'>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className='font-semibold text-gray-900 dark:text-base-content text-lg leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300'>
              {note.title || 'Untitled Note'}
            </h3>

            {/* Subtle metadata dots - always visible */}
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-primary/60 rounded-full"></div>
              <span className="text-xs text-gray-500 dark:text-base-content/50 font-medium">
                {new Date(note.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Arrow indicator */}
            <ArrowUpRightIcon
              size={16}
              className="text-gray-400 dark:text-base-content/40 opacity-60 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
            />

            {/* Delete button - always visible but subtle */}
            <button
              onClick={(e) => handleDelete(e, note._id)}
              className='text-gray-400 hover:text-red-500 dark:text-base-content/60 dark:hover:text-error p-2 rounded-xl transition-all duration-300 hover:bg-red-50 dark:hover:bg-error/10'
              disabled={isDeleting}
            >
              {isDeleting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Trash2Icon size={16} />
              )}
            </button>
          </div>
        </div>

        {/* Content with premium typography */}
        <p className='text-gray-600 dark:text-base-content/70 text-sm leading-relaxed line-clamp-3 mb-4 font-normal'>
          {getPreviewText(note.content)}
        </p>

        {/* Premium footer - always elegant */}
        <div className='flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-base-200/60'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-1.5 text-xs text-gray-500 dark:text-base-content/50 font-medium'>
              <ClockIcon size={11} />
              <span>{formatDate(new Date(note.createdAt))}</span>
            </div>
          </div>

          {note.content && (
            <div className='text-xs text-gray-400 dark:text-base-content/40 font-medium'>
              {note.content.trim().split(/\s+/).length} words
            </div>
          )}
        </div>

        {/* Enhanced gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </Link>
  );
}

export default NoteCard;