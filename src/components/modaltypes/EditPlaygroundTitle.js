import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'

function EditPlaygroundTitle() {
  const { isOpenModal, closeModal } = React.useContext(ModalContext)
  const { editPlaygroundTitle, folders } = React.useContext(PlaygroundContext)
  const { folderId, cardId } = isOpenModal.identifiers
  
  const [playgroundTitle, setPlaygroundTitle] = React.useState(folders[folderId].playground[cardId].title)
 
  return (
    <>
    <div className='flex flex-row justify-end p-4'>
        <RxCross1 size={'1.5em'} onClick={() => closeModal()} />
    </div>
    <div className='px-6 py-4 mb-8 flex flex-col items-center justify-center gap-6'>
        <h2>Edit Folder Title</h2>
        <input
            type="text"
            value={playgroundTitle}
            onChange={(e) => setPlaygroundTitle(e.target.value)}
            
            className='border-[.5px] border-black  p-3 font-semibold w-full rounded-lg shadow-lg'
        />
        <button
            onClick={() => {
                editPlaygroundTitle(folderId,cardId, playgroundTitle)
                closeModal()
            }}
            className='p-4 w-fit text-black bh-white rounded-lg border-[5px] border-darkBlue shadow-lg '>
            Proceed
        </button>
    </div>
</>
  )
}

export default EditPlaygroundTitle