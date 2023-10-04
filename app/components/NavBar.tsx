"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import style from '@/style/NavBar.module.scss'

const NavBar = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    fetch(`/api/current_user`)
      .then(res => {
        if (res.status === 401) {
          setSignedIn(false);
          return
        }
        else if (res.status === 200) {
          setSignedIn(true);
        }
      })
  }, [])
  return (
    <div className={style.navbar_wrapper}>
      <ul>
        <li><Link href="/">Home</Link></li>
        <div className="auth_wrapper">
          {
            signedIn &&
            <>
              <li><Link href="/logout">Sign Out</Link></li>
              <li><Link href="/profile">Profile</Link></li>
            </>
            ||
            <>
              <li><Link href="/signup">Sign Up</Link></li>
              <li><Link href="/login">Sign In</Link></li>
            </>

          }
        </div>
      </ul>
    </div>
  )
}

export default NavBar;
