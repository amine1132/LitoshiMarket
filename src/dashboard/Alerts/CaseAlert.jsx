import React from "react";
import notification from "#assets/notificationgreen.svg";
import edit from "#assets/pencil.svg";
import trash from "#assets/trashred.svg";

export function CaseAlert({ ticker, price, SecondColor, edit, trash, onDelete }) {
    return (
        <div className="flex mt-3 mb-5 justify-center">
            <div className={`flex flex-col justify-center bg-[${SecondColor}] rounded-2xl w-[92%] h-[150px] `}>
                <div className="mx-8">
                    <div className="flex border-b">
                        <p>{ticker}</p>
                        <p className="text-gray-600">/BRC20</p> {/* Vous pouvez remplacer "BRC20" par le nom réel de la cryptomonnaie */}
                    </div>
                    <div className="flex rounded-lg justify-between items-center">
                        <div className="alert_text">
                            <p className="text-green-500 text-xs font-normal font-semibold leading-normal tracking-tighter flex gap-2">
                                <img src={notification} alt="" />
                                ACTIVE
                            </p>
                            <p>
                                Alert me when price <span className="text-green-500 text-16 font-normal font-extrabold leading-normal tracking-wider">goes over ${price}</span>{" "}
                                {/* Le prix affiché correspond au prix entré dans la modal */}
                            </p>
                            <p className="text-white text-opacity-50 text-sm font-normal font-semibold leading-normal tracking-tighter">Created 6 minutes ago</p>
                        </div>
                        <div className="flex gap-5">
                            <img src={edit} alt="Edit" className="cursor-pointer" />
                            <img src={trash} alt="Delete" className="cursor-pointer" onClick={onDelete} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CaseAlert;
