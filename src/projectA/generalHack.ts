/** @param {NS} ns **/
import { crack } from "/projectA/model/crackServer";
import { NS } from "@ns";

export async function main(ns: NS) {
  var target = ns.args[0].toString();
  var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
  var securityThresh = ns.getServerMinSecurityLevel(target) * 1.2;

  let lastTimeGrow = 0;
  let lastTimeHack = 0;
  if (!ns.hasRootAccess(target)) {
    await crack(ns, target);
  }
  const isMoneyQuataEnough = () => {
    return ns.getServerMoneyAvailable(target) < moneyThresh;
  };
  const isHackLevelEnough = () => {
    return ns.getHackingLevel() > ns.getServerRequiredHackingLevel(target);
  };
  while (true) {
    if (ns.getServerSecurityLevel(target) > securityThresh) {
      await ns.weaken(target);
    }
    // if level is not enough, only grow
    if (!isHackLevelEnough()) {
      ns.print("Hack level not enough, grow only");
      await ns.grow(target);
      continue;
    }
    if (lastTimeHack > lastTimeGrow && isMoneyQuataEnough()) {
      lastTimeGrow = await ns.grow(target);
    } else if (lastTimeHack < lastTimeGrow) {
      lastTimeHack = await ns.hack(target);
    } else {
      lastTimeHack = await ns.hack(target);
      lastTimeGrow = await ns.grow(target);
    }
  }
}
