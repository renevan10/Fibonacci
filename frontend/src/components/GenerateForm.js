import React, { useState } from "react";
import { Button } from "@blueprintjs/core";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

const GenerateForm = ({ setResults }) => {
  const [input, setInput] = useState("");

  const getSequence = async (event) => {
    event.preventDefault();
    const data = await axios.get(`http://localhost:5000/getSequence/${input}`);
    console.log(data);
    const { sequence } = data.data;
    setResults(sequence);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const validateInput = () => {
    return input.length === 0 || isNaN(input) || parseInt(input) < 1;
  };

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Generate sequence</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={getSequence}>
            <FormGroup>
              <label>
                Input a number greater than or equal to 1 to generate its
                Fibonacci sequence
              </label>
              <Input
                name="n"
                placeholder="n"
                value={input}
                invalid={validateInput()}
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default GenerateForm;
