import React, { createContext } from "react";
import { useContext, useState } from "react";


export const ModalContext= createContext()

function ModalProvider({children}){
    const initialModalFields={
        show:false,
        modalType:'',
        idnetifiers:{
            folderId:'',
            cardId:''
        }
    }

    const [isOpenModal,setIsOpenModal]=useState({...initialModalFields})
    
    const openModal=(value)=>{
        // console.log(value)
        setIsOpenModal(value)
    }

    const closeModal=()=>{
        setIsOpenModal({...initialModalFields})
    }

    const ModalFeatures={
        isOpenModal:isOpenModal,
        openModal:openModal,
        closeModal:closeModal
    }


    return(
        <ModalContext.Provider value={ModalFeatures}>
            {children}
        </ModalContext.Provider>
    )
}
export default ModalProvider    

