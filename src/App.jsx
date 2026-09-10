import { useState } from "react";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseURL = "https://backend-production-3bc9e.up.railway.app";

    const url = isLogin
      ? `${baseURL}/api/auth/login`
      : `${baseURL}/api/auth/register`;

    const data = isLogin
      ? {
          email,
          password
        }
      : {
          name,
          email,
          password
        };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);

        console.log(result);

        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert(result.message);
      }

    } catch (error) {
      console.log(error);
      alert("Not connected");
    }
  };

  return (
    <div className="container">

      <div className="form-box">

        <h1>
          {isLogin ? "Login" : "Create Account"}
        </h1>

        <p className="subtitle">
          {isLogin
            ? "Login to your account"
            : "Create your new account"}
        </p>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <div className="input-group">
              <label>Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        <div className="toggle">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default App;
