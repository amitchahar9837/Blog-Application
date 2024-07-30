import { Alert, Button, Select, Spinner, TextInput } from "flowbite-react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const fileInputRef = useRef(null);
  const [publishError, setPublishError] = useState(null);
  const [publishLoading, setPublishLoading] = useState(false);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageFileUploadError("Please select an image");
        return;
      }
      setImageFileUploadError(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError("Image upload failed");
          setImageFileUploadProgress(null);
          setFile(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUploadProgress(null);
            setFormData({ ...formData, image: downloadURL });
            fileInputRef.current.value = "";
          });
        }
      );
    } catch (error) {
      setImageFileUploadError("image upload failed");
      setImageFileUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPublishLoading(true);
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setPublishLoading(false);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      console.log("Something went wrong");
      setPublishLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <TextInput
            type="text"
            id="title"
            placeholder="Title"
            required
            className="flex-1"
            ref={fileInputRef}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value={"uncategorized"}>Select a category</option>
            <option value={"javascript"}>JavaScript</option>
            <option value={"html"}>HTML</option>
            <option value={"css"}>CSS</option>
            <option value={"frontend"}>Frontend</option>
            <option value={"reactjs"}>React.js</option>
            <option value={"backend"}>Backend</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 p-3 border-4 border-teal-500 border-dotted ">
          <TextInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone={"purpleToBlue"}
            outline
            size={"sm"}
            onClick={handleUploadImage}
            disabled={imageFileUploadProgress}
          >
            {imageFileUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageFileUploadProgress}
                  text={`${imageFileUploadProgress || 0}%`}
                  styles={{
                    path: {
                      stoke: `rgba(62,152,199,${
                        imageFileUploadProgress / 100
                      })`,
                    },
                  }}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageFileUploadError && (
          <Alert color={"failure"}>{imageFileUploadError}</Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          required
          className="h-72 mb-12"
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" gradientDuoTone={"purpleToPink"}>
          {publishLoading ? (
            <>
              <Spinner size={"sm"} />
              <span className="pl-3">Publishing Post...</span>
            </>
          ) : (
            "Publish"
          )}
        </Button>
        {publishError && (
          <Alert className="mt-5" color={"failure"}>
            {" "}
            {publishError}{" "}
          </Alert>
        )}
      </form>
    </div>
  );
}
