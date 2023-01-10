import React from 'react'
import { BiExport } from 'react-icons/bi'


function OutputConsole({currOutput}) {
  return (
    <div className='flex flex-col'>
    <div className='bg-[#ededed] p-4 flex justify-between'>
      <h3 className='font-bold'>Output : </h3>
      <a className='flex font-semibold gap-4' href={`data:text/plain;charset=utf-8,${encodeURIComponent(currOutput)}`} download="output.txt">
          <BiExport style={{  fontSize: "1.5rem" }} />{" "}Export Output

      </a>
    </div>
    <textarea className='h-[calc(50vh_-_4rem)] resize-none' value={currOutput} readOnly />
  </div>
  )
}

export default OutputConsole