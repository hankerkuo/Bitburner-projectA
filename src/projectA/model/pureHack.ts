/** @param {NS} ns **/

import { NS } from "@ns";

export async function main(ns:NS) {
  const target = ns.args[0].toString();
  return await ns.hack(target);
}
