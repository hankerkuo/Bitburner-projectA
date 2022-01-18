/** @param {NS} ns **/

import { NS } from "@ns";

// usage: run runGeneralOnServer.js Hacker generalHack.js max-hardware
export async function main(ns: NS) {
  const targetServer = ns.args[0].toString();
  const scriptName = ns.args[1].toString();
  const targetHack = ns.args[2].toString();
  const scriptCost = ns.getScriptRam(scriptName);
  const targetServerRam =
    ns.getServerMaxRam(targetServer) - ns.getServerUsedRam(targetServer);
  const availRunThread = Math.floor(targetServerRam / scriptCost);
  await ns.scp("crackServer.js", "home", targetServer);
  await ns.scp(scriptName, "home", targetServer);
  ns.exec(scriptName, targetServer, availRunThread, targetHack);
}
