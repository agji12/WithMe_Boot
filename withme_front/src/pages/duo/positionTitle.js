const PositionTitle = ({ code }) => {
  const position = code.split(",");
  let temp = "";

  for (let i = 0; i < position.length; i++) {
    if (position[i] === "0") {
      temp += "모든 포지션 ";
      break;
    }
    if (position[i] === "1") {
      temp += "탑 ";
    } else if (position[i] === "2") {
      temp += "정글 ";
    } else if (position[i] === "3") {
      temp += "미드 ";
    } else if (position[i] === "4") {
      temp += "원딜 ";
    } else if (position[i] === "5") {
      temp += "서폿 ";
    }
  }
  if (temp === "탑 정글 미드 원딜 서폿 ") {
    temp = "모든 포지션 ";
  }

  return temp;
};
export default PositionTitle;
