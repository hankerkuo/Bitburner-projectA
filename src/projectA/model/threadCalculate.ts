/** @param {NS} ns **/

import { NS } from "@ns";
import { CONST } from "/projectA/serverInfo/constant";

// get thread needed to hack a percentage of money
// return -1 if the money on server is not enough
export const hackThread = (ns: NS, server: string, ratio: number) => {
  let toReturn = 0;
  // hackAnalyzeThreads will return -1 if money is not enough on server
  toReturn = ns.hackAnalyzeThreads(server, ratio * ns.getServerMaxMoney(server));
  return Math.min(CONST.MAX_THREAD_PER_SCRIPT, toReturn)
};

// get thread needed to grow the money based on hack ratio
export const growThread = (ns: NS, server: string, hackRatio: number) => {
  let toReturn = 0;
  const minimumNeed = ns.growthAnalyze(server, 1 / (1 - hackRatio));
  let growth =
    (ns.getServerMoneyAvailable(server) === 0)
      ? ns.getServerMaxMoney(server) / (ns.getServerMoneyAvailable(server) + 1)
      : ns.getServerMaxMoney(server) / ns.getServerMoneyAvailable(server);
  let recentNeed = ns.growthAnalyze(
    server,
    growth
  );
  if (CONST.GROW_RATIO !== 0) {
    toReturn = ns.growthAnalyze(
      server,
      CONST.GROW_RATIO
    );
  } else {
    toReturn = Math.max(minimumNeed, recentNeed);
  }
  return Math.min(CONST.MAX_THREAD_PER_SCRIPT, toReturn);
};

export const weakenThreadForHack = (
  ns: NS,
  server: string,
  hackRatio: number
) => {
  let toReturn = 0;
  const thread = hackThread(ns, server, hackRatio);
  toReturn = ns.hackAnalyzeSecurity(thread) / 0.05;
  return Math.min(CONST.MAX_THREAD_PER_SCRIPT, toReturn);
};

export const weakenThreadForGrow = (
  ns: NS,
  server: string,
  hackRatio: number
) => {
  let toReturn = 0;
  const thread = growThread(ns, server, hackRatio);
  toReturn = ns.growthAnalyzeSecurity(thread) / 0.05;
  return Math.min(CONST.MAX_THREAD_PER_SCRIPT, toReturn);
};
