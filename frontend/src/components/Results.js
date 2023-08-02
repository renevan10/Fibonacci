import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Table } from "reactstrap";

const Results = ({ results }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h5"> Results </CardTitle>
      </CardHeader>
      <CardBody>
        <Table bordered={true}>
          <tbody>
            <tr>
              <th>n</th>
              <th>term</th>
            </tr>
            {results.map((result, id) => (
              <tr key={id}>
                <td>{result.n}</td>
                <td>{result.term}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Results;
