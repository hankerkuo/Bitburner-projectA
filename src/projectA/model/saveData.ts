/** @param {NS} ns **/

import { NS } from "@ns";

export async function createFile(ns: NS, file: string) {
  await ns.write(file, "{}", "w");
}

/**
 * This functino updates the key-value pair in
 * the target file
 * @param {ns} ns
 * @param {string} file
 * @param {string} key
 * @param {any} value
 */
/** @param {import("../").NS } ns */
export const updateKeyValue = async (
  ns: NS,
  file: string,
  key: string,
  value: string
) => {
  if (!ns.fileExists(file, ns.getHostname())) {
    throw `File: ${file} not exists on ${ns.getHostname()}! 
    EXIT script! 
    try to create file using createFile()`;
  }
  let currentContent = ns.read(file);
  let result = JSON.parse(currentContent);
  result[key] = value;
  await ns.write(file, JSON.stringify(result), "w");
};
