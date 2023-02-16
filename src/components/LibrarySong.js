const LibrarySong = ({ song, setCurrentSong, songs, setSongs, id }) => {
  const songSelectHandler = () => {
    setCurrentSong(song);
    //Update songs state
    const updatedSongs = songs.map((s) => {
      if (s.id === song.id) {
        return { ...s, active: true };
      } else {
        return { ...s, active: false };
      }
    });
    setSongs(updatedSongs);
  };

  return (
    <div className={`library-song ${song.active ? "selected" : ""}`} onClick={songSelectHandler}>
      <img src={song.cover} alt={song.name}></img>
      <h3>{song.name}</h3>
      <h4>{song.artist}</h4>
    </div>
  );
};

export default LibrarySong;
