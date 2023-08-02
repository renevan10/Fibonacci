import "./App.css";
import { Container } from "reactstrap";
import { useState } from "react";
import GenerateForm from "./components/GenerateForm";
import Results from "./components/Results";

const baseUrl = "http://localhost:5000";

function App() {
  const [results, setResults] = useState([]);
  return (
    <Container id="application">
      <GenerateForm setResults={setResults} />
      {results.length === 0 ? null : <Results results={results} />}
    </Container>
  );
}

export default App;
