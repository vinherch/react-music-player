import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import timeFormatter from "../utils/timeformatter";

const Player = ({ currentSong, setCurrentSong, songs, setSongs, isPlaying, setIsPlaying }) => {
  const audio = useRef();

  //States
  const [songInfo, setSongInfo] = useState({
    currentPlayTime: 0,
    duration: 0,
    percentagePlayTime: 0,
  });

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

  //Handler for auto play song by changing song in library
  const autoPlayHandler = () => {
    if (isPlaying) {
      audio.current.play();
    }
  };

  //Play Time Handling
  const playSongTimeHandler = (e) => {
    setSongInfo({ ...songInfo, currentPlayTime: e.target.currentTime, duration: e.target.duration, percentagePlayTime: Math.round((Math.round(e.target.currentTime) / Math.round(e.target.duration)) * 100) });
  };

  //Input range Handler
  const dragHandler = (e) => {
    audio.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentPlayTime: e.target.value });
  };

  //Handler for skipping tracks
  const skipTrackHandler = (direction) => {
    //Get index of current song
    const index = songs.findIndex((s) => s.id === currentSong.id);
    switch (direction) {
      //Skip forward. Update current song state
      case "fwd":
        setCurrentSong(songs[(index + 1) % songs.length]);
        break;
      //Skip backwards. Update current song state
      case "back":
        if (index === 0) {
          setCurrentSong(songs[songs.length - 1]);
          return;
        }
        setCurrentSong(songs[(index - 1) % songs.length]);
        break;
    }
  };

  //Playing next track after previous tracks has ended
  const playNextTrack = () => {
    //Get index of current song
    const index = songs.findIndex((s) => s.id === currentSong.id);
    setCurrentSong(songs[(index + 1) % songs.length]);
  };

  //Updating active songs after song skipping
  useEffect(() => {
    //Update songs state
    const updatedSongs = songs.map((s) => {
      if (s.id === currentSong.id) {
        return { ...s, active: true };
      } else {
        return { ...s, active: false };
      }
    });
    setSongs(updatedSongs);
    console.log("Hello");
  }, [currentSong]);

  //Inline Styles
  //Input Slider style - Control of percentage & set color from current song
  const sliderPercentageStyle = {
    width: `${songInfo.percentagePlayTime}%`,
    background: `linear-gradient(90deg,${currentSong.color[0]},${currentSong.color[1]})`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{timeFormatter(songInfo.currentPlayTime)}</p>
        <div id="input-container">
          <input type="range" min={0} max={songInfo.duration || "0:00"} value={songInfo.currentPlayTime} onChange={dragHandler} />
          <div id="played-percentage" style={sliderPercentageStyle}></div>
        </div>
        <p>{songInfo.duration ? timeFormatter(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => {
            skipTrackHandler("back");
          }}
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon
          className="skip-fwd"
          onClick={() => {
            skipTrackHandler("fwd");
          }}
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio onTimeUpdate={playSongTimeHandler} onLoadedData={autoPlayHandler} onLoadedMetadata={playSongTimeHandler} onEnded={playNextTrack} ref={audio} src={currentSong.audio}></audio>
    </div>
  );
};

export default Player;
