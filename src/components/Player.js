import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import timeFormatter from "../utils/timeformatter";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  const audio = useRef();

  //Event Handler
  //Handler for play / pause functionality
  const playSongHandler = () => {
    if (isPlaying) {
      audio.current.pause();
      setIsPlaying(false);
      return;
    }
    audio.current.play();
    setIsPlaying(true);
  };

  //Play Time Handling
  const playSongTimeHandler = (e) => {
    setSongInfo({ ...songInfo, currentPlayTime: e.target.currentTime, duration: e.target.duration });
  };

  //Input range Handler
  const dragHandler = (e) => {
    audio.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentPlayTime: e.target.value });
  };

  //State
  const [songInfo, setSongInfo] = useState({
    currentPlayTime: 0,
    duration: 0,
  });

  return (
    <div className="player">
      <div className="time-control">
        <p>{timeFormatter(songInfo.currentPlayTime)}</p>
        <input type="range" min={0} max={songInfo.duration} value={songInfo.currentPlayTime} onChange={dragHandler} />
        <p>{timeFormatter(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon className="skip-fwd" size="2x" icon={faAngleRight} />
      </div>
      <audio onTimeUpdate={playSongTimeHandler} onLoadedMetadata={playSongTimeHandler} ref={audio} src={currentSong.audio}></audio>
    </div>
  );
};

export default Player;
