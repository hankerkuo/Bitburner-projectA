/** @param {NS} ns **/

import { NS } from "@ns";

export async function main(ns: NS) {
  ns.purchaseServer(
    ns.args[0].toString(),
    Math.pow(2, parseInt(ns.args[1].toString(), 10))
  );
}

export const buy = (ns: NS, name: string, core: number) => {
  ns.purchaseServer(
    name,
    Math.pow(2, core)
  );
}