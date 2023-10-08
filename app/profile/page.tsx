"use client"
import User from '../../models/User'
import Link from '../../models/Link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import style from "@/style/ProfilePage.module.scss"

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const [createNewLinkFormVisible, setCreateNewLinkFormVisible] = useState<boolean>(false);
  const [addNewLinkForm, setAddNewLinkForm] = useState<{ url: string, desc: string }>({ url: "", desc: "" });
  const [allLinks, setAllLinks] = useState<Link[]>([]);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return null;
    }

    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      fetch("/api/add_photo", { method: "POST", body: formData })
        .then(res => {
          if (res.ok) {
            alert("upload successful");
          }
          return res.json();
        })
        .then(data => {
          setUser(data.user)
        })
    } catch (e) {
      console.error("Error: ", e);
    }
  }
  console.log(`public/uploads/${user.photo}`)

  return (
    <>
      <NavBar />
      <div className={style.profile_page}>
        <label htmlFor="pfp" style={{ background: `url('/uploads/${user.photo}')` }}>+</label>
        <input id="pfp" type="file" accept=".jpg, .png, .txt" onChange={handleFileSelect} style={{ display: "none" }} />

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
