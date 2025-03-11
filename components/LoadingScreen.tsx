"use client"

import React, {CSSProperties} from "react";
import { RingLoader } from "react-spinners";
import { useAuthContext } from "@/context/AuthContext";

const override: CSSProperties = {
    margin: "0 auto",
    borderColor: "red",
    position: 'absolute',
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  };

export const LoadingScreen = () => {



    return (
        <RingLoader
            loading={true}
            color={"#2a0f4a"}
            size={40}
            cssOverride={override}
            speedMultiplier={1.8}
        />
/*         <div 
            className="w-full h-full bg-white flex justify-center items-center"
            style={{
                width: window.innerWidth,
                height: window.innerHeight
            }}
        >

        </div> */
    )
}