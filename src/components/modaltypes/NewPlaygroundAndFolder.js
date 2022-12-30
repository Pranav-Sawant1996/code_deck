import React, { useContext, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { RxCross1 } from 'react-icons/rx'
import Select from 'react-select';
import { ModalContext } from '../../context/ModalContext'
  import { PlaygroundContext } from '../../context/PlaygroundContext'

function NewPlaygroundAndFolder() {
  const { closeModal } = useContext(ModalContext);
  const { addPlaygroundAndFolder } = useContext(PlaygroundContext);

  const languageOptions = [
    { value: "cpp", label: "cpp" },
    { value: "java", label: "java" },
    { value: "javascript", label: "javascript" },
    { value: "python", label: "python" },
  ];

  const [playgroundName, setPlaygroundName] = useState("")
  const [folderName, setFolderName] = useState("")
  const [language, setLanguage] = useState(languageOptions[0]);

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption);
  };


  return (
    <>
      <div className='flex flex-row justify-end p-4'>
        <RxCross1 onClick={() => closeModal()} />
      </div>

      <div class="px-6 py-4  mb-8 flex flex-col items-center justify-center gap-6">
        <h2>Create New Playground & Create New Folder</h2>
        <label>Enter Folder Name</label>
        <input
          type="text"
          // value={folderTitle}
          onChange={(e) => setFolderName(e.target.value)}
          className={`w-full  p-3  border-[0.5px] text-sm border-gray rounded-lg shadow-sm`}
        />
        <label>Enter PlayGround Name</label>
        <input
          type="text"
          // value={folderTitle}
          onChange={(e) => setPlaygroundName(e.target.value)}
          className={`w-full  p-3  border-[0.5px] text-sm border-gray rounded-lg shadow-sm`}
        />
        <Select
          options={languageOptions}
          value={language}
          onChange={handleLanguageChange}
        />
        <button
          className="p-3 w-28 text-black bg-white rounded-lg font-semibold  bg-darkBlue border-[1px] border-darkBlue shadow-lg"
          onClick={() => {
            addPlaygroundAndFolder(folderName, playgroundName, language.label)
            closeModal();
          }}> Create Playground </button>
      </div>
    </>
  )
}

export default NewPlaygroundAndFolder