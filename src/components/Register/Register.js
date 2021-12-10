import React from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Register = () => {

  const { formRegister, setUser, setError } = useAuth();

  const location = useLocation();
  const redirect_uri = location?.state?.from || '/';
  const history = useHistory();
  console.log(redirect_uri);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    let { email, password } = data;
    formRegister(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        history.push(redirect_uri);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage)
      });
  };

  return (
    <div>
      Register

      <form onSubmit={handleSubmit(onSubmit)}>

        <input type="text" className="form-control" {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })} />

        {errors.email && <span className="text-danger">Please Enter a Valid Email Address</span>}

        <input type="password" className="form-control" {...register("password", { required: true, pattern: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/ })} />

        {errors.password && <span className="text-danger">Please Enter a password which contain atlease 6 chracter long, one Uppercae, one Lowercase and one special character</span>}

        <input type="submit" />
      </form>
      <p>Already Registred? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;