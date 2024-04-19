import React from "react"
import Image from "next/image"
 
export default function Navbar() {
  return (
    <>
      <nav class="nav">
        <div class="nav__wrapper">
          <figure class="nav__img--mask">
            <Image class="nav__img" src="/images/logo.png" alt="logo" width={100} height={100}/>
          </figure>
          <ul class="nav__list--wrapper">
            <li class="nav__list nav__list--login">Login</li>
            <li class="nav__list nav__list--mobile">About</li>
            <li class="nav__list nav__list--mobile">Contact</li>
            <li class="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>
    </>
  );
}
