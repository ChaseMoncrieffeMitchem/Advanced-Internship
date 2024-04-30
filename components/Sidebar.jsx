import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { openLoginModal } from "@/redux/modalSlice";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";


export default function Sidebar() {

  const app = initFirebase()
  const auth = getAuth(app)

  const signOut = () => {
    auth.signOut()
    window.location = "/"
  }

  // const dispatch = useDispatch() 
  return (
    <>
      <div className="sidebar__overlay--hidden sidebar__overlay"></div>
      <div className="sidebar sidbar--closed">
        <div className="sidebar__logo">
          <img src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.1b1c490b.png&w=640&q=75"></img>
        </div>
        <div className="sidebar__wrapper">
          <div className="sidebar__top">
            <Link href="/foryou" className="sidebar__link--wrapper">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <svg></svg>
              </div>
              <div className="sidebar__link--text">For You</div>
            </Link>
            <Link href="/library" className="sidebar__link--wrapper">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <svg></svg>
              </div>
              <div className="sidebar__link--text">Library</div>
            </Link>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <svg></svg>
              </div>
              <div className="sidebar__link--text">Highlights</div>
            </div>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <svg></svg>
              </div>
              <div className="sidebar__link--text">Search</div>
            </div>
          </div>
          <div className="sidebar__bottom">
            <Link className="sidebar__link--wrapper" href="/settings">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <svg></svg>
              </div>
              <div className="sidebar__link--text">Settings</div>
            </Link>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <svg></svg>
              </div>
              <div className="sidebar__link--text">Help & Support</div>
            </div>
            <div className="sidebar__link--wrapper">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <svg></svg>
              </div>
              <button onClick={() => signOut()} className="sidebar__link--text">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
