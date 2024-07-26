import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '../Redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
export default function OAuth() {
      const auth = getAuth(app);
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleGoogleClick = async ()=>{
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({prompt: 'select_account'});

            try {
                  const resultsFromGoogle = await signInWithPopup(auth,provider)
                  const res = await fetch('/api/auth/google',{
                        method:"POST",
                        headers:{
                              'Content-Type' : "application/json"
                        },
                        body:JSON.stringify({
                              name:resultsFromGoogle.user.displayName,
                              email:resultsFromGoogle.user.email,
                              googlePhotoUrl: resultsFromGoogle.user.photoURL
                        }),
                  });
                  const data = await res.json();
                  if(res.ok){
                        dispatch(signInSuccess(data))
                        navigate('/')
                  }
            } catch (error) {
                  console.log(error);
                  dispatch(signInFailure(error.message));
            }
      }
  return (
    <Button gradientDuoTone={'pinkToOrange'} outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
      <span className='flex items-center'>Continue with Google</span>
    </Button>
  )
}
