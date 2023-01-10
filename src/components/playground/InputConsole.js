import React from 'react'
import { BiImport } from 'react-icons/bi'

function InputConsole({currInput,setCurrInput,getFile}) {
  return (
    <div className='flex flex-col'>
      <div className='bg-[#ededed] p-4 flex justify-between'>
        <h3 className='font-bold'>Input :</h3>
        <label htmlFor="inputfile" className='flex items-center font-semibold gap-3'>
          <input className="hidden" type="file" accept="." id="inputfile" onChange={(e) => getFile(e, setCurrInput)} /> <BiImport style={{ fontSize: "1.5rem" }} /> Import Input
        </label>
      </div>
      <textarea className='h-[calc(50vh_-_4rem)] resize-none' onChange={(e) => setCurrInput(e.target.value)}
        value={currInput} />
    </div>
  )
}

export default InputConsole