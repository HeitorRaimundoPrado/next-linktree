"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => { setForm({ ...form, username: e.target.value }) }} />
        <input type="password" onChange={(e) => { setForm({ ...form, password: e.target.value }) }} />
        <button>Log In</button>
      </form>
    </div>
  )
}
