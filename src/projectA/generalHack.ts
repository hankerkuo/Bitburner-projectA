/** @param {NS} ns **/
import { crack } from "/projectA/model/crackServer";
import { NS } from "@ns";

// usage: run /projectA/generalHack.js nectar-net 100 -t 100
export async function main(ns: NS) {
  var target = ns.args[0].toString();
  let threadRan = parseInt(ns.args[1].toString(), 10);
  var moneyThresh = ns.getServerMaxMoney(target) * 0.75;
  var securityThresh = ns.getServerMinSecurityLevel(target) * 1.2;

  let lastTimeGrow = 0;
  let lastTimeHack = 0;
  
  if (!ns.hasRootAccess(target)) {
    try {
      await crack(ns, target);
    } catch (e) {
      //Stop running script if port is not enough
      ns.tprint(e);
      return;
    }
  }
  const isMoneyNeedGrow = () => {
    ns.print(`money threshold : ${moneyThresh}`)
    return ns.getServerMoneyAvailable(target) < moneyThresh;
  };
  const isHackLevelEnough = () => {
    return ns.getHackingLevel() > ns.getServerRequiredHackingLevel(target);
  };
  while (true) {
    if (ns.getServerSecurityLevel(target) > securityThresh) {
      await ns.weaken(target, { threads: threadRan });
    }
    // if level is not enough, only grow
    if (!isHackLevelEnough()) {
      ns.print("Hack level not enough, grow only");
      await ns.grow(target, { threads: threadRan });
      continue;
    }
    if (lastTimeHack > lastTimeGrow && isMoneyNeedGrow()) {
      ns.print("lastTimeHack > lastTimeGrow and isMoneyNeedGrow(), grow");
      lastTimeGrow = await ns.grow(target, { threads: threadRan });
    } else if (lastTimeHack < lastTimeGrow) {
      ns.print("lastTimeHack < lastTimeGrow, hack");
      lastTimeHack = await ns.hack(target, { threads: threadRan / 10 });
    } else {
      ns.print(`default hack and then grow`)
      lastTimeHack = await ns.hack(target, { threads: threadRan / 10 });
      lastTimeGrow = await ns.grow(target, { threads: threadRan });
    }
  }
}
