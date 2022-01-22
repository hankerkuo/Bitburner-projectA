/** @param {NS} ns **/
import { NS } from "@ns";

export async function crack(ns: NS, target: string) {
  let portOpened = 0;
  if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.brutessh(target);
    portOpened ++;
  }
  if (ns.fileExists("FTPCrack.exe", "home")) {
    ns.ftpcrack(target);
    portOpened ++;
  }
  if (ns.fileExists("relaySMTP.exe", "home")) {
    ns.relaysmtp(target);
    portOpened ++;
  }
  if (ns.fileExists("HTTPWorm.exe", "home")) {
    ns.httpworm(target);
    portOpened ++;
  }
  if (ns.fileExists("SQLInject.exe", "home")) {
    ns.sqlinject(target);
    portOpened ++;
  }
  if (portOpened >= ns.getServerNumPortsRequired(target)){
    ns.nuke(target);
  }
  else{
    throw new Error(`Cannot open enough ports for server NUKE: ${target},
    port needed: ${ns.getServerNumPortsRequired(target)},
    port opend: ${portOpened}`)
  }
}
