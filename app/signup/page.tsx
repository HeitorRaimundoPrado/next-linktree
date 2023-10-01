"use client";
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="email" onChange={(e) => { setForm({ ...form, email: e.target.value }) }} />
      <input type="text" placeholder="username" onChange={(e) => { setForm({ ...form, username: e.target.value }) }} />
      <input type="password" placeholder="password" onChange={(e) => { setForm({ ...form, password: e.target.value }) }} />
      <button>Sign Up</button>
    </form>
  )
}
