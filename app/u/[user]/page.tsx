"use client"
import { useRouter } from 'next/navigation';
import User from '../../../models/User'
import { useState, useEffect } from 'react'

export default function UserPage({ params }: { params: { user: string } }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`/api/u/${params.user}`)
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
      })
  }, [])

  if (!user) {
    return (
      <h1>User not found</h1>
    )
  }

  return (
    <>
      {user && user.username}
      {user && user.desc !== null ? user.desc : "No description"}
      <ul>
        {user && user.links.map((link) => {
          return <li><a href={link.url}>{link.url}</a> - {link.description ? link.description : ""}</li>
        })}
      </ul>
    </>
  )
}
