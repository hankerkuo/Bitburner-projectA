/** @param {NS} ns **/

import { NS } from "@ns";

export async function main(ns:NS) {
  var target = ns.args[0].toString();
  var moneyThresh = ns.getServerMaxMoney(target) * 0.75;

  const isMoneyQuataEnough = () => {
    return ns.getServerMoneyAvailable(target) < moneyThresh;
  };
  while (true) {
    if (isMoneyQuataEnough()) {
      await ns.grow(target);
    }
    await ns.sleep(1000);
  }
}
