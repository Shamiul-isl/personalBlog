import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const  [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill out all the fields');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/auth/signup", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen mt-20">
      <div
        className="flex p-3 max-w-3xl mx-auto flex-col 
      md:flex-row md:items-center gap-5"
      >
        {/* Left side */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span
              className="px-2 py-1 bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 rounded-lg text-white"
            >
              Sam's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Welcome to Sam's Blog. Please sign up to continue
          </p>
        </div>
        {/* Right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={submitHandle}>
            <div>
              <Label value="Your Username" />
              <TextInput placeholder="Username" type="text" id="username" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                placeholder="name@company.com"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput placeholder="Password" type="password" id="password" onChange={handleChange}/>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                  </>
                ) : 'Sign Up'
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {
            error && (
              <Alert className="mt-5" color='failure'>
                {error}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}
