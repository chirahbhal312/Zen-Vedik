'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Note = {
  id: string;
  color: string;
  title: string;
  body?: string;
};

const NOTE_COLORS = ['#FFF9C4', '#FFE0B2', '#C8E6C9', '#BBDEFB', '#E1BEE7'] as const;

export default function WhiteboardStickyNotes() {
  const notes: Note[] = Array.from({ length: 8 }).map((_, i) => ({
    id: `note-${i}`,
    color: NOTE_COLORS[i % NOTE_COLORS.length],
    title: ['Brainstorm', 'To-Do', 'Reminder', 'Draft', 'Backlog'][i % 5],
    body: [
      'Explore Q4 campaign ideas.',
      'Refactor auth flow + tests.',
      'Book venue and send invites.',
      'Outline onboarding tutorial.',
      'Collect feedback from beta users.',
    ][i % 5],
  }));

  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);

  // Handle click with small delay after jiggle
  const handleNoteClick = (note: Note) => {
    setTimeout(() => setSelectedNote(note), 150); // delay so jiggle plays first
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <section
        aria-label="Whiteboard with sticky notes"
        className="w-full max-w-6xl rounded-2xl border-[20px] border-[#D3C5A1] shadow-md bg-[#FFF6E0]"        >
        <div className="px-6 py-5">
        <h1 className="text-lg md:text-[3rem] font-medium text-neutral-800 text-center">Wall of Trust</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6 p-6">
          {notes.map((note, i) => (
            <motion.article
              key={note.id}
              className="cursor-pointer rounded-md p-4 md:p-5 shadow-sm"
              style={{ backgroundColor: note.color }}
              onClick={() => handleNoteClick(note)}
              initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 15,
                delay: i * 0.1, // stagger jiggle on load
              }}
              whileTap={{
                scale: [1, 0.9, 1.05, 1], // bounce sequence
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.2 },
              }}
            >
              <h2 className="font-semibold text-neutral-800">{note.title}</h2>
              {note.body && (
                <p className="mt-2 text-neutral-700 leading-relaxed text-sm">{note.body}</p>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      {/* Overlay Modal */}
      <AnimatePresence>
  {selectedNote && (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-[5vw]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="
          relative w-full rounded-lg shadow-lg p-6 flex flex-col
          sm:w-full
          lg:max-w-md lg:aspect-square
        "
        style={{ backgroundColor: selectedNote.color }}
        initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
        animate={{
          scale: [0.8, 1.05, 0.95, 1],
          rotate: [-5, 3, -2, 0],
          opacity: 1,
        }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <button
          onClick={() => setSelectedNote(null)}
          className="absolute top-3 right-3 text-neutral-600 hover:text-neutral-900"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold text-neutral-800">
          {selectedNote.title}
        </h2>
        {selectedNote.body && (
          <p className="mt-3 text-neutral-700 leading-relaxed">
            {selectedNote.body}
          </p>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </main>
  );
}
