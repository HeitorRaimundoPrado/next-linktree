"use client"
import User from '../../models/User'
import Link from '../../models/Link'
import { useState, useEffect } from 'react'
import { useCookies } from 'next-client-cookies'
import { redirect } from 'next/navigation'

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const cookiesStore = useCookies();
  const token = cookiesStore.get("token");

  useEffect(() => {
    console.log(cookiesStore.get("token"))
    // if (token === undefined || token === null) {
    //   redirect("/login")
    // }

    fetch(`/api/current_user`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUser(data.user);
      })
  }, [])

  const handleUpdateDescription = (e: React.FormEvent) => {
    e.preventDefault();
  }

  if (user === null || user === undefined) {
    return (
      <h1>Not logged in</h1>
    )
  }

  return (
    <>
      <h1>{user.username}</h1>

      <form onSubmit={handleUpdateDescription}>
        <textarea id="" defaultValue={user.desc !== null ? user.desc : "No description"} placeholder="No description"></textarea>
        <button>
          Update Description
        </button>

      </form>

      <ul>
        {user.links.map((link: Link) => {
          return <li>{link.url} - {link.description ? link.description : ""}</li>
        })}
        <li><button>Create new link</button></li>
      </ul>
    </>
  )
}
