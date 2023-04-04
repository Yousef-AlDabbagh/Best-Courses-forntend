import { useNavigate } from 'react-router-dom'
import { createUser } from '../../api/auth'
import {isValidEmail} from '../../utils/helper';
import React, { useEffect, useState } from "react";
import { commonModelClasses } from '../../utils/theme'
import Container from '../Container'
import CustomLink from '../CustomLink'
import FormContainer from '../form/FormContainer'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import Title from '../form/Title'
import { useAuth, useNotification } from "../../hooks";

/////////////////////// Validating //////////////////////////////////
const valifateUserInfo = ({name,email,password}) => {
 
  const isValidName = /^[a-z A-Z]+$/;
if(!name.trim()) return {ok: false, error:"Name is missing"};
if(!isValidName.test(name)) return {ok: false, error:"Invalid Name"};
if(!email.trim()) return {ok: false, error:"Email is Missing"};
if(!isValidEmail(email))  return {ok :false, error:"Email is Invalid"};
if(!password.trim()) return {ok: false, error:"password is Missing"};

if(password.length < 8) return {ok: false, error:"password must be at least 8 characters"};
return {ok:true};

};

export default function Signup() {
  const [userInfo,setUserInfo] = useState({
name:"",
email: "",
password: "",


  });

 const navigate =  useNavigate();
 const { authInfo} = useAuth();
 const {isLoggedIn} = authInfo;
 const { updateNotification } = useNotification();


  const handleChange = ({target}) => {
  const {value,name} = target;
  setUserInfo({...userInfo,[name]:value})
  };

  const handleSubmit = async (e) => {
    //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
   e.preventDefault();
    const { ok, error} = valifateUserInfo(userInfo);

    if(!ok) return updateNotification("error", error);
// we will use axios to send user info to backend

const response = await createUser(userInfo);
if (response.error) return console.log(response.error);
// if there is no error navigate to auth => confirm otp
navigate("/auth/verification",{
  state: {user: response.user},
  // replace the previous history
   replace: true,
  });
};

useEffect(() => {
  //move our user to homepage
 if(isLoggedIn) navigate("/");
 
 }, [isLoggedIn])
 


  const {name,email,password} = userInfo;
  
  return (
    <FormContainer>
      <Container>
  
        <form
        onSubmit={handleSubmit} 
        className={commonModelClasses + ' w-72'}>
          
          <Title
          title="Sign up"></Title>
          <FormInput
           value={name}
           onChange={handleChange}
           label='Name'
           placeholder='name'
           name='name'/>
          <FormInput
           value={email}
           onChange={handleChange}
           label='Email'
           placeholder='Example@email.com'
           name='email'/>
          <FormInput
           value={password} 
           onChange={handleChange}
           label='Password'
           placeholder='********'
           name ='password'
           type = "password"
             />
          <Submit value='Sign up'/>

          <div className='flex justify-between'>
            <CustomLink to='/auth/forget-password' children="Forget password"></CustomLink>
            <CustomLink to='/auth/signin' children="Sign in"></CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  )
}
