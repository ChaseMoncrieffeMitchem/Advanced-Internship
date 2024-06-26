import { closeSignupModal, openLoginModal, openSignupModal } from "@/redux/modalSlice";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { setUser } from "@/redux/userSlice";

export default function SignupModal() {
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSignup() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then(data => dispatch(closeSignupModal())).catch(err => {
      console.log(err)
      if (err.code === "auth/email-already-in-use") {
        setErrorMessage("This email is already in use")
      }
      if (err.code === "auth/invalid-email") {
        setErrorMessage("Please enter a valid email address")
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
    })
    
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return
      console.log(currentUser)
      dispatch(setUser({
        email: currentUser.email
      }))

    })

    return unsubscribe
  }, [])

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignupModal()) && setErrorMessage("")}
        className="flex justify-center items-center"
      >
        <div className="w-[90%] h-fit bg-white md:w-[560px] md:h-[600px] border border-transparent rounded-lg flex justify-center">
          <div className="w-[90%] mt-8 flex flex-col">
            <div className="w-full ">Sign up to Summarist</div>
            <input
              placeholder="Email"
              className="h-10 mt-8 rounded-md bg-black border border-gray-600 text-white p-6"
              type={"email"}
              onChange={e => setEmail(e.target.value)}
            ></input>
            <input
              placeholder="Password"
              className="h-10 mt-8 rounded-md bg-black border border-gray-600 text-white p-6"
              type={"password"}
              onChange={e => setPassword(e.target.value)}
            ></input>
            <button onClick={handleSignup} className="btn mt-8">Sign up</button>
            <br></br>
            <button onClick={() => dispatch(openLoginModal()) && dispatch(closeSignupModal())}>Already have an account?</button>
            <br></br>
            {errorMessage && <p className="text-pink-700">{errorMessage}</p>}
          </div>
        </div>
      </Modal>
    </>
  );
}
