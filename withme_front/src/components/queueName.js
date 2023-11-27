const QueueName = ({ code }) => {
  if (code === 1001) {
    return <>빠른 대전</>;
  } else if (code === 1002) {
    return <>솔로 랭크</>;
  } else if (code === 1003) {
    return <>자유 랭크</>;
  } else if (code === 1004) {
    return <>무작위 총력전</>;
  }
};
export default QueueName;
