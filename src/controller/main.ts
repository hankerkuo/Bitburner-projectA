/** @param {NS} ns **/

import { NS } from "@ns";
import { createFile, updateKeyValue } from "/model/saveData";

export async function main(ns: NS) {
  // await createFile(ns, "/data/test.txt");
  // await updateKeyValue(ns, "/data/test.txt", 0, 0)
  await updateKeyValue(ns, "/data/test1.txt", "key2", "312")
}