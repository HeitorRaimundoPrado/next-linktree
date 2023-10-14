"use client"
import User from '../../../models/User'
import { useState, useEffect } from 'react'
import style from '@/style/User.module.scss'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function UserPage({ params }: { params: { user: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/u/${params.user}`)
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setLoading(false);
      })
  }, [])

  if (loading) {
    return (
      <h1>Loading</h1>
    )
  }

  else if (!user) {
    return (
      <h1>User not found</h1>
    )
  }

  return (
    <>
      <NavBar />
      <div className={style.profile_page}>
        <img src={`/uploads/${user.photo}`} alt="user has no profile picture" />
        <h1>{user.username}</h1>
        <p>{user.desc !== null ? user.desc : "No description"}</p>
        <ul>
          {user.links.map((link, index: number) => {
            return <li key={index}><a href={link.url}>{link.url}</a> - {link.description ? link.description : ""}</li>
          })}
        </ul>
      </div>
      <Footer />
    </>
  )
}
