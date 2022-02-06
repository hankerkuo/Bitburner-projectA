import { main } from "../../../src/projectA/model/pureGrow";
import { NsImpl } from "../../../src/ns-mock/nsImpl";
import { TestConst } from "../../../src/ns-mock/constant/const";
import { NS } from "@ns";

describe('Pure grow function verification', () => {
  it('Grow `testServer`', async() => {
    const ns = new NsImpl("testServer");
    const toGrow = await main(ns as NS);
    expect(toGrow).toBe(TestConst.GROW_AMOUNT_TEST_SERVER)
  });

  it('Grow non-existing server', async() => {
    const ns = new NsImpl("nonExistServer");
    const toGrow = await main(ns as NS);
    expect(toGrow).toBe(0)
  });
});
