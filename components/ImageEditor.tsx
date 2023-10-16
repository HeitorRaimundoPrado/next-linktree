import 'react-advanced-cropper/dist/style.css'
import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper'
import { useState, useRef } from 'react'
import User from '@/models/User'
import style from '@/style/ImageEditor.module.scss'
import { BsZoomIn, BsZoomOut } from 'react-icons/bs'


export default function ImageEditor({
  selectedFileUrl,
  setUser,
  setSelectedFileUrl,
  user,
}: {
  selectedFileUrl: string,
  setUser: (newUser: User) => void,
  setSelectedFileUrl: (newVal: string | undefined) => void,
  user: User,
}) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  const onCrop = (cropper: CropperRef) => {
    setCanvas(cropper.getCanvas())
  }

  const handleUploadPhoto = () => {
    canvas.toBlob((blob: any) => {
      if (!blob) {
        return new Error("Canvas is empty")
      }

      const formData = new FormData();
      formData.append("file", blob);

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
            console.log(data.user)
            console.log("changing user")
          })
      } catch (e) {
        console.error("Error: ", e);
      }

    });
    setSelectedFileUrl(undefined);
  }

  return (
    <>
      <div className={style.image_editor}>
        <Cropper
          src={selectedFileUrl}
          stencilComponent={CircleStencil}
          onChange={onCrop} />

        <button onClick={handleUploadPhoto}>Upload Photo</button>
      </div>
    </>
  )
}
