/** @param {NS} ns **/

import { NS } from "@ns";
import { CONST } from "/projectA/serverInfo/constant";

// get thread needed to hack a percentage of money
// return -1 if the money on server is not enough
export const hackThread = (ns: NS, server: string, ratio: number) => {
  return ns.hackAnalyzeThreads(server, ratio * ns.getServerMaxMoney(server));
};

// get thread needed to grow the money based on hack ratio
export const growThread = (ns: NS, server: string, hackRatio: number) => {
  const minimumNeed = ns.growthAnalyze(server, 1 / (1 - hackRatio));
  let growth =
    (ns.getServerMoneyAvailable(server) === 0)
      ? ns.getServerMaxMoney(server) / (ns.getServerMoneyAvailable(server) + 1)
      : ns.getServerMaxMoney(server) / ns.getServerMoneyAvailable(server);
  let recentNeed = ns.growthAnalyze(
    server,
    growth
  );
  // recentNeed = Math.min(recentNeed, CONST.MAX_THREAD_PER_SCRIPT);
  return Math.max(minimumNeed, recentNeed);
};

export const weakenThreadForHack = (
  ns: NS,
  server: string,
  hackRatio: number
) => {
  const thread = hackThread(ns, server, hackRatio);
  return ns.hackAnalyzeSecurity(thread) / 0.05;
};

export const weakenThreadForGrow = (
  ns: NS,
  server: string,
  hackRatio: number
) => {
  const thread = growThread(ns, server, hackRatio);
  return ns.growthAnalyzeSecurity(thread) / 0.05;
};
