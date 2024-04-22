import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "@/contexts/authContext";
import { setUser } from "@/redux/userSlice";

export default function LoginModal() {
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!isSignedIn) {
  //     setIsSignedIn(true);
  //     await doSignInWithEmailAndPassword(email, password).catch((err) => {
  //       setIsSignedIn(false);
  //       setErrorMessage("Email or Passowrd is Incorrect");
  //     });
  //   }
  // };

  async function handleSignIn() {
    await signInWithEmailAndPassword(auth, email, password).then(data => {
      if (!isSignedIn) {
        const subscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            // window.location = "https://summarist.vercel.app/for-you"
            // console.log("You're In");
            dispatch(closeLoginModal())
            dispatch(setUser(currentUser.email))
            console.log(currentUser.email)
          }
          
          
        })
      };
        
    }).catch((err) => {
      if (err.code === "auth/invalid-email") {
        setErrorMessage("Please enter valid email address")
      }
      if (err.code === "auth/invalid-credential") {
        setErrorMessage( "Invalid Email and Password Combination")
      }
      if (password.length < 6) {
        setErrorMessage("Password is too short");
      }
      if (!password) {
        setErrorMessage("Please input password")
      }
      if (!email) {
        setErrorMessage("Please input email")
      }
    });
  }

  const isLoggedIn = useSelector((state) => state.user.email)
  console.log(isLoggedIn)

  useEffect(() => {
    if (isSignedIn) return;
    if (!isSignedIn) {
      const subscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // window.location = "https://summarist.vercel.app/for-you"
          // console.log("You're In");
          dispatch(closeLoginModal())
        }
      });
      return subscribe;
    }
  }, []);

  return (
    <>
      {/* {!isSignedIn && (<Link href={"/home"} replace={true}/>)} */}
      <button
        onClick={() => dispatch(openLoginModal())}
        className="btn home__cta--btn"
      >
        Login
      </button>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex justify-center items-center"
      >
        <div className="w-[90%] h-fit bg-white md:w-[560px] md:h-[600px] border border-transparent rounded-lg flex justify-center">
          <div className="w-[90%] mt-8 flex flex-col">
            <button className="w-full ">Login as Guest</button>
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
            <button
              className="btn mt-8"
              onClick={handleSignIn}
              // onClick={onSubmit}
            >
              Login
            </button>
            {errorMessage && <p className=" text-pink-900">{errorMessage}</p>}
          </div>
        </div>
      </Modal>
    </>
  );
}
