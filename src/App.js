import { useState } from "react";

//Styles
import "./styles/app.scss";

//Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Navigation from "./components/Navigation";

//Music Data
import data from "./utils/songs";

function App() {
  //States
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className={`App ${libraryStatus ? "ml-30" : ""}`}>
      <Navigation libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player currentSong={currentSong} setCurrentSong={setCurrentSong} songs={songs} setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <Library songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} libraryStatus={libraryStatus} />
    </div>
  );
}

export default App;
