import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function SuggestedBooks() {
  const [books, setbooks] = useState();
  const [loading, setLoading] = useState(true);

  async function fetchSuggestedBooks() {
    const { data } = await axios.get(
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
    );
    setbooks(data);
    setLoading(false);
    console.log(books);

  }

  useEffect(() => {
    fetchSuggestedBooks();
  }, []);

  return (
    <>
      <div className="for-you__title">Suggested Books</div>
      <div className="for-you__sub--title">Browse those books</div>
      <div className="for-you__recommended--books">
        {loading ? (
          <div>Loading...</div>
        ) : (
          books.map((book, index) => (
            <Link
              className="for-you__recommended--books-link"
              href={"/foryou/book/" + book.id}
              key={index}
            >
              <div className="book__pill book__pill--subscription-required">{book.subscriptionRequired === true ? "Premium" : ""}</div>
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
                  <div className="recommended__book--details-text">03:24</div>
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
