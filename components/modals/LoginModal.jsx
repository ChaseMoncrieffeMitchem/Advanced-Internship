import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  closeLoginModal,
  openLoginModal,
  openSignupModal,
} from "@/redux/modalSlice";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInAnonymously,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, initFirebase } from "@/firebase";
import { useAuth } from "@/contexts/authContext";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { IoClose } from "react-icons/io5";

export default function LoginModal() {
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const app = initFirebase();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  async function guestLogin() {
    try{
      await setPersistence(auth, browserLocalPersistence); 
      const email = "guest@email.com"
      const password = "test123"
      await signInWithEmailAndPassword(auth, email, password);
      const person = auth.currentUser;
      if (person) {
        setUser({email: person.email})
        window.location = "/foryou"
      }
    } catch (error) {
      alert(error)
    }
  }

  async function googleSignIn() {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user) {
      dispatch(setUser(auth.currentUser.email));
      window.location = "/foryou";
    }
  }

  async function handleSignIn() {
    await signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        const subscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            window.location = "/foryou";
            dispatch(closeLoginModal());
            dispatch(setUser(currentUser.email));
          }
        });
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          setErrorMessage("Please enter valid email address");
        }
        if (err.code === "auth/invalid-credential") {
          setErrorMessage("Invalid Email and Password Combination");
        }
        if (password.length < 6) {
          setErrorMessage("Password is too short");
        }
        if (!password) {
          setErrorMessage("Please input password");
        }
        if (!email) {
          setErrorMessage("Please input email");
        }
      });
  }

  useEffect(() => {
    if (isSignedIn) return;
    if (!isSignedIn) {
      const subscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // window.location = "https://summarist.vercel.app/for-you"
          // console.log("You're In");
          dispatch(closeLoginModal());
        }
      });
      return subscribe;
    }
  }, []);

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal()) && setErrorMessage("")}
        className="flex justify-center items-center"
      >
        <div className="w-[90%] h-fit bg-white md:w-[560px] md:h-[600px] border border-transparent rounded-lg flex justify-center relative">
          <IoClose
            className="absolute top-1 right-1 cursor-pointer z-50"
            style={{ width: "30px", height: "30px" }}
            onClick={() => dispatch(closeLoginModal()) && setErrorMessage("")}
          />
          <div className="w-[90%] mt-16 flex flex-col">
            <div className="w-full z-50"></div>
            <button
              className="mb-4 py-2 px-4 flex items-center gap-2  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              onClick={() => guestLogin()}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 448 512"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
              </svg>
              <span>Login as Guest</span>
            </button>
            <button
              onClick={() => googleSignIn()}
              class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
            >
              <img
                class="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Login with Google</span>
            </button>
            <h1 className="text-center mt-4 font-bold text-lg">or</h1>
            <input
              placeholder="Email"
              className="h-10 mt-8 rounded-md bg-black border border-gray-600 text-white p-6"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              placeholder="Password"
              className="h-10 mt-8 rounded-md bg-black border border-gray-600 text-white p-6"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className="btn mt-8" onClick={handleSignIn}>
              Login
            </button>
            <br></br>
            <button
              onClick={() =>
                dispatch(openSignupModal()) && dispatch(closeLoginModal())
              }
            >
              Don't have an account?
            </button>
            <br></br>
            {errorMessage && <p className=" text-pink-900">{errorMessage}</p>}
          </div>
        </div>
      </Modal>
    </>
  );
}
