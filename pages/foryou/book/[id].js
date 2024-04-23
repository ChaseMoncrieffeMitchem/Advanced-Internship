import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function books() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = router.query;

  async function fetchBooks() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setBooks(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <div className="row">
        <audio></audio>
        <div className="container">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="inner__wrapper">
              <div className="inner__book">
                <div className="inner-book__title">{books.title}</div>
                <div className="inner-book__author">{books.author}</div>
                <div className="inner-book__sub--title">
                  {books.subTitle}
                </div>
                <div className="inner-book__wrapper">
                  <div className="inner-book__description--wrapper">
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <svg></svg>
                      </div>
                      <div className="inner-book__overall--rating">{books.averageRating}</div>
                      <div className="inner-book__total--rating">
                        ({books.totalRating} ratings)
                      </div>
                    </div>
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <svg></svg>
                      </div>
                      <div className="inner-book__duration">04:52</div>
                    </div>
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <svg></svg>
                      </div>
                      <div className="inner-book__type">{books.type}</div>
                    </div>
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <svg></svg>
                      </div>
                      <div className="inner-book__key-ideas">6 Key Ideas</div>
                    </div>
                  </div>
                </div>
                <div className="inner-book__read--btn-wrapper">
                  <button className="inner-book__read--btn">
                    <div className="inner-book__read--icon">
                      <svg></svg>
                    </div>
                    <div className="inner-book__read--text">Read</div>
                  </button>
                  <button className="inner-book__read--btn">
                    <div className="inner-book__read--icon">
                      <svg></svg>
                    </div>
                    <div className="inner-book__read--text">Listen</div>
                  </button>
                </div>
                <div className="inner-book__bookmark">
                  <div className="inner-book__bookmark--icon">
                    <svg></svg>
                  </div>
                  <div className="inner-book__bookmark--text">
                    Add Title to My Library
                  </div>
                </div>
                <div className="inner-book__secondary--title">
                  What's it about?
                </div>
                <div className="inner-book__tags--wrapper">
                  <div className="inner-book__tag">{books.tags[0]}</div>
                  <div className="inner-book__tag">{books.tags[1]}</div>
                </div>
                <div className="inner-book__book--description">
                  {books.summary}
                </div>
                <h2 className="inner-book__secondary--title">
                  About the author
                </h2>
                <div className="inner-book__author--description">
                  {books.authorDescription}
                </div>
              </div>
              <div className="inner-book--img-wrapper">
                <figure className="book__image--wrapper">
                  <img
                    className="book__image"
                    src={books.imageLink}
                  ></img>
                </figure>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
