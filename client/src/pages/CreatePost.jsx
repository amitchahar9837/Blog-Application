import { Button, Select, TextInput } from "flowbite-react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <TextInput
            type="text"
            id="title"
            placeholder="Title"
            required
            className="flex-1"
          />
          <Select>
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
          <TextInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone={"purpleToBlue"}
            outline
            size={"sm"}
          >
            Upload image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          required
          className="h-72 mb-12"
        />
        <Button type="submit" gradientDuoTone={"purpleToPink"}>
          Publish
        </Button>
      </form>
    </div>
  );
}
