import { main } from "../../../src/projectA/model/pureHack";
import { NsImpl } from "../../../src/ns-mock/nsImpl";
import { TestConst } from "../../../src/ns-mock/constant/const";
import { NS } from "@ns";

describe('Pure hack function verification', () => {
  it('Hack `testServer`', async() => {
    const ns = new NsImpl("testServer");
    const toObtain = await main(ns as NS);
    expect(toObtain).toBe(TestConst.HACK_AMOUNT_TEST_SERVER)
  });

  it('Hack non-existing server', async() => {
    const ns = new NsImpl("nonExistServer");
    const toObtain = await main(ns as NS);
    expect(toObtain).toBe(0)
  });
});
