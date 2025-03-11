"use client"

import React, { useState } from "react";
import { CloseButton } from "../CloseButton";
import GroupForm from "./GroupForm";

interface ModalProps {
    closeModal: () => void;
}

export const GroupCreationModal: React.FC<ModalProps> = ({closeModal}) => {

    return (
        <div 
            className="w-screen h-screen flex justify-center items-center bg-slate-800/30 dark:bg-white/15" 
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: "translate(-50%, -50%)"
            }}
        >
            <div 
                className="w-1/4 p-0 m-0 relative bg-white dark:bg-black shadow-md rounded-lg flex flex-row justify-between items-center overflow-hidden"
                /* style={{height: '40%'}} */
            >
                <CloseButton 
                    onClick={closeModal} 
                    size="md" 
                    style={{
                        position: 'absolute',
                        right: '20px',
                        top: '20px',

                    }}
                />
                <div
                    className="flex flex-col justify-center items-center gap-10 p-12 h-full"
                    style={{width: '100%'}}
                >
                    <p 
                        className="font-semibold text-3xl text-slate-500 dark:text-white/90 w-full"
                    >
                        Create your group.
                    </p>
                    <GroupForm />
                </div>
            </div>
        </div>
    )
}