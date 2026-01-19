import { useState, useEffect } from "react";
import useStore from "../../zustand/store";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const logIn = useStore((state) => state.logIn);
  const errorMessage = useStore((state) => state.authErrorMessage);
  const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

  useEffect(() => {
    // Clear auth error message on unmount
    return () => setAuthErrorMessage("");
  }, []);

  const handleLogIn = (event) => {
    event.preventDefault();
    logIn({ username, password });
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(135deg, #d4f1f4 0%, #b8e6f0 100%)" }}
    >
      <div
        className="card shadow-lg"
        style={{ maxWidth: "450px", width: "100%", borderRadius: "15px" }}
      >
        {/* Header */}
        <div
          className="card-header text-white text-center py-4"
          style={{
            background: "linear-gradient(135deg, #17a2b8 0%, #20c997 100%)",
            borderRadius: "15px 15px 0 0",
          }}
        >
          <div className="mb-3">
            <div
              className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center"
              style={{ width: "80px", height: "80px" }}
            >
              <img
                src="/img/cu-heart.png"
                alt="Churches United"
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          </div>
          <h2 className="mb-2">Churches United</h2>
          <p className="small mb-0 text-white" style={{ opacity: 0.85 }}>
            Safe Shelter, Stable Housing, Nutritious Food,
            <br />
            and a Path Toward Healing
          </p>
        </div>

        {/* Body */}
        <div className="card-body p-4">
          <form onSubmit={handleLogIn}>
            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-semibold">
                Username
              </label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-light">
                  <i className="bi bi-person-fill"></i>
                </span>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-light">
                  <i className="bi bi-lock-fill"></i>
                </span>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-lg w-100 text-white fw-semibold"
              style={{
                background: "linear-gradient(135deg, #17a2b8 0%, #20c997 100%)",
                border: "none",
              }}
            >
              Log In
            </button>
          </form>

          {/* Error Message */}
          {errorMessage && (
            <div
              className="alert alert-danger mt-3 mb-0"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
        </div>
      </div>

      {/* Input focus style */}
      <style jsx>{`
        .form-control:focus {
          border-color: #20c997;
          box-shadow: 0 0 0 0.2rem rgba(32, 201, 151, 0.25);
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
