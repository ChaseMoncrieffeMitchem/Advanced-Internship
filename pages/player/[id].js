import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { AudioPlayer } from "@/components/AudioPlayer";
import SearchBar from "@/components/SearchBar";

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
      <SearchBar />
      <Sidebar />
      <div className="row">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="container">
            <h1>{book?.title}</h1>
            <p className="player__paragraph">{book?.summary}</p>
          </div>
        )}
      </div>
      <div className="audio__wrapper">
        <AudioPlayer book={book} />
      </div>
    </>
  );
}
