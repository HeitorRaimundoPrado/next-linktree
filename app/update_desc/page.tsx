"use client";

import { useRouter } from 'next/navigation'
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer"
import { useState } from 'react'
import style from "@/style/UpdateDesc.module.scss"

export default function Page() {
  const [newDesc, setNewDesc] = useState<string>("");
  const { push } = useRouter();

  const handleNewDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewDesc(e.target.value);
  }

  const handleUpdateDescription = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/update_desc", { method: "POST", body: JSON.stringify({ newDesc: newDesc }) })
    push("/profile")
  }

  return (
    <>
      <NavBar />
      <div className={style.update_desc}>
        <form onSubmit={handleUpdateDescription}>
          <textarea onChange={handleNewDescChange}></textarea>
          <button>Update description</button>
        </form>
      </div>
      <Footer />
    </>
  )
}
