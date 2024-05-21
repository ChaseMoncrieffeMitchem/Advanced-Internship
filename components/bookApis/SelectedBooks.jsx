import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function SelectedBooks() {
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(true);

  async function fetchSelectedBooks() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
    );
    setBooks(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchSelectedBooks();
  }, []);

  return (
    <>
      <div className="for-you__title">Selected just for you</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        books.map((book, index) => (
          <Link
            className="selected__book"
            href="foryou/book/f9gy1gpai8"
            key={index}
          >
            <div className="selected__book--sub-title">{book.subTitle}</div>
            <div className="selected__book--line"></div>
            <div className="selected__book--content">
              <figure className="book__image--wrapper" style={{height: 140, width: 140, minWidth: 140}}>
                <img
                  className="book__image"
                  // style={"display: block"}
                  src={book.imageLink}
                ></img>
              </figure>
              <div className="selected__book--text">
                <div className="selected__book--title">{book.title}</div>
                <div className="selected__book--author">{book.author}</div>
                <div className="selected__book--duration-wrapper">
                  <div className="selected__book--icon">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                    </svg>
                  </div>
                  <div className="selected__book--duration">3 min 23 secs</div>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
    </>
  );
}
