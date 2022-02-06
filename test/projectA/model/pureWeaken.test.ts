import { main } from "../../../src/projectA/model/pureWeaken";
import { NsImpl } from "../../../src/ns-mock/nsImpl";
import { TestConst } from "../../../src/ns-mock/constant/const";
import { NS } from "@ns";

describe('Pure weaken function verification', () => {
  it('Weaken `testServer`', async() => {
    const ns = new NsImpl("testServer");
    const toWeaken = await main(ns as NS);
    expect(toWeaken).toBe(TestConst.WEAKEN_AMOUNT_TEST_SERVER)
  });

  it('Weaken non-existing server', async() => {
    const ns = new NsImpl("nonExistServer");
    const toWeaken = await main(ns as NS);
    expect(toWeaken).toBe(0)
  });
});
