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

export async function runGeneralOnServer(
  ns: NS,
  targetServer: string,
  scriptName: string,
  targetHack: string,
  specifiedRAM: number
) {
  const scriptCost = ns.getScriptRam(scriptName);
  const targetServerRam =
    ns.getServerMaxRam(targetServer) - ns.getServerUsedRam(targetServer);

  let runThread = 0;
  if (!specifiedRAM) {
    runThread = Math.floor(targetServerRam / scriptCost);
  } else {
    runThread = Math.floor(specifiedRAM / scriptCost);
  }
  // copy files to the server if not exists
  if (!ns.fileExists("/projectA/model/crackServer.js", targetServer)) {
    await ns.scp("/projectA/model/crackServer.js", "home", targetServer);
  }
  if (!ns.fileExists(scriptName, targetServer)) {
    await ns.scp(scriptName, "home", targetServer);
  }
  ns.exec(scriptName, targetServer, runThread, targetHack);
}
