import LibrarySong from "./LibrarySong";

const Library = ({ songs, setCurrentSong, setSongs, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? "expanded" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong song={song} songs={songs} setSongs={setSongs} key={song.id} id={song.id} setCurrentSong={setCurrentSong} />
        ))}
      </div>
    </div>
  );
};

export default Library;
