import React from "react";
import { Link } from "react-router-dom";
import {Button, Label, TextInput} from 'flowbite-react'
const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5 md:items-center">
        {/* Left */}
        <div className="flex-1">
          <Link
            to={"/"}
            className="text-4xl font-bold dark:text-white flex items-center"
          >
            <span className="px-2 py-1 bg-gradient-to-r from from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white flex items-center">
              Echo
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">Welcome to Echo Blog, where words transform into windows of knowledge and inspiration. Here, we believe in the power of storytelling and sharing ideas that enlighten and empower.</p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput type="email" placeholder="name@company.com" id="username" />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" placeholder="Password" id="username" />
            </div>
            <Button gradientDuoTone={'purpleToPink'} type="submit">Sign Up</Button>
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to={'/sign-in'} className="text-blue-500">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
