import { useCallback, useEffect, useRef, useState } from "react"

function App() {

const [length , setLength] = useState(8)
const [numberAllowed , setnumberAllowed] = useState(false)
const [charAllowed , setcharAllowed] = useState(false)
const [password , setPassword] = useState("")
const passRef = useRef(null)

const passwordGenrator = useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNPOQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(numberAllowed){
    str= str + "0123456789"
  }
  if(charAllowed){
    str= str + "!@#$%^&*"
  }

  for( let i = 1 ; i <= length ;i++){
    let char = Math.floor(Math.random()*str.length+1)
    pass=pass+ str.charAt(char)
  }
  setPassword(pass)
}, [length,numberAllowed,charAllowed,setPassword])

const passwordCopy = useCallback(()=>{
  passRef.current?.select()
  window.navigator.clipboard.writeText(password )
},[password])

useEffect (()=>{
  passwordGenrator()
},[length,numberAllowed,charAllowed,passwordGenrator])


  return (
    <>
    <h1 className="text-center text-4xl">PassWord Generator</h1>
    <div className="flex">
      <input 
      className="shadow rounded-lg"
      type="text"
      value={password}
      placeholder="password"
      readOnly
      ref={passRef}
      />
      <button
      onClick={passwordCopy}
      >Copy</button>
    </div>
    <div className="flex gap-2">
      <input
      type="range"
      min={6}
      max={30}
      value={length}
      className="cursor-pointer"
      onChange={(e)=>{setLength(e.target.value)}}
      /> <label>Length:{length}</label>

      <input
      type="checkbox"
      defaultChecked = {numberAllowed}
      id="numberInput"
      onChange={()=>{setnumberAllowed((prev)=> !prev)}}
      /> <label>Numbers</label>

      <input
      type="checkbox"
      defaultChecked = {charAllowed}
      id="charInput"
      onChange={()=>{setcharAllowed((prev)=> !prev)}}
      /> <label>Character</label>
    </div>
    </>
  )
}

export default App
