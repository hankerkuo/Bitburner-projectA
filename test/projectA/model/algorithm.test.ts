// import { TimeLine } from "/projectA/interface/actionParam";
import { TimeLine } from "../../../src/projectA/interface/actionParam";
import { calculateTimeLine } from "../../../src/projectA/model/algorithm";

test("Time line correctly calculated", () => {
  const hackTime = 2000;
  const growTime = 10000;
  const weakTime = 5000;
  const timeLine: TimeLine = calculateTimeLine(hackTime, growTime, weakTime);

  const firstStepTiming = Math.min(...Object.values(timeLine));
  expect(firstStepTiming).toBe(0);
  
  expect(timeLine.hackStart + hackTime).toBeLessThan(
    timeLine.firstWeakStart + weakTime
  );
  expect(timeLine.firstWeakStart + weakTime).toBeLessThan(
    timeLine.growStart + growTime
  );
  expect(timeLine.growStart + growTime).toBeLessThan(
    timeLine.secondWeakStart + weakTime
  );
});
