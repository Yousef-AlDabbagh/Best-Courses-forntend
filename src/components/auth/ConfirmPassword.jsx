import React  , {useEffect, useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { commonModelClasses } from '../../utils/theme'
import Container from '../Container'
import FormContainer from '../form/FormContainer'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import { resetPassword, verifyPasswordResetToken } from "../../api/auth";
import Title from '../form/Title'
import { useNotification } from '../../hooks';
import {ImSpinner3} from 'react-icons/im'
export default function ConfirmPassword() {
  const [password,setPassword] = useState({
 one: '', 
 two:''

  })
const [isVerifying,setIsVerifying] = useState(true)
const [isValid,setIsValid] = useState(true)
 const [searchParams] = useSearchParams()
 const token = searchParams.get('token')
 const id = searchParams.get('id')


 const { updateNotification } = useNotification();
 const navigate = useNavigate()
  // is token valid or not ,isVerifying
  // if not valid move our user somewhere else

useEffect(() => {
  isValidToken()


},[])




 const isValidToken =  async () => {
 const {error,valid} = await verifyPasswordResetToken(token,id)
 setIsVerifying(false);
if(error) {
  navigate('/auth/reset-password',{replace:true})
   return updateNotification('error',error);
}
if(!valid) {
  setIsValid(false);
 return  navigate('/auth/reset-password',{replace:true})
 }
 setIsValid(true);


};
const handleChange = ({target}) => {
const {name,value} = target;
setPassword({...password,[name]: value})
}


const handleSubmit = async (e) => {
e.preventDefault();
if(!password.one.trim()) return updateNotification('error',
'password is missing')

if(password.one.trim().length < 8) return updateNotification('error',
'password must be 8 characters')

if(password.one !== password.two) return updateNotification('error',
'password does not match')


  const {error,message} = await resetPassword({newPassword : password.one,userId: id, token})

  if(error)  return updateNotification('error',error);
  updateNotification('success',message);
  navigate('auth/signin', {replace:true});
    

  };
  


if(isVerifying) 
return (
<FormContainer>

  <Container>
  <div className='flex space-x-2 items-center '></div>
<h1 className='text-4xl font-semibold dark:text-white text-primary'> please wait we are verifying your token  </h1>
<ImSpinner3 className='animate-spin text-4xl dark:text-white text-primary '/>
  </Container>
</FormContainer>
) ;


if(!isValid) 
return (
<FormContainer>
  <Container>
 
<h1 className='text-4xl font-semibold dark:text-white text-primary'> 
The token is Invalid  </h1>
  </Container>
</FormContainer>
) ;






  return (
    <FormContainer>
      <Container>
        <form
        onSubmit={handleSubmit}
         className={commonModelClasses +' w-96 '}>
          
          <Title
          title="Enter New Password"
          > </Title>
          <FormInput
               value={password.one} 
                    onChange={handleChange}
           label='New Password'
            placeholder='********' 
            name='one' type='password'/>
          <FormInput
              value={password.two}
              onChange={handleChange}
           label='Confirm Password' 
           placeholder='********'
            name='two'
             type='password' 

             />
          <Submit value='Confirm Password'/>

        </form>
      </Container>
    </FormContainer>
  )
}
