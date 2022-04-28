import "./App.css";
import { useState } from "react";
import validator from "validator";
function App() {
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [errorEmail, setErrorEmail] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    setErrorEmail(null);
    e.preventDefault();
    if (!validator.isEmail(signupInput.email)) {
      return setErrorEmail("Invalid email format");
    } else if (signupInput.password.length < 5) {
      return setErrorEmail(
        "The password length should be 5 or more characters"
      );
    } else if (signupInput.confirmedPassword !== signupInput.password) {
      return setErrorEmail("The passwords don't match. Try again");
    }
  };
  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            value={signupInput.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-control"
            value={signupInput.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmedPassword" className="form-label">
            Confirmed password
          </label>
          <input
            id="confirmedPassword"
            type="password"
            name="confirmedPassword"
            className="form-control"
            value={signupInput.confirmedPassword}
            onChange={handleChange}
          />
        </div>
        <div data-testid="bukan">
          {errorEmail && <p className="text-danger">{errorEmail}</p>}
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default App;
