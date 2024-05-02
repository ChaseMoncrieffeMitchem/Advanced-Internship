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
          <Link className="selected__book" href="foryou/book/f9gy1gpai8" key={index}>
            <div className="selected__book--sub-title">
              {book.subTitle}
            </div>
            <div className="selected__book--line"></div>
            <div className="selected__book--content">
              <figure
                className="book__image--wrapper-figure"
              >
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
                  <div className="selected__book--icon"></div>
                </div>
                <div className="selected__book--duration">3 min 23 secs</div>
              </div>
            </div>
          </Link>
        ))
      )}
    </>
  );
}
