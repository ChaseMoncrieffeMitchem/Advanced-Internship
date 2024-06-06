import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";
import Logout from "./modals/Logout";
import { useDispatch } from "react-redux";
import { openLoginModal } from "@/redux/modalSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export default function Landing() {

  const dispatch = useDispatch();

  useEffect(() => {
      const subscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          window.location = "/foryou"
        }
      });
      return subscribe;
  }, []);
  return (
    <>
      <section id="landing">
        <div className="container">
          <div className="row">
            <div className="landing__wrapper">
              <div className="landing__content">
                <div className="landing__content__title">
                  Gain more knowledge <br className="remove--tablet" />
                  in no time!
                </div>
                <div className="landing__content__subtitle">
                  Great summaries for busy people,
                  <br className="remove--tablet" />
                  individuals who barely have time to read,
                  <br className="remove--tablet" />
                  and even people who don’t like to read.
                </div>
                <button
                  onClick={() => dispatch(openLoginModal())}
                  className="btn home__cta--btn"
                >
                  Login
                </button>
                <LoginModal />
                <SignupModal />
                <br />
                <Logout />
              </div>
              <figure className="landing__image--mask">
                <Image
                  src="/images/landing.png"
                  alt="landing"
                  width={100}
                  height={100}
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
