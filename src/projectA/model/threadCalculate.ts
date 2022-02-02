/** @param {NS} ns **/

import { NS } from "@ns";
import { CONST } from "/projectA/serverInfo/constant";

// get thread needed to hack a percentage of money
// return -1 if the money on server is not enough
export const hackThread = (ns: NS, server: string, ratio: number) => {
  // hackAnalyzeThreads will return -1 if money is not enough on server
  const toReturn = ns.hackAnalyzeThreads(
    server,
    ratio * ns.getServerMaxMoney(server)
  );
  return Math.min(CONST.MAX_THREAD_PER_SCRIPT, toReturn);
};

// get thread needed to grow the money based on hack ratio
export const growThread = (ns: NS, server: string, hackRatio: number) => {
  const minimumNeed = ns.growthAnalyze(server, 1 / (1 - hackRatio));
  const growth =
    ns.getServerMoneyAvailable(server) === 0
      ? ns.getServerMaxMoney(server) / (ns.getServerMoneyAvailable(server) + 1)
      : ns.getServerMaxMoney(server) / ns.getServerMoneyAvailable(server);
  const recentNeed = ns.growthAnalyze(server, growth);
  const toReturn =
    CONST.GROW_RATIO !== 0
      ? ns.growthAnalyze(server, CONST.GROW_RATIO)
      : Math.max(minimumNeed, recentNeed);
  return Math.min(CONST.MAX_THREAD_PER_SCRIPT, toReturn);
};

export const weakenThreadForHack = (
  ns: NS,
  server: string,
  hackRatio: number
) => {
  const thread = hackThread(ns, server, hackRatio);
  const toReturn = ns.hackAnalyzeSecurity(thread) / 0.05;
  return Math.min(CONST.MAX_THREAD_PER_SCRIPT, toReturn);
};

export const weakenThreadForGrow = (
  ns: NS,
  server: string,
  hackRatio: number
) => {
  const thread = growThread(ns, server, hackRatio);
  const toReturn = ns.growthAnalyzeSecurity(thread) / 0.05;
  return Math.min(CONST.MAX_THREAD_PER_SCRIPT, toReturn);
};

export const weakenToLowest = (ns: NS, server: string) => {
  const toReturn =
    (ns.getServerSecurityLevel(server) - ns.getServerMinSecurityLevel(server)) /
    0.05;
  return Math.min(CONST.MAX_THREAD_PER_SCRIPT, toReturn);
};
