import React, { useContext } from 'react';
import { MyContext } from '../../Context';
import { Menu } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const Playlist = () => {
  const { selectedSong, currentSongIndex, reorderSelectedSongs } = useContext(MyContext);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = selectedSong.findIndex(song => song.id === active.id);
      const newIndex = selectedSong.findIndex(song => song.id === over?.id);

      const newSongs = arrayMove(selectedSong, oldIndex, newIndex);
      reorderSelectedSongs(newSongs);
    }
  };

  return (
    <div className='p-4 bg-white flex-1/2 shadow-md'>
      <h2 className="text-xl font-bold mb-2">Playlist</h2>
      {selectedSong.length === 0 ? (
        <p className="text-gray-500">No songs selected.</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={selectedSong.map(song => song.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul>
              {selectedSong.map((song, idx) => (
                <SortableSong
                  key={song.id}
                  song={song}
                  isCurrent={idx === currentSongIndex}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

const SortableSong = ({ song, isCurrent }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: song.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`mb-4 hover:shadow-xl flex items-center gap-3 ${
        isCurrent ? 'bg-green-100 font-bold' : ''
      }`}
    >
      <button className='rounded bg-gray-200 p-1 ml-2.5 hover:bg-gray-300 transition-colors'>
        <Menu />
      </button>
      <div>
        <div className="font-semibold">{song.name}</div>
        <div className="text-sm text-gray-600">{song.artist_name}</div>
      </div>
      <span className='ml-auto'>
        {song && song.duration
          ? new Date(song.duration * 1000).toISOString().substr(14, 5)
          : '00:00'}
      </span>
    </li>
  );
};
