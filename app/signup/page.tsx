"use client";
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import style from '@/style/SignUp.module.scss'
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { MdLock, MdMail } from "react-icons/md"
import { BsPersonFill } from 'react-icons/bs'

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({});

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch("/api/signup", { method: "POST", body: JSON.stringify(form) })
      .then(res => {
        if (res.status == 200) {
          router.replace("/login");
        }
      });
  };

  return (
    <>
      <NavBar />
      <div className={style.signup_page}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email"><MdMail /></label>
            <input id="email" type="text" placeholder="email" onChange={(e) => { setForm({ ...form, email: e.target.value }) }} />
          </div>

          <div>
            <label htmlFor="username"><BsPersonFill /></label>
            <input id="username" type="text" placeholder="username" onChange={(e) => { setForm({ ...form, username: e.target.value }) }} />
          </div>

          <div>
            <label htmlFor="password"><MdLock /></label>
            <input id="password" type="password" placeholder="password" onChange={(e) => { setForm({ ...form, password: e.target.value }) }} />
          </div>
          <button>Sign Up</button>
        </form>

      </div>
      <Footer />
    </>
  )
}
