"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation";

export default function logOut() {
  const { push } = useRouter();
  useEffect(() => {
    fetch("/api/logout", { method: "POST" }).
      then(res => {
        if (res.status == 200) {
          push("/")
        }
      });
  }, [])
}
