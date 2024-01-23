//  Dependencies
// ===========================================================

import React, { useState } from "react";
import "./Modal.css";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "#stores/components/settingsSlice";

//  Dependencies
// ===========================================================

import unisat from "#assets/wallets/unisat.png";
import litescribe from "#assets/wallets/litescribe.png";
import dogchain from "#assets/wallets/dogchain.svg";

export default function Modal({ modalState, requestUnisatAccounts }) {
  // Hooks
  const dispatch = useDispatch();
  const user = useSelector((state) => state.settings.user);

  // Variables
  const { modal, setModal } = modalState;

  // Functions

  const requestAccounts = async () => {
    try {
      const accounts = await window.unisat.requestAccounts();
      console.log("connect success", accounts);
      setWallet(accounts[0]);
      setIsConnected(true);
    } catch (e) {
      console.log("connect failed");
      console.log(e);
      setIsLoggedOut(true);
    }
  };

  const requestUnisatAccountsZ = async () => {
    try {
      const accounts = await window.unisat.requestAccounts();
      dispatch(updateUser({ address: accounts[0] }));
      setModal(false);
    } catch (e) {
      dispatch(updateUser({}));
    }
  };

  const requestLitescribeAccounts = async () => {
    try {
      const accounts = await window.litescribe.requestAccounts();
      dispatch(updateUser({ address: accounts[0] }));
      setModal(false);
    } catch (e) {
      dispatch(updateUser({}));
    }
  };

  const requestUnielonAccounts = async () => {
    try {
      const accounts = await window.unielon.requestAccounts();
      dispatch(updateUser({ address: accounts[0] }));
      setModal(false);
    } catch (e) {
      dispatch(updateUser({}));
    }
  };

  const removeAccount = () => {
    try {
      dispatch(updateUser({}));
      setModal(false);
    } catch (e) {
      dispatch(updateUser({}));
    }
  };

  return (
    <>
      {user?.address ? (
        <button
          onClick={() => removeAccount()}
          className="text-white text-xl font-semibold bg-[#ffffff50] py-3 px-6 rounded-lg hidden"
        >
          {user?.address?.substring(0, 6)}
        </button>
      ) : (
        <button
          onClick={() => setModal(true)}
          className="text-white font-semibold rounded-lg "
        >
          {"Wallet login"}
        </button>
      )}
      {modal && (
        <div className="w-full h-full fixed top-0 left-0 z-[100] bg-[#00000000] backdrop-blur">
          <div onClick={() => setModal(false)} className="overlay"></div>
          <div className="modal-content">
            <div className="modal-flex justify-center">
              <div className="button-modal"></div>
              <button className="modal-connect" onClick={requestUnisatAccounts}>
                <img src={unisat} alt="" className="unisat-modal" />
                Unisat Wallet
              </button>
              <button className="close-modal" onClick={() => setModal(false)}>
                <AiOutlineClose />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
