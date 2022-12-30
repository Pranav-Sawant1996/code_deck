import React, { useContext } from 'react'
import {ModalContext} from '../context/ModalContext'
import NewFolder from './modaltypes/NewFolder'
import NewPlayground from './modaltypes/NewPlayground'
import NewPlaygroundAndFolder from './modaltypes/NewPlaygroundAndFolder'
import EditFolder from './modaltypes/EditFolder'
import EditPlaygroundTitle from './modaltypes/EditPlaygroundTitle'
import Loading from './modaltypes/Loading'
function Modal() {
    
    const {isOpenModal} = useContext(ModalContext)
    const {modalType}=isOpenModal
    // console.log(isOpenModal)
  return (
    <>
    <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className="relative w-auto my-6 mx-auto max-w-3xl" onClick={(e)=>{e.stopPropagation()}}>
            <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-[30rem] bg-white outline-none focus:outline-none">
            {
                modalType===1 && <NewFolder/>
            }
            {
                modalType===2 && <NewPlayground/>
            }
            {
                modalType===3 && <NewPlaygroundAndFolder/>
            }
            {
                modalType===4 && <EditFolder/>
            }
            {
                modalType===5 && <EditPlaygroundTitle/>
            }
            {
                modalType===6 && <Loading/>
            }
            </div>

        </div>

    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default Modal