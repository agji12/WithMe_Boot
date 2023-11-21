import { Container } from "react-bootstrap";
import Navi from "../../components/nav";
import { useEffect, useState } from "react";

const Record = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/record/toSearchRecord")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(function (result) {
        setData(result);
      });
  }, []);

  return (
    <div className="App">
      <Navi />
      <Container>
        {data.map((v, idx) => (
          <li key={`${idx}-${v}`}>{v}</li>
        ))}
      </Container>
    </div>
  );
};

export default Record;
