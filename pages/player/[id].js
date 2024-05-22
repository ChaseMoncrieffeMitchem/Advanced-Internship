import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AudioPlayer } from "@/components/AudioPlayer";
import SearchBar from "@/components/SearchBar";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function playerId() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState(id);
  const [loading, setLoading] = useState(true);

  async function fetchBooks() {
    const response = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setLoading(false);
    setBook(response?.data);
    console.log(response?.data);
  }

  useEffect(() => {
    if (id) {
      fetchBooks();
    }
  }, [id]);

  return (
    <>
      <div className="wrapper">
        <SearchBar />
        <Sidebar style={{ height: "calc(-140px + 100vh)" }} />
        <div className="summary">
          {loading ? (
            <div class="loadingio-eclipse">
              <div class="ldio-rpinwye8j0b">
                <div></div>
              </div>
            </div>
          ) : (
            <>
              <div className="audio__book--summary">
                <h1 className="audio__book--summary-title">
                  <b>{book?.title}</b>
                </h1>
                <p className="audio__book--summary-text">{book?.summary}</p>
              </div>
              <AudioPlayer book={book} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
