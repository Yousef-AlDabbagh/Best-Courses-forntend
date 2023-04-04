import React, { useEffect, useState } from "react";
import { isValidEmail } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useAuth, useNotification } from "../../hooks";
import { commonModelClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const valifateUserInfo = ({ email, password }) => {
  if (!email.trim()) return { ok: false, error: "Email is Missing" };
  if (!isValidEmail(email)) return { ok: false, error: "Email is Invalid" };
  if (!password.trim()) return { ok: false, error: "password is Missing" };

  if (password.length < 8)
    return { ok: false, error: "password must be at least 8 characters" };
  return { ok: true };
};

export default function Signin() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    e.preventDefault();
    const { ok, error } = valifateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);
    // we will use axios to send user info to backend
    handleLogin(userInfo.email, userInfo.password);
  };

  useEffect(() => {
    // move our user to homepage
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModelClasses + " w-72"}>
          <Title title="Sign in"></Title>
          <FormInput
            value={userInfo.email}
            onChange={handleChange}
            label="Email"
            placeholder="example@gmail.com"
            name="email"
          />
          <FormInput
            value={userInfo.password}
            onChange={handleChange}
            label="Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <Submit value="Sign in" busy={isPending} />

          <div className="flex justify-between">
            <CustomLink
              to="/auth/forget-password"
              children="Forget password"
            ></CustomLink>
            <CustomLink to="/auth/signup" children="Sign up"></CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
