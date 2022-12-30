import React, { useContext, useState } from 'react'
import CodeEditor from '../components/playground/CodeEditor'
import EditorContainer from '../components/playground/EditorContainer'
import InputConsole from '../components/playground/InputConsole'
import Navbar from '../components/playground/Navbar'
import OutputConsole from '../components/playground/OutputConsole'
import { useParams } from 'react-router'
import {PlaygroundContext, languageMap} from '../context/PlaygroundContext'
import { ModalContext } from '../context/ModalContext'
import Modal from '../components/Modal'
import { Buffer } from 'buffer'
import  axios  from 'axios'



const Playground = () => {

  const {folderId, playgroundId} = useParams()
  const {folders, savePlayground}= useContext(PlaygroundContext)
  const {isOpenModal, openModal, closeModal} =useContext(ModalContext)
  const {title, language, code} = folders[folderId].playground[playgroundId]

  const [currCode,setCurrCode] = useState(code)
  const [currLanguage,setcurrLanguage]= useState(language)
  const [currInput,setCurrInput]=useState('')
  const [currOutput,setCurrOutput]=useState('')
  const [isFullScreen, setIsFullScreen]=useState(false)

  const saveCode= () => {
    savePlayground(folderId,playgroundId,currCode,currLanguage)
  }
  const encode = (str)=>{
    return Buffer.from(str,'binary').toString('base64')
  }
  const decode =(str)=>{
    return Buffer.from(str,'base64').toString()
  }

  const postSubmission = async (language_id, source_code, stdin) => {
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b4e5c5a05fmsh9adf6ec091523f8p165338jsncc58f31c26e1',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: JSON.stringify({
        language_id: language_id,
        source_code: source_code,
        stdin: stdin
      })
    }
    const res = await axios.request(options)
    return res?.data?.token
  }

  const getOutput = async (token) => {
    const options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Key': 'b4e5c5a05fmsh9adf6ec091523f8p165338jsncc58f31c26e1',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    }
    const res = await axios.request(options)

    if (res?.data?.status_id <= 2) {
      const res2 = await getOutput(token)
      return res2.data
    }
    return res?.data
  }

  const runCode = async ()=>{
    openModal({
      show:true,
      modalType:6,
      indetifiers:{
        folderId:'',
        cardId:''
      }
    })
    const language_id = languageMap[currLanguage]
    const source_code= encode(currCode)
    const stdin=encode(currInput)
    const token = await postSubmission(language_id, source_code, stdin)

    const res = await getOutput(token)
    const status_name = res.status.description
    const decoded_output = decode(res.stdout ? res.stdout : "")
    const decoded_error = decode(res.stderr ? res.stderr : "")
    const decoded_compile_output = decode(res.compile_output ? res.compile_output : "")

    let final_output = ''
    if (res.status_id !== 3) {
      if (decoded_compile_output = "") {
        final_output = decoded_output
      }
      else {
        final_output = decoded_compile_output
      }
    }
    else {
      final_output = decoded_error
    }
    setCurrOutput(status_name + "\n\n" + final_output)
    closeModal();
  }

  const getFile = (e, setState) => {
    const input = e.target
    if ("files" in input && input.files.length > 0) {
      placeFileContent(
        input.files[0], setState
      )
    }
  }
  const placeFileContent = (file, setState) => {
    readFileContent(file).then(content => {
      setState(content)
    }).catch(error => console.log(error))
  }
  const readFileContent = (file) => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file)
    })
  }


  return (
    <div>Playground


    </div>
  )
}

export default Playground