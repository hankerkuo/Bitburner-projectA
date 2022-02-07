import { hackThread } from "../../../src/projectA/model/threadCalculate";
import { CONST } from "../../../src/projectA/serverInfo/constant";
import { NsImpl } from "../../../src/ns-mock/nsImpl";
import { TestConst } from "../../../src/ns-mock/constant/const";
import { NS } from "@ns";

describe("Hack thread calculate verification", () => {
  const ns = new NsImpl("");
  it("Check hack thread result not greater than max thread per script", () => {
    const threadCalculated = hackThread(
      ns as NS,
      "testServer",
      0.99 * ns.getServerMoneyAvailable("testServer") /
        ns.getServerMaxMoney("testServer")
    );
    expect(threadCalculated).toBeGreaterThan(0);
    expect(threadCalculated).toBeLessThanOrEqual(CONST.MAX_THREAD_PER_SCRIPT);
  });
  it("Check hack thread result return -1 when hack ratio > 1", () => {
    const threadCalculated = hackThread(
      ns as NS,
      "testServer",
      1.1
    );
    expect(threadCalculated).toBe(-1);
  });
  it("Check hack thread result return -1 when server not exists", () => {
    const threadCalculated = hackThread(
      ns as NS,
      "nonExistServer",
      CONST.HACK_RATIO
    );
    expect(threadCalculated).toBe(-1);
  });
  it("Check hack thread result return -1 when money not enough", () => {
    const threadCalculated = hackThread(
      ns as NS,
      "testServer",
      1.1 * ns.getServerMoneyAvailable("testServer") /
        ns.getServerMaxMoney("testServer")
    );
    expect(threadCalculated).toBe(-1);
  });
  it("Check hack thread result > 0 when money is enough", () => {
    const threadCalculated = hackThread(
      ns as NS,
      "testServer",
      ns.getServerMoneyAvailable("testServer") /
        ns.getServerMaxMoney("testServer")
    );
    expect(threadCalculated).toBeGreaterThan(0);
  });
});