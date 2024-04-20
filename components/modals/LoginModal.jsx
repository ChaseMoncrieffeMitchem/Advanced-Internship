import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";

export default function LoginModal() {
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  function handleLogin() {
    
  }

  
  return (
    <>
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
            ></input>
            <input
              placeholder="Password"
              className="h-10 mt-8 rounded-md bg-black border border-gray-600 text-white p-6"
              type={"password"}
            ></input>
            <button
              className="btn mt-8"
            >
              Login
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
