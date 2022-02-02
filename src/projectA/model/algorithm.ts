import { TimeLine } from "/projectA/interface/actionParam";
import { CONST } from "/projectA/serverInfo/constant";

export const calculateTimeLine = (
  hackTime: number,
  growTime: number,
  weakTime: number
):TimeLine => {
  let hackStart = -hackTime;
  let firstWeakStart = CONST.ACTION_INTERVAL - weakTime;
  let growStart = CONST.ACTION_INTERVAL * 2 - growTime;
  let secondWeakStart = CONST.ACTION_INTERVAL * 3 - weakTime;

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
