import React, { useEffect, useState } from "react";

import FooterLogo from "#assets/Footer.svg";
import Modal from "#components/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "#stores/components/settingsSlice";

export function Wallet({ wallet, setWallet, isButtonActivated }) {
  const BorderColor = "#404040";

  const [isConnected, setIsConnected] = useState(false);
  const [uniSatAvailable, setUniSatAvailable] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.settings.user);

  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    const checkUniSatAvailability = () => {
      if (typeof window.unisat !== "undefined") {
        setUniSatAvailable(true);
      } else {
        setUniSatAvailable(false);
      }
    };
    checkUniSatAvailability();
  }, []);

  const requestUnisatAccounts = async () => {
    try {
      const accounts = await window.unisat.requestAccounts();
      console.log("connect success", accounts);
      setWallet(accounts[0]);
      setIsConnected(true);
      dispatch(updateUser({ address: accounts[0] }));
      setModal(false);
    } catch (e) {
      console.log("connect failed");
      console.log(e);
      setIsLoggedOut(true);
      dispatch(updateUser({}));
    }
  };

  function formatAddress(address) {
    return address.substr(0, 5) + "..." + address.substr(address.length - 3);
  }
  return (
    <div className="w-full flex flex-col gap-4 justify-center pb-3 items-center">
      <button
        className={`${
          isButtonActivated ? null : "border rounded w-[90%] border-["+BorderColor+"]"
        } flex justify-left items-center gap-3 px-4 text-[#fff] ${wallet ? "py-1" : "py-3"}`}
      >
        <img src={FooterLogo} alt="" />
        <Modal
          modalState={{ modal, setModal, closeModal }}
          requestUnisatAccounts={requestUnisatAccounts}
        />
        <div className="text-left">
          {isButtonActivated ? null : wallet ? <p>Name.Srnme</p> : null}
          <p className="text-xs">
          {isButtonActivated ? null : wallet ? (
            formatAddress(wallet)
          ) : (
            <div></div>
          )}
          </p>
        </div>
      </button>
    </div>
  );
}
