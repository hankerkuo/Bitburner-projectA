/** @param {NS} ns **/
import { NS } from "@ns";
import { buy } from "/projectA/helper/buyServer";
import { runGeneralOnServer } from "/projectA/runGeneralOnServer";
import { serverList } from "/projectA/serverInfo/serverList";

export async function main(ns: NS) {
  // add 0 port server with 128GB
  // const server0List = serverList(0);
  // for (let i = 0; i < server0List.length; i++) {
  //   const targetServer = server0List[i];
  //   const ram = 7;
  //   ns.tprint(`start to run script on home, using RAM: ${ram}, target server: ${targetServer}`)
  //   await runGeneralOnServer(ns, "home", `/projectA/generalHack.js`, targetServer, Math.pow(2, ram));
  // }
  // add 1 port server with 256GB
  const server0List = serverList(1);
  for (let i = 0; i < server0List.length; i++) {
    const targetServer = server0List[i];
    const ram = 8;
    ns.tprint(`start to run script on home, using RAM: ${ram}, target server: ${targetServer}`)
    await runGeneralOnServer(ns, "home", `/projectA/generalHack.js`, targetServer, Math.pow(2, ram));
  }
  //TODO: add other port servers
  //TODO: add buy server section
  // ns.tprint("start to buy servers");
  // buy(ns, newServerName, ram);
  // ns.tprint(`start to run script on ${newServerName}, RAM: ${ram}`)
  // await runGeneralOnServer(ns, newServerName, "/projectA/generalHack.js", server0List[i], 0);

  // ns.deleteServer("256GB-0");
}
