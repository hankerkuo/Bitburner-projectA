/** @param {NS} ns **/

import { NS } from "@ns";
import { TimeLine } from "/projectA/interface/actionParam";
import { calculateTimeLine } from "/projectA/model/algorithm";
import { crack } from "/projectA/model/crackServer";

export async function main(ns: NS) {
  //TODO: implement the dispatch over here
  //TODO: add file log for recording if sequence is correct
  let serialNum = 0;
  let triggeredNext = false;
  const observedServer = ns.args[0];
  const runOn = ns.args[1];
  const runThread = 180;
  // while:
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
    // get server statics
    
    // TODO: specify the total RAM to use and distribute the thread to use
    
    let hackTime = ns.getHackTime(observedServer);
    let growTime = ns.getGrowTime(observedServer);
    let weakTime = ns.getWeakenTime(observedServer);
    let timeLine: TimeLine = calculateTimeLine(hackTime, growTime, weakTime);
    // ns.tprint(`Got timeLine: 
    // hackTime need: ${hackTime},
    // growTime need: ${growTime},
    // weakTime need: ${weakTime},
    // hackStart start: ${timeLine.hackStart},
    // firstWeakStart start: ${timeLine.firstWeakStart},
    // growStart start: ${timeLine.growStart},
    // secondWeakStart start: ${timeLine.secondWeakStart}`);
    
    // copy the files to the runOn server
    if (!ns.fileExists("/projectA/model/pureHack.js", runOn)) {
      await ns.scp("/projectA/model/pureHack.js", "home", runOn);
    }
    if (!ns.fileExists("/projectA/model/pureWeaken.js", runOn)) {
      await ns.scp("/projectA/model/pureWeaken.js", "home", runOn);
    }
    if (!ns.fileExists("/projectA/model/pureGrow.js", runOn)) {
      await ns.scp("/projectA/model/pureGrow.js", "home", runOn);
    }

    // batch observe every 10 second
    let milliSecPassed = 0;
    let proceed = {
      hack: false,
      firstWeak: false,
      grow: false,
      secondWeak: false,
    };
    while (true) {
      serialNum++;
      await ns.sleep(10);
      milliSecPassed += 10;
      if (milliSecPassed == 12000) {
        ns.exec(
          "/projectA/controller/dispatcher.js",
          "home",
          1,
          observedServer,
          runOn,
          Date.now()
        );
        triggeredNext = true;
      }
      if (!proceed.hack && milliSecPassed > timeLine.hackStart) {
        // ns.tprint(`Start Hack script`);
        ns.exec(
          "/projectA/model/pureHack.js",
          runOn,
          runThread,
          observedServer,
          Date.now()
        );
        proceed.hack = true;
      }
      if (!proceed.firstWeak && milliSecPassed > timeLine.firstWeakStart) {
        // ns.tprint(`Start Weak script`);
        ns.exec(
          "/projectA/model/pureWeaken.js",
          runOn,
          runThread * 5,
          observedServer,
          Date.now()
        );
        proceed.firstWeak = true;
      }
      if (!proceed.grow && milliSecPassed > timeLine.growStart) {
        // ns.tprint(`Start Grow script`);
        ns.exec(
          "/projectA/model/pureGrow.js",
          runOn,
          runThread * 10,
          observedServer,
          Date.now()
        );
        proceed.grow = true;
      }
      if (!proceed.secondWeak && milliSecPassed > timeLine.secondWeakStart) {
        // ns.tprint(`Start Weak script`);
        ns.exec(
          "/projectA/model/pureWeaken.js",
          runOn,
          runThread * 5,
          observedServer,
          Date.now()
        );
        proceed.secondWeak = true;
      }
      if (
        (proceed.hack &&
          proceed.firstWeak &&
          proceed.grow &&
          proceed.secondWeak && triggeredNext && ns.args[2]) ||
        serialNum == 2147483647
      ) {
        return;
      }
    }
  };
  
  await singleCircle();
}
