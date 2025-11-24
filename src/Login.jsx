import { useState } from "react";
import { auth, googleProvider } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");

  return (
    <div style={{maxWidth:360, margin:"3rem auto", display:"grid", gap:10}}>
      <h2>Sign in</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
      <button onClick={()=>signInWithEmailAndPassword(auth, email, pass)}>Sign in</button>
      <button onClick={()=>createUserWithEmailAndPassword(auth, email, pass)}>Create account</button>
      <button onClick={()=>signInWithPopup(auth, googleProvider)}>Continue with Google</button>
    </div>
  );
}
