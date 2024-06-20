import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false);
  const [ogPassword , setOgPassword] = useState("");

  const passRef = useRef(null);

  const password = useCallback( () => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if(numbersAllowed){
      str+="1234567890";
    }
    if(charAllowed){
      str+="!@#$%^&*";
    }

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random()*(str.length));
      pass += str[char];
    }

    setOgPassword(pass);
  } , 
    [length , numbersAllowed , charAllowed]);

  const copyToClipboard = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(ogPassword)
  } , [ogPassword])

  useEffect(() => {password()} , [length , numbersAllowed , charAllowed , password]);

  return (
    <div className=' w-full h-screen bg-black  flex justify-center'>
      <div className=' w-3/5 bg-slate-950 absolute top-14 rounded-xl'>
          <h1 className=' text-center px-4 text-white py-2'>Password Generator</h1>
          <div className='flex justify-center w-full py-3 px-4 rounded-xl'>
          <input

            type='text'
            value={ogPassword}
            className='outline-none w-full py-1 px-2 rounded-l-xl'
            placeholder='Password'
            readOnly
            ref = {passRef}
          />
          <button onClick={copyToClipboard} className=' bg-blue-950 text-white px-2 py-1 rounded-r-xl'>
            Copy
          </button>
          </div>
          <div className='flex flex-wrap align-middle my-2 mx-6 gap-4'>
          <input
            type='range'
            min = {8}
            max = {20}
            className=''
            value = {length}
            onChange={(e) => {setLength(e.target.value)}}
          />
          <label className='text-white'>
            Length: {length}
          </label>
          <div className='flex align-middle gap-1'>
          <input
          type='checkbox'
          defaultChecked = {numbersAllowed}
          onChange={() => {
            setNumberAllowed((prev) => (!prev))}}
          />
          <label className='text-white'>Numbers</label>
          </div>
          <div className='flex align-middle gap-1'>
          <input
          type='checkbox'
          defaultChecked = {charAllowed}
          onChange={() => {setCharAllowed((prev) => (!prev))}}
          />
          <label className='text-white'>Special Characters</label>
          </div>
          </div>
      </div>
    </div>
  )
}

export default App
