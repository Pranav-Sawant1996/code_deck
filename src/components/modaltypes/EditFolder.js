import { IoCloseSharp } from 'react-icons/io5'
import React, { useContext, useState } from 'react'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import { RxCross1 } from 'react-icons/rx'

function EditFolder() {
  const { closeModal, isOpenModal } = useContext(ModalContext);
    const { editFolderTitle, folders } = useContext(PlaygroundContext);

    const folderId = isOpenModal?.identifiers?.folderId;
    const [folderTitle, setFolderTitle] = useState(folders[folderId]?.title);
  return (
    <>
            <div className='flex flex-row justify-end p-4'>
                <RxCross1 onClick={() => closeModal()} />
            </div>

            <div class="px-6 py-4  mb-8 flex flex-col items-center justify-center gap-6">
                <h2>Edit Folder Title</h2>

                <input
                    type="text"
                    value={folderTitle}
                    onChange={(e) => setFolderTitle(e.target.value)} 
                    className={`w-full  p-3  border-[0.5px] text-sm border-gray rounded-lg shadow-sm`}
                />
                <button
                    className="p-3 w-28 text-black bg-white rounded-lg font-semibold  bg-darkBlue border-[1px] border-darkBlue shadow-lg"
                onClick={() => {
                    editFolderTitle(folderId, folderTitle)
                    closeModal()
                  }}
                >
                    Proceed
                </button>
            </div>
        </>
  )
}

export default EditFolder