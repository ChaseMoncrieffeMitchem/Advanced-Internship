import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/AudioPlayer.module.css";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaArrowRotateRight } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";

const AudioPlayer = () => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0)

  // reference
  const audioPlayer = useRef();    // reference our audio component
  const progressBar = useRef();    // reference our progress bar
  const animationRef = useRef();   // reference the animation
  

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  function calculateTime (secs) {
    const minutes = Math.floor(secs / 60)
    const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60) 
    const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnMinutes}:${returnSeconds}`
  }

  function togglePlayPause() {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current)
    }
  }

  function whilePlaying() {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime()
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  function changeRange() {
    audioPlayer.current.currentTime = progressBar.current.value
    changePlayerCurrentTime()
  }

  function changePlayerCurrentTime() {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value)
  }

  function backTen() {
    progressBar.current.value = Number(progressBar.current.value) - 10
    changeRange()
  }

  function forwardTen() {
    progressBar.current.value = Number(progressBar.current.value) + 10
    changeRange()
  }

  return (
    <div className={styles.audioPlayer}>
      <audio
        ref={audioPlayer}
        src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fhow-to-win-friends-and-influence-people.mp3?alt=media&token=60872755-13fc-43f4-8b75-bae3fcd73991"
        preload="metadata"
      ></audio>


      <button className={styles.forwardBackward} onClick={() => backTen()}>
        <FaArrowRotateLeft />
      </button>
      <button className={styles.playPause} onClick={() => togglePlayPause()}>
        {isPlaying ? <FaRegCirclePause /> : <FaRegCirclePlay />}{" "}
      </button>
      <button className={styles.forwardBackward} onClick={() => forwardTen()}>
        <FaArrowRotateRight />
      </button>

      {/* current time */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div>
        <input className={styles.progressBar} type="range" defaultValue="0" ref={progressBar} onChange={() => changeRange()}></input>
      </div>

      {/* duration */}
      <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
    </div>
  );
};

export { AudioPlayer };
