/** @param {NS} ns **/

import { NS } from "@ns";
import { crack } from "/projectA/model/crackServer";
import { BaseWorker } from "/projectA/model/worker";
import { scriptPosition } from "/projectA/serverInfo/ScriptInfo";
import { CONST } from "/projectA/serverInfo/constant";

/**
 *
 * @param ns
 * sample usage: run dispatcher.js comptek MAX-0
 * will use MAX-0 to observe comptek and run hack,grow,weaken on MAX-0
 * this script, e.g. dispatcher.ts will always run on home
 */
export async function main(ns: NS) {
  ns.disableLog("sleep");
  //TODO: add file log for recording if sequence is correct
  let triggeredNext = false;
  const observedServer = ns.args[0].toString();
  const runOn = ns.args[1].toString();
  const worker = new BaseWorker(ns, observedServer, CONST.HACK_RATIO);

  const milliSecondToHour = (milliSec: number) => {
    return milliSec / 1000 / 3600;
  };

  const singleCircle = async () => {
    // crack server if possible
    if (!ns.hasRootAccess(observedServer)) {
      try {
        ns.tprint(`start to crack on: ${observedServer}`);
        await crack(ns, observedServer);
      } catch (e) {
        //Stop running script if port is not enough
        ns.tprint(e);
        return;
      }
    }

    // copy the files to the runOn server
    if (!ns.fileExists(scriptPosition.pureHack, runOn)) {
      await ns.scp(scriptPosition.pureHack, "home", runOn);
    }
    if (!ns.fileExists(scriptPosition.pureWeaken, runOn)) {
      await ns.scp(scriptPosition.pureWeaken, "home", runOn);
    }
    if (!ns.fileExists(scriptPosition.pureGrow, runOn)) {
      await ns.scp(scriptPosition.pureGrow, "home", runOn);
    }

    // first time running or too secure, wait first
    if (ns.args[2] === "starter" || 
      (ns.getServerSecurityLevel(observedServer) >
      ns.getServerMinSecurityLevel(observedServer) * 2)
    ) {
      ns.tprint(`too secure for ${observedServer}
      secure level: ${ns.getServerSecurityLevel(observedServer)}
      script serial = ${ns.args[2]}`);
      worker.runWeakToLowest(runOn);
      await ns.sleep(worker.weakTime);
      ns.exec(
        scriptPosition.dispather,
        "home",
        1,
        observedServer,
        runOn,
        Date.now()
      );
      return;
    }

    // too many grow threads, rest for a while
    if (worker.growThread() > CONST.WAIT_THRESHOLD_THREAD) {
      ns.tprint(`too many threads running for growing ${observedServer}`);
      ns.tprint(`wait for ${worker.growTime / 1000} seconds`);
      worker.runGrow(runOn);
      worker.runWeak2(runOn);
      await ns.sleep(worker.growTime);
      ns.exec(
        scriptPosition.dispather,
        "home",
        1,
        observedServer,
        runOn,
        Date.now()
      );
      return;
    }

    let milliSecPassed = 0;
    const proceed = {
      hack: false,
      firstWeak: false,
      grow: false,
      secondWeak: false,
    };
    // batch observe every 10 mili-second
    const startTime = Date.now();
    while (true) {
      await ns.sleep(10);
      milliSecPassed += 10;
      if (!triggeredNext && (Date.now() - startTime) >= CONST.ACTION_INTERVAL * 4) {
        ns.exec(
          scriptPosition.dispather,
          "home",
          1,
          observedServer,
          runOn,
          Date.now()
        );
        triggeredNext = true;
      }
      if (!proceed.hack && (Date.now() - startTime) > worker.hackTiming()) {
        ns.print(`Start Hack script`);
        proceed.hack = true;
        worker.runHack(runOn);
      }
      if (!proceed.firstWeak && (Date.now() - startTime) > worker.weak1Timing()) {
        ns.print(`Start Weak script`);
        proceed.firstWeak = true;
        worker.runWeak1(runOn);
      }
      if (!proceed.grow && (Date.now() - startTime) > worker.growTiming()) {
        ns.print(`Start Grow script`);
        proceed.grow = true;
        worker.runGrow(runOn);
      }
      if (!proceed.secondWeak && (Date.now() - startTime) > worker.weak2Timing()) {
        ns.print(`Start Weak script`);
        proceed.secondWeak = true;
        worker.runWeak2(runOn);
      }
      if (
        proceed.hack &&
        proceed.firstWeak &&
        proceed.grow &&
        proceed.secondWeak &&
        triggeredNext &&
        ns.args[2]
      ) {
        return;
      }
      // shut down script after stuck for 2 hours
      if (milliSecondToHour(milliSecPassed) > 2) {
        return;
      }
    }
  };

  await singleCircle();
}
