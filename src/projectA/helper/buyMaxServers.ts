/** @param {NS} ns **/

import { NS } from "@ns";

//usage example: run /projectA/helper/buyMaxServers.js 15
export async function main(ns: NS) {
  // need 58b to buy a single MAX server!
  const amount = parseInt(ns.args[0].toString(), 10);
  const currentServerBought = ns.getPurchasedServers();
  const quotaRemain = 25 - currentServerBought.length;
  if (quotaRemain < amount) {
    throw new Error(`Try to buy ${amount} servers, but only quota ${quotaRemain} left`);
  }
  let serverBought = 0;
  let serverSeq = 0;
  while(serverBought < amount) {
    const serverName = `MAX-${serverSeq}`;
    if (currentServerBought.includes(serverName)){
      serverSeq ++;
      continue;
    }
    ns.purchaseServer(serverName, Math.pow(2, 20));
    ns.tprint(`Bought server: ${serverName}`);
    serverSeq ++;
    serverBought ++;
  }
}
