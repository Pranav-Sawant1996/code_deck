import React, { useContext, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { ModalContext } from '../../context/ModalContext'
import { PlaygroundContext } from '../../context/PlaygroundContext'
import Select from 'react-select';

function NewPlayground() {
  const { isOpenModal, closeModal } = useContext(ModalContext);
  const { addPlayground } = useContext(PlaygroundContext);

  const languageOptions = [
      { value: "cpp", label: "cpp" },
      { value: "java", label: "java" },
      { value: "javascript", label: "javascript" },
      { value: "python", label: "python" },
  ];

  const { folderId } = isOpenModal.identifiers;
  const [cardTitle, setCardTitle] = useState("");
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
              <h2>Create New Playground</h2>

              <input
                  type="text"
                  // value={folderTitle}
                  // onChange={(e) => setFolderTitle(e.target.value)} 
                  placeholder='Playground Title'
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
                      addPlayground(folderId, cardTitle, language.label)
                      closeModal();
                  }}> Create Playground </button>
          </div>
      </>
  )
}

export default NewPlayground