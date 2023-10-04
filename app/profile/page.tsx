"use client"
import User from '../../models/User'
import Link from '../../models/Link'
import { useState, useEffect } from 'react'
import { useCookies } from 'next-client-cookies'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import style from "@/style/ProfilePage.module.scss"

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const [createNewLinkFormVisible, setCreateNewLinkFormVisible] = useState<boolean>(false);
  const [addNewLinkForm, setAddNewLinkForm] = useState<{ url: string, desc: string }>({ url: "", desc: "" });
  const [allLinks, setAllLinks] = useState<Link[]>([]);

  const cookiesStore = useCookies();
  const token = cookiesStore.get("token");
  const { push } = useRouter();

  useEffect(() => {

    fetch(`/api/current_user`)
      .then(res => {
        if (res.status === 401) {
          return { err: 401 }
        }
        return res.json()
      })
      .then(data => {
        if (data.err) {
          push("/login")
        }
        setUser(data.user);
        setAllLinks(data.user.links);
      })
  }, [])


  if (user === null || user === undefined) {
    return (
      <h1>Not logged in</h1>
    )
  }


  const handleShowCreateNewLinkForm = () => {
    setCreateNewLinkFormVisible(true);
  }

  const handleAddNewLink = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/create_new_link", { method: "POST", body: JSON.stringify(addNewLinkForm) })
      .then(res => res.json())
      .then(data => {
        setAllLinks([...allLinks, data.newLink])
      })
  }

  return (
    <>
      <NavBar />
      <div className={style.profile_page}>
        <h1>{user.username}</h1>

        <p>{user.desc !== null ? user.desc : "No description"}</p>
        <a href="/update_desc">
          <button>
            Update Description
          </button>
        </a>

        <ul>
          {allLinks.map((link: Link) => {
            return <a href={link.url}><li>{link.url} - {link.description ? link.description : ""}</li></a>
          })}
          <button onClick={handleShowCreateNewLinkForm}>Create new link</button>
        </ul>
        {
          createNewLinkFormVisible &&
          <form onSubmit={handleAddNewLink}>
            <div>
              <input type="text" placeholder="url" onChange={(e) => setAddNewLinkForm({ ...addNewLinkForm, url: e.target.value })} />
              <input type="text" placeholder="Description" onChange={(e) => setAddNewLinkForm({ ...addNewLinkForm, desc: e.target.value })} />
            </div>
            <button>Create Link</button>
          </form>
        }

      </div>
      <Footer />
    </>
  )
}
