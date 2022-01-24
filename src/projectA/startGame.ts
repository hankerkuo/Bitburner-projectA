/** @param {NS} ns **/
import { NS } from "@ns";
import { buy } from "/projectA/helper/buyServer";
import { runGeneralOnServer } from "/projectA/runGeneralOnServer";
import { serverList } from "/projectA/serverInfo/serverList";

export async function main(ns: NS) {
  const distributeScript = async (serverName:string, portRequiredForTargets:number, ram:number) => {
    const servers = serverList(portRequiredForTargets);
    for (const targetServer in servers) {
      if (!servers[targetServer]){
        ns.tprint(`server: ${targetServer} is not profitable, skipping...`)
        continue;
      }
      ns.tprint(
        `start to run script on ${serverName}, using RAM: ${ram}, target server: ${targetServer}`
      );
      await runGeneralOnServer(
        ns,
        serverName,
        `/projectA/generalHack.js`,
        targetServer,
        Math.pow(2, ram)
      );
    }
  };
  // add 0 port server with 128GB
  // await distributeScript("home", 0, 7);

  // add 1 port server with 256GB
  // await distributeScript("home", 1, 8);

  // add 2 port server with 1024GB
  // await distributeScript("home", 2, 10);

  // add 3 port server with 2048GB
  // await distributeScript("home", 3, 11);

  for (let i = 0; i < 10; i++) {
    buy(ns, `ForPort4-${i}`, 15);
    await distributeScript(`ForPort4-${i}`, 4, 11);
  }

  // ns.deleteServer("256GB-0");
}
