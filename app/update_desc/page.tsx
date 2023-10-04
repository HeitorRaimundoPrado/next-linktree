"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer"
import { useState } from 'react'

export default function Page() {
  const [newDesc, setNewDesc] = useState<string>("");

  const handleNewDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewDesc(e.target.value);
  }

  const handleUpdateDescription = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/update_desc", { method: "POST", body: JSON.stringify({ newDesc: newDesc }) })
  }

  return (
    <>
      <NavBar />
      <form onSubmit={handleUpdateDescription}>
        <textarea onChange={handleNewDescChange}></textarea>
        <button>Update description</button>
      </form>
      <Footer />
    </>
  )
}
