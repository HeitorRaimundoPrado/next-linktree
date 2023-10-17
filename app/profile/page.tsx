"use client"
import User from '../../models/User'
import Link from '../../models/Link'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import style from "@/style/ProfilePage.module.scss"
import 'react-image-crop/dist/ReactCrop.css'
import ImageEditor from '@/components/ImageEditor'
import { BsPersonFill, BsX } from 'react-icons/bs'

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const [createNewLinkFormVisible, setCreateNewLinkFormVisible] = useState<boolean>(false);
  const [addNewLinkForm, setAddNewLinkForm] = useState<{ url: string, desc: string }>({ url: "", desc: "" });
  const [allLinks, setAllLinks] = useState<Link[]>([]);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string>();

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
      <h1>Loading</h1>
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

    const imageURL = window.URL.createObjectURL(e.target.files[0]);
    setSelectedFileUrl(imageURL);
  }

  if (selectedFileUrl) {
    return (
      <ImageEditor setSelectedFileUrl={setSelectedFileUrl} user={user} setUser={setUser} selectedFileUrl={selectedFileUrl} />
    )
  }

  const remove_link = (link: Link) => {
    fetch("/api/remove-link", { method: "POST", body: JSON.stringify({ id: link.id }) });
    setAllLinks(allLinks.filter((l) => l.id !== link.id))
  }

  console.log(user.photo)
  return (
    <>
      <NavBar />
      <div className={style.profile_page}>

        <label htmlFor="pfp" style={{
          backgroundImage: (user.photo ? `url('/uploads/${user.photo}')` : `none`),
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
          color: "#989898"
        }}>{!user.photo && <BsPersonFill style={{ color: "white", width: "150px", height: "150px", borderRadius: "50%" }} />}<span style={{ position: "absolute", bottom: "27px", zIndex: "999" }}>+</span></label>
        <input id="pfp" type="file" accept=".jpg, .png, .txt" onChange={handleFileSelect} style={{ display: "none" }} />

        <h1>{user.username}</h1>

        <p>{user.desc !== null ? user.desc : "No description"}</p>
        <a href="/update_desc">
          <button>
            Update Description
          </button>
        </a>
        <p>Public URL: <a href={window.location.origin + "/u/" + user.id.toString()}>{window.location.origin + "/u/" + user.id.toString()}</a></p>
        <ul>
          {allLinks.map((link: Link, index: number) => {
            return <li><a key={index} href={link.url}>{link.url} - {link.description ? link.description : ""}</a> <button onClick={() => remove_link(link)}><BsX /></button></li>
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
