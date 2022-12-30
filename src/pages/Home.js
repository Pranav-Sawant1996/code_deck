import React from 'react'
import LeftPannel from '../components/home/LeftPannel'
import RightPannel from '../components/home/RightPannel'
import Modal from '../components/Modal'
import { ModalContext } from '../context/ModalContext'

const Home = () => {
  const {isOpenModal}=React.useContext(ModalContext)
  // console.log(isOpenModal)
  return (
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2'>
            <div className='md:w-full sm:w-full w-5/12'>
                <LeftPannel />
            </div>
            <div className='md:w-full sm:w-full w-7/12 border-2 border-black'>
                <RightPannel />
            </div>
            {isOpenModal.show && <Modal/>}
        </div>
  )
}

export default Home