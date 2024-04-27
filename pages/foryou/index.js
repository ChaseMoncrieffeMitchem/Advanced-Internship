import { AudioPlayer } from "@/components/AudioPlayer";
import Sidebar from "@/components/Sidebar";
import RecommendedBooks from "@/components/bookApis/RecommendedBooks";
import SelectedBooks from "@/components/bookApis/SelectedBooks";
import SuggestedBooks from "@/components/bookApis/SuggestedBooks";
import React from "react";

export default function forYou() {
  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="row">
          <div className="container">
            <div className="for-you__wrapper">
              <SelectedBooks />
              <RecommendedBooks />
              <SuggestedBooks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
