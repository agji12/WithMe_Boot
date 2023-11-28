import { useLocation } from "react-router-dom";

const Test = () => {
  const location = useLocation();
  console.log(location);
  //const summonerName2 = location.state;
  return <>HI : {location.state.test}</>;
};
export default Test;
