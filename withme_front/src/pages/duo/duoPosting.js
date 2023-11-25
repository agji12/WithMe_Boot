import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import styled from "styled-components";
import Test from "../../components/test";

const DuoPosting = ({ duo }) => {
  console.log(duo);

  return (
    <>
      <Card style={{ width: "100%", position: "relative" }}>
        <img alt="Sample" src="https://picsum.photos/300/200" />
        <CardBody>
          <CardTitle tag="h5">Card titled{duo[0].duoCode}</CardTitle>
          <Test code={duo[0].duoCode} />
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {duo[1].nickname}
          </CardSubtitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card‘s content.
          </CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </>
  );
};
export default DuoPosting;
