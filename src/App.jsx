import { useState,useCallback,useEffect,useRef } from 'react'

import './App.css'

function App() {
  const[length , getlength] = useState(8)
  const[numallowed,getnumallowed] = useState(false);
  const[chrallowed , getchrallowed] = useState(false);
  const[password, getpassword] = useState("");
 

  const passwordRef = useRef(null)

  const PasswordGenerator = useCallback(() =>{
    let pass = " "
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghklmnopqrstuvwxyz";
    if(numallowed) str += "0123456789";
    if(chrallowed) str += "!@#$%^&*(-+~`<?_";
    for(let i=0; i<= length; i++){
      let char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
    }
    getpassword(pass)
  },[length,getnumallowed,getchrallowed])
  const copypassword = useCallback(() =>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() =>{
    PasswordGenerator()
  },[length,getnumallowed,getchrallowed,PasswordGenerator])
  return (
    <>
      <div >
        <h1>Password Generator</h1>
        <div>
          <input type="text"  placeholder='Password' readOnly value={password}
           ref={passwordRef}
           />
          <button onClick={copypassword}>Copy</button>
        </div>
        <div>
          <div>
            <input type="range" min={6} max={90} value={length} onChange={(e) =>{getlength(e.target.value)}}/>
            <label >Length :{length}</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked ={numallowed} id='numberinp' onChange={()=>{
              getnumallowed((prev) => !prev)
            }} />
            <label htmlFor="numberinp">Number</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked ={chrallowed} id='chrallwd' onChange={() =>{
              getchrallowed((prev) => !prev)
            }}/>
            <label htmlFor="chrallwd">Character</label>
          </div>
        </div>
      </div>
        
    </>
  )
}

export default App
