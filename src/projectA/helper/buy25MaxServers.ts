/** @param {NS} ns **/

import { NS } from "@ns";

export async function main(ns: NS) {
  // need 58b to buy a single MAX server!
  for (let i = 0; i < 25; i++) {
    ns.purchaseServer(`MAX-${i}`, Math.pow(2, 20));
  }
}
