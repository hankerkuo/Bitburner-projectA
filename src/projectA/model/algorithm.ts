import { TimeLine } from "/projectA/interface/actionParam";

export const calculateTimeLine = (
  hackTime: number,
  growTime: number,
  weakTime: number
):TimeLine => {
  let hackStart = -hackTime;
  let firstWeakStart = 3000 - weakTime;
  let growStart = 6000 - growTime;
  let secondWeakStart = 9000 - weakTime;
  //FIXME: fix the offset problem here!
  let offset = Math.min(hackStart, firstWeakStart, growStart, secondWeakStart);
  hackStart -= offset;
  firstWeakStart -= offset;
  growStart -= offset;
  secondWeakStart -= offset;
  const timeLine = {
    hackStart: hackStart,
    firstWeakStart: firstWeakStart,
    growStart: growStart,
    secondWeakStart: secondWeakStart
  }
  return timeLine;
};
