import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resendOTP } from  "../../api/auth";
import { verifyUserEmail } from '../../api/auth';
import { useAuth, useNotification } from '../../hooks';
import { commonModelClasses } from '../../utils/theme';
import Container from '../Container';
import FormContainer from '../form/FormContainer';
import Submit from '../form/Submit';
import Title from '../form/Title';

const OTP_LENGTH = 6;
const isValitOTP = (otp) => {
//  to validate integer only for otp 
let valid = false;
for (let val of otp) {
 valid =  !isNaN(parseInt(val));
  if(!valid) break;
}

return valid;

};
export default function EmailVerification() {
// to make otp customizable and flexiable
// fill array with empty string
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(" "));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const {isAuth, authInfo} = useAuth();
  const {isLoggedIn,profile} =  authInfo;
  const isVerified = profile?.isVerified;
  const inputRef = useRef();
  
  const {updateNotification} = useNotification();

 const {state} = useLocation();
 const user = state?.user;

 const navigate = useNavigate();

// to move to the next field
  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

 // to move to the previous field
  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0; 
    setActiveOtpIndex(nextIndex);
  };

 // to avoid writing more than one number in the field
 
  const handleOtpChange = ({ target }, index) => {
     // value = user input
    const { value } = target;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.length);
    
    if(!value) focusPrevInputField(index);
    else focusNextInputField(index);
    
    setOtp([...newOtp]);  
  };
 
   // resend Otp 

 const handleOtpResend = async () => {
 const {error,message} = await  resendOTP(user.id);
if (error) return updateNotification('error',error);

 updateNotification('success',message);
 }


// to go back if not written
  const handleKeyDown =  ({ key }, index) => {
    if( key === "Backspace" ) {
      focusPrevInputField(index);
     
      
    }
  }; 

    //  submit otp


const handleSubmit = async (e) => {

  e.preventDefault();
  if(!isValitOTP(otp))
  return updateNotification("error", "invalid OTP");



  
  const
   {error, message, user: userResponse} =  await verifyUserEmail({
    OTP: otp.join(""),
    userId: user.id,
  });
if(error) return updateNotification("error","Please Submit a valid OTP");
updateNotification('success', message);
localStorage.setItem('auth-token',userResponse.token);

isAuth()
};


  //focus on input field
  // redirect to not found page if the user not exist
  useEffect(() => {
     inputRef.current?.focus();
    }, [activeOtpIndex]);
    
   useEffect(()=> {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
   },[user,isLoggedIn,isVerified]);


  return (
    <FormContainer>
      <Container>
        <form
    onSubmit={handleSubmit}    
         className={commonModelClasses}>
          <div>
          <Title
          title="Please enter the OTP to verify your account" ></Title>
          <p className='text-center dark:text-dark-subtle text-light-subtle'>
            OTP has been sent to your email </p>
          </div>

         <div className='flex justify-center items-center space-x-4'>
          {otp.map((_, index) => {
            return (
            <input
            
          
            ref={activeOtpIndex === index ? inputRef : null}
            key={index}
            type="number"
           
            value={otp[index] || " "}
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e,index)}
            className='w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle
            dark:focus:border-white rounded focus:border-primary
            bg-transparent outline-none text-center dark:text-white text-primary
            font-semibold text-xl spin-button-none' />
          )})}
          </div>
          <div  >
          <Submit value='Verify Account'/>
          <button
          onClick={handleOtpResend}
          
           type='button' className='dark:text-white
           text-blue-500 font-semibold hover:underline 
          mt-2' >
          I don't have OTP</button>
          </div>
        </form>
      </Container>
    </FormContainer>
  )
}
