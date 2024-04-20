import { closeSignupModal, openSignupModal } from "@/redux/modalSlice";
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

  async function handleSignup() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
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
      <button open={isOpen} onClick={() => dispatch(openSignupModal())}>
        Sign Up
      </button>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
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
          </div>
        </div>
      </Modal>
    </>
  );
}
