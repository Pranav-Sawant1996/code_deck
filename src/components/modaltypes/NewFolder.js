import React, { useContext, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
  import { ModalContext } from '../../context/ModalContext'
  import { PlaygroundContext } from '../../context/PlaygroundContext'

function NewFolder() {
  const { closeModal } = useContext(ModalContext);
  const { addFolder } = useContext(PlaygroundContext)
  const [folderTitle, setFolderTitle] = useState("");

  return (
      <>
          <div className='flex flex-row justify-end p-4'>
              <RxCross1 onClick={() => closeModal()} />
          </div>

          <div class="px-6 py-4  mb-8 flex flex-col items-center justify-center gap-6">
              <h2>Create New Folder</h2>

              <input
                  type="text"
                  value={folderTitle}
                  onChange={(e) => setFolderTitle(e.target.value)} 
                  className={`w-full  p-3  border-[0.5px] text-sm border-gray rounded-lg shadow-sm`}
              />
              <button
                  className="p-3 w-28 text-black bg-white rounded-lg font-semibold  bg-darkBlue border-[1px] border-darkBlue shadow-lg"
                  onClick={() => {
                      addFolder(folderTitle)
                      closeModal()
                    }}
              >
                  Create Folder
              </button>
          </div>
      </>
  )
}

export default NewFolder