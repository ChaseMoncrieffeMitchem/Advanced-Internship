import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function SuggestedBooks({ suggestedBooks }) {
  const [loading, setLoading] = useState(false);
  const [audioDurations, setAudioDurations] = useState({});

  const audioRefs = useRef({});

  function onLoadedMetaData(bookId) {
    return () => {
      const seconds = audioRefs.current[bookId].duration || 0;
      setAudioDurations((prevDurations) => ({
        ...prevDurations,
        [bookId]: seconds,
      }));
    };
  }

  function calculateTime(duration) {
    if (duration) {
      const minutes = Math.floor(duration / 60);
      const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(duration % 60);
      const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${returnMinutes}:${returnSeconds}`;
    }
    return "0:00";
  }

  return (
    <>
      <div className="for-you__title">Suggested Books</div>
      <div className="for-you__sub--title">Browse those books</div>
      <div className="for-you__recommended--books">
        {loading ? (
          <div>Loading...</div>
        ) : (
          suggestedBooks.map((book, index) => (
            <Link
              className="for-you__recommended--books-link"
              href={"/foryou/book/" + book.id}
              key={index}
            >
              <div className="book__pill book__pill--subscription-required">
                {book.subscriptionRequired === true ? "Premium" : ""}
              </div>
              <audio></audio>
              <figure className="book__image--wrapper">
                <img className="book__image" src={book.imageLink}></img>
              </figure>
              <div className="recommended__book--title">{book.title}</div>
              <div className="recommended__book--author">{book.author}</div>
              <div className="recommended__book--sub-title">
                {book.subTitle}
              </div>
              <div className="recommended__book--details-wrapper">
                <div className="recommended__book--details">
                  <div className="recommended__book--details-icon">
                    <svg></svg>
                  </div>
                  {book?.audioLink && (
                    <>
                      <audio
                        src={book.audioLink}
                        ref={(element) =>
                          (audioRefs.current[book.id] = element)
                        }
                        onLoadedMetadata={onLoadedMetaData(book.id)}
                        className="no__display"
                      ></audio>
                      <div className="recommended__book--details-text">
                        {calculateTime(audioDurations[book.id] || 0)}
                      </div>
                    </>
                  )}
                </div>
                <div className="recommended__book--details">
                  <div className="recommended__book--details-icon">
                    <svg></svg>
                  </div>
                  <div className="recommended__book--details-text">
                    {book.averageRating}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
