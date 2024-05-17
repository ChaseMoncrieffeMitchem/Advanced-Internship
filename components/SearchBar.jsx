import React, { useEffect, useState, useCallback } from "react";
import styles from "@/styles/Search.module.css";
import axios from "axios";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [bookResults, setBookResults] = useState(null);
  const [] = useState();

  const debounce = (callback, delay) => {
    let timerId;
    return function (...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    };
  };

  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    []
  );

  const handleSearchChange = (event) => {
    debouncedSetSearch(event.target.value);
  };

  useEffect(() => {

    const fetchBySearch = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
        );
        setBookResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchBySearch();
  }, [search]);

  return (
    <>
      <div className={styles.background}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.search}>
              <div className={styles.inputWrapper}>
                <input
                  className={styles.input}
                  placeholder="Search for books"
                  type="text"
                  onChange={handleSearchChange}
                />
                <div className={styles.icon}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className={styles.toggleBtn}>
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="0"
                viewBox="0 0 15 15"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <div className={styles.booksWrapper}>
            {!bookResults ? (
              <div>Loading...</div>
            ) : (
              bookResults?.map((bookResult) => {
                <a className={styles.bookLink} href="">
                  <audio src={bookResult.audioLink}></audio>
                  <figure className={styles.imageWrapper}>
                    <Image
                      className={styles.image}
                      src={bookResult.imageLink}
                      width={80}
                      //   style="display: block"
                    ></Image>
                  </figure>
                  <div>
                    <div className={styles.title}>{bookResult.title}</div>
                    <div className={styles.author}>{bookResult.author}</div>
                    <div className={styles.duration}>
                      <div className={styles.details}>
                        <div className={styles.detailsIcon}>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                            <path d="M13 7h-2v6h6v-2h-4z"></path>
                          </svg>
                        </div>
                        <div className={styles.detailsText}>03:24</div>
                      </div>
                    </div>
                  </div>
                </a>;
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
