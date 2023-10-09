import ReactCrop, { type Crop } from 'react-image-crop'
import { useState, useRef, SetStateAction } from 'react'
import User from '@/models/User'

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
  const [crop, setCrop] = useState<Crop>({ unit: "px", x: 25, y: 25, width: 150, height: 150 });
  const image = useRef<HTMLImageElement | null>(null);

  const handleUploadPhoto = async () => {
    if (selectedFileUrl == null || image.current == null) { return; }

    const formData = new FormData();
    const canvas = document.createElement('canvas');
    canvas.width = 150;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');

    ctx?.drawImage(
      image.current,
      crop.x!,
      crop.y!,
      crop.width!,
      crop.height!,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob((blob) => {
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

  console.log(`public/uploads/${user.photo}`)

  return (
    <>
      <ReactCrop crop={crop} onChange={c => setCrop(c)} locked={true}>
        <img ref={image} src={selectedFileUrl} alt="" />
      </ReactCrop>

      <button onClick={handleUploadPhoto}>Upload Photo</button>
    </>
  )
}
