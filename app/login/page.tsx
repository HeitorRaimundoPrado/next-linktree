"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import { BsPersonFill } from "react-icons/bs";
import { MdLock } from "react-icons/md";
import style from '@/style/Login.module.scss'

export default function LogIn() {
  const [form, setForm] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/signin", { method: "POST", body: JSON.stringify(form) })
      .then(res => {
        if (res.status === 200) {
          router.replace('/')
        }
      })
  }

  return (
    <>
      <NavBar />
      <div className={style.login_page}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username"><BsPersonFill /></label>
            <input id="username" type="text" onChange={(e) => { setForm({ ...form, username: e.target.value }) }} />
          </div>
          <div>
            <label htmlFor="password"><MdLock /></label>
            <input id="password" type="password" onChange={(e) => { setForm({ ...form, password: e.target.value }) }} />
          </div>
          <button>Log In</button>
        </form>
      </div>
      <Footer />
    </>
  )
}
