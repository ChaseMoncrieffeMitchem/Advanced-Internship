import { AudioPlayer } from "@/components/AudioPlayer";
import Sidebar from "@/components/Sidebar";
import RecommendedBooks from "@/components/bookApis/RecommendedBooks";
import SelectedBooks from "@/components/bookApis/SelectedBooks";
import SuggestedBooks from "@/components/bookApis/SuggestedBooks";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function forYou() {
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [recommendedDuration, setRecommendedDuration] = useState(null);
  const [suggestedDuration, setSuggestedDuration] = useState(null);

  // const audioPlayer = useRef();
  const recommendedAudioRef = useRef({});
  const suggestedAudioRef = useRef({});

  async function fetchSuggestedBooks() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
    );
    setSuggestedBooks(data);
    console.log(data);
  }

  async function fetchRecommendedBooks() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
    );
    setRecommendedBooks(data);
    console.log(data);
  }

  function calculateTimeRecommended() {
    if (recommendedDuration) {
      const minutes = Math.floor(recommendedDuration / 60);
      const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(recommendedDuration % 60);
      const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${returnMinutes}:${returnSeconds}`;
    }
    return "0:00";
  }

  function calculateTimeSuggested() {
    if (suggestedDuration) {
      const minutes = Math.floor(suggestedDuration / 60);
      const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(suggestedDuration % 60);
      const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${returnMinutes}:${returnSeconds}`;
    }
    return "0:00";
  }

  console.log(recommendedDuration);
  console.log(suggestedDuration);

  useEffect(() => {
    fetchSuggestedBooks();
    fetchRecommendedBooks();
  }, []);

    const onLoadedMetadataRecommended = () => {
      const seconds = recommendedAudioRef.current.duration;
      calculateTimeRecommended(seconds);
      setRecommendedDuration((prevRecommendedDuration) => ({
        ...prevRecommendedDuration,
        seconds,
      }));
    };

    const onLoadedMetadataSuggested = () => {
      const seconds = suggestedAudioRef.current.duration;
      setSuggestedDuration((prevSuggestedDuration) => ({
        ...prevSuggestedDuration,
        seconds,
      }));
    };

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="row">
          <div className="container">
            <div className="for-you__wrapper">
              <audio
                className="no__display"
                src={recommendedBooks.audioLink}
                ref={recommendedAudioRef}
                onLoadedMetadata={onLoadedMetadataRecommended}
              />
              <audio
                className="no__display"
                src={suggestedBooks.audioLink}
                ref={suggestedAudioRef}
                onLoadedMetadata={onLoadedMetadataSuggested}
              />
              <SelectedBooks />
              <RecommendedBooks
                recommendedBooks={recommendedBooks}
                recommendedDuration={recommendedDuration}
              />
              <SuggestedBooks
                suggestedBooks={suggestedBooks}
                suggestedDuration={suggestedDuration}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
