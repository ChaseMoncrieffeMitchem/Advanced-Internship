import React from "react"
import Image from "next/image"
import { useDispatch } from "react-redux";
import { openLoginModal } from "@/redux/modalSlice";
 
export default function Navbar() {

  const dispatch = useDispatch();

  return (
    <>
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <Image className="nav__img" src="/images/logo.png" alt="logo" width={100} height={100}/>
          </figure>
          <ul className="nav__list--wrapper">
            <li className="nav__list nav__list--login" onClick={() => dispatch(openLoginModal())}>Login</li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>
    </>
  );
}
