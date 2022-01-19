/** @param {NS} ns **/

import { NS } from "@ns";
import { serverList } from "/projectA/serverInfo/serverList";

// this script is used to print useful information for all servers
// usage: run printAllAvaiMoney [server ports to specify]
// e.g. run printAllAvaiMoney 3
export async function main(ns: NS) {
  const singleServerStat = (serverName: string) => {
    let secLevel = ns.getServerSecurityLevel(serverName);
    let monAvail = ns.getServerMoneyAvailable(serverName);
    let requiredLevel = ns.getServerRequiredHackingLevel(serverName);
    doublePrint(`${serverName}: 
		security level: ${secLevel}
		current money: ${monAvail}
		required Hack Level: ${requiredLevel}`);
  };
  const doublePrint = (text: string) => {
    ns.tprint(text);
    ns.print(text);
  };
  ns.disableLog("ALL");
  // Array of all servers that don't need any ports opened
  // to gain root access. These have 16 GB of RAM
  let servers0Port = serverList(0);

  // Array of all servers that only need 1 port opened
  // to gain root access. These have 32 GB of RAM
  let servers1Port = serverList(1);

  // Array of all servers that only need 2 port opened
  let servers2Port = serverList(2);

  // Array of all servers that only need 3 port opened
  let servers3Port = serverList(3);

  // Array of all servers that only need 4 port opened
  let servers4Port = serverList(4);

  const allPortsServerList = [
    servers0Port,
    servers1Port,
    servers2Port,
    servers3Port,
    servers4Port,
  ];

  for (let i = 0; i < allPortsServerList.length; i++) {
    if (ns.args[0] != null && ns.args[0] != i) {
      continue;
    }
    let servers = allPortsServerList[i];
    doublePrint(`[=====PORT${i} servers=====]`);
    for (const server of servers) {
      singleServerStat(server);
    }
    doublePrint(`[=====PORT${i} servers=====]`);
  }

  if (ns.args[0] == "my") {
    for (const server of ns.getPurchasedServers()) {
      doublePrint(`server name: ${server}`);
      doublePrint(`Max RAM: ${ns.getServerMaxRam(server)}`);
      const freeRam = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
      doublePrint(`Available RAM: ${freeRam}`);
    }
  }
}
