import React from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {

  const { googleSignIn, formLogin, gitHubSignIn, setUser, setError, setIsLoading } = useAuth();

  const location = useLocation();
  const redirect_uri = location?.state?.from || '/';
  const history = useHistory();

  // Google Sign In 
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        history.push(redirect_uri);

      }).catch((error) => {
        setError(error.message)
      }).finally(() => { setIsLoading(false) })
  }

  // gitHub Sign In 
  const handleGitHubSignIn = () => {
    gitHubSignIn()
      .then((result) => {
        setUser(result.user);
        history.push(redirect_uri);

      }).catch((error) => {
        setError(error.message)
      }).finally(() => { setIsLoading(false) })
  }


  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    let { email, password } = data;

    formLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        history.push(redirect_uri);
      });

  };

  return (
    <div>
      <p>Login</p>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input type="email" className="form-control" {...register("email", { required: true })} />

        {errors.email && <span className="text-danger">Email field is required</span>}

        <input type="password" className="form-control" {...register("password", { required: true })} />

        {errors.password && <span className="text-danger">Password field is required</span>}

        <input type="submit" name="Login" />
      </form>
      <p>New User? <Link to="/register">Register Now</Link></p>

      <hr />

      <button onClick={handleGoogleSignIn} className="btn btn-primary">Google Login</button>
      <button onClick={handleGitHubSignIn} className="btn btn-primary">GitHub Login</button>
    </div>
  );
};

export default Login;