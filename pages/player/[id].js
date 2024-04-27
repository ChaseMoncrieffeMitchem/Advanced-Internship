import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function playerId() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  async function fetchBooks() {
    console.log(id)
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    setBook(data);
    setLoading(false)
  }

  useEffect(() => {
    fetchBooks();
  }, [book]);

  return (
    <>
      <Sidebar />
      <div className="row">
        {loading ? (
          <div>Loading...</div>
        ) : (
            <div className="container">
              <h1>{book.title}</h1>
              <p>{book.summary}</p>
            </div>
        )}
      </div>
    </>
  );
}
