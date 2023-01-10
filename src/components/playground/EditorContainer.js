import React from 'react'
import { ModalContext } from '../../context/ModalContext'
import { BiEditAlt, BiImport, BiExport, BiFullscreen } from 'react-icons/bi'
import { languageMap } from '../../context/PlaygroundContext'
import CodeEditor from './CodeEditor'
import Select from 'react-select'


function EditorContainer({
  title,
  currLanguage,
  setCurrLanguage,
  currCode,
  setCurrCode,
  folderId,
  playgroundId,
  saveCode,
  runCode,
  getFile,
  isFullScreen,
  setIsFullScreen
}) {
  const { openModal } = React.useContext(ModalContext)

  const themeOptions = [
    { value: 'githubDark', label: 'githubDark' },
    { value: 'githubLight', label: 'githubLight' },
    { value: 'bespin', label: 'bespin' },
    { value: 'duotoneDark', label: 'duotoneDark' },
    { value: 'duotoneLight', label: 'duotoneLight' },
    { value: 'dracula', label: 'dracula' },
    { value: 'xcodeDark', label: 'xcodeDark' },
    { value: 'xcodeLight', label: 'xcodeLight' },
    { value: 'vscodeDark', label: 'vscodeDark' },
    { value: 'vscodeLight', label: 'vscodeLight' },
    { value: 'okaidia', label: 'okaidia' },
  ]

  const languageOptions = [
    { value: 'cpp', label: 'cpp' },
    { value: 'javascript', label: 'javascript' },
    { value: 'java', label: 'java' },
    { value: 'python', label: 'python' },
  ]

  const handleThemeChange = (selectedOption) => {
    setCurrTheme(selectedOption)
  }
  const handleLanguageChange = (selectedOption) => {
    setCurrLanguage(selectedOption.value)
    setLanguage(selectedOption)
    setCurrCode(languageMap[selectedOption.value].defaultCode)
  }

  const [currTheme, setCurrTheme] = React.useState(themeOptions[0])

  const [language, setLanguage] = React.useState(() => {
    for (let i = 0; i < languageOptions.length; i++) {
      if (languageOptions[i].value === currLanguage.value) {
        return languageOptions[i].value
      }
    }

  })


  return (
    <div className={`flex flex-col ${isFullScreen ? 'h-100vh' : 'h-[calc(100vh - 4.5rem)]'}`}>
    {
      !isFullScreen &&
      <div className='bg-white flex justify-between items-center flex-wrap p-4'>
        <div className='flex items-center gap-4'>
          <h3 className='font-bold'>{title}</h3>
          <BiEditAlt style={{ fontSize: "1.5rem" }}
            onClick={
              () => openModal({
                show: true,
                modalType: 5,
                identifiers: {
                  folderId: folderId,
                  cardId: playgroundId
                }
              })} />
          <button className='font-normal rounded-full p-3 bg-[#0097d7]'> Save Code</button>
        </div>
        <div className='flex gap-4'>
          <Select
            options={languageOptions}
            value={language}
            onChange={handleLanguageChange}
          />
          <Select
            options={themeOptions}
            value={currTheme}
            onChange={handleThemeChange}
          />
        </div>
      </div>
    }
    <CodeEditor
      currentCode={currCode}
      setCurrentCode={setCurrCode}
      currentTheme={currTheme}
      currentLanguage={currLanguage}
      isFullScreen={isFullScreen}
    />
    <div className='bg-white flex justify-between items-center p-4'>
      <button className='flex gap-3 items-center' onClick={() => setIsFullScreen((isFullScreen) => !isFullScreen)}>
        <BiFullscreen style={{ fontSize: "1.5rem" }} /> {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>

      <label htmlFor="inputfile" className='flex items-center font-semibold gap-3'>
        <input className="hidden" type="file" accept="." id="inputfile" onChange={(e) => getFile(e, setCurrCode)} /> <BiImport style={{ fontSize: "1.5rem" }} /> Import Code
      </label>

      <a className='flex gap-3 items-center ' href={`data:text/plain;charset=utf-8,${encodeURIComponent(currCode)}`} download="code.txt">
        <BiExport style={{ fontSize: "1.5rem" }} /> Export Code

      </a>
      <button className='font-normal rounded-full p-2 bg-[#0097d7]' onClick={runCode}>
        RunCode
      </button>


    </div>
  </div>
  )
}

export default EditorContainer