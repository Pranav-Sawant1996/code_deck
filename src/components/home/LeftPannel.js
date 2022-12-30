import React, { useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'

const LeftPannel = () => {
  const {openModal}=useContext(ModalContext)
  return (
    <div className='border-2 border-black h-screen bg-black flex justify-end'>
        
        <div className='mx-auto flex flex-col items-center justify-center gap-3 text-center'>
            <img src='https://code-deck.vercel.app/static/media/logo.cba940861dd8aabf4a90.png'/>
            <h3 className='font-semibold text-white '> Code Deck</h3>
            <h4 className='font-semibold text-white '> Code. Compile. debug</h4>
            <button className='w-full p-4 bg-white shadow-lg  rounded-full drop-shadow-2xl '
            onClick={()=>{
              openModal({
                show:true,
        modalType:3,
        idnetifiers:{
            folderId:'',
            cardId:''
        }
              })
            }}
            >
                + Create New Playground
            </button>
        </div>
    </div>
  )
}

export default LeftPannel