import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
const SignUp = () => {
  const [formData,setFormData] = useState({});
  const [errorMessage,setErrorMessage] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.id] : e.target.value.trim()})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage("Please fill out all the fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          "Content-Type" : "application/json",
        },
        body:JSON.stringify(formData)
      })

      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
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
          <p className="text-sm mt-5">Welcome to Echo Blog, where words transform into windows of knowledge and inspiration.</p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>
            <Button gradientDuoTone={'purpleToPink'} type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size={'sm'}/>
                  <span className="pl-3">Loading...</span>
                </>
              ) : 'Sign Up'}
            </Button>
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to={'/sign-in'} className="text-blue-500">Sign In</Link>
          </div>
          {
            errorMessage && (
              <Alert className="mt-4" color={'failure'}>{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default SignUp;
