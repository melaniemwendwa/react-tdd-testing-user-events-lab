import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState({
    coding: false,
    design: false,
    writing: false,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleCheckboxChange(e) {
    const { name, checked } = e.target;
    setInterests((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const selectedInterests = Object.keys(interests).filter(
    (key) => interests[key]
  );

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Sign Up for My Newsletter</h2>

        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
        </label>

        <fieldset>
          <legend>Select your interests:</legend>
          <label>
            <input
              type="checkbox"
              name="coding"
              checked={interests.coding}
              onChange={handleCheckboxChange}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="design"
              checked={interests.design}
              onChange={handleCheckboxChange}
            />
            Design
          </label>
          <label>
            <input
              type="checkbox"
              name="writing"
              checked={interests.writing}
              onChange={handleCheckboxChange}
            />
            Writing
          </label>
        </fieldset>

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div>
          <h3>Thank you, {name}!</h3>
          <p>We’ve received your email: {email}.</p>
          {selectedInterests.length > 0 && (
            <p>Your interests: {selectedInterests.join(", ")}</p>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
