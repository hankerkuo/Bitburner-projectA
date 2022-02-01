/** @param {NS} ns **/

import { NS } from "@ns";
import { TimeLine } from "/projectA/interface/actionParam";
import { calculateTimeLine } from "/projectA/model/algorithm";
import {
  hackThread,
  growThread,
  weakenThreadForHack,
  weakenThreadForGrow,
} from "/projectA/model/threadCalculate";
import { scriptPosition } from "/projectA/serverInfo/ScriptInfo";

interface Worker {
  ns: NS;
  observedServer: string;
  timeLine: TimeLine;
  hackRatio: number;
  growTime: number;
  weakTime: number;
  minThreadGrowNeed: number;
  hackThread(): number;
  hackTiming(): number;
  weak1Thread(): number;
  weak1Timing(): number;
  growThread(): number;
  growTiming(): number;
  weak2Thread(): number;
  weak2Timing(): number;
  runHack(runOn: string): void;
  runGrow(runOn: string): void;
  runWeak1(runOn: string): void;
  runWeak2(runOn: string): void;
  runWeakToLowest(runOn: string): void;
}

export class BaseWorker implements Worker {
  public ns;
  public observedServer;
  public timeLine;
  public hackRatio;
  public growTime;
  public weakTime;
  public minThreadGrowNeed;
  private threadThresh: number = Math.pow(2, 15);
  constructor(ns: NS, observedServer: string, hackRatio: number) {
    this.ns = ns;
    this.observedServer = observedServer;
    let hackTime = ns.getHackTime(observedServer);
    this.growTime = ns.getGrowTime(observedServer);
    this.weakTime = ns.getWeakenTime(observedServer);
    this.timeLine = calculateTimeLine(hackTime, this.growTime, this.weakTime);
    this.hackRatio = hackRatio;
    this.minThreadGrowNeed = ns.growthAnalyze(
      observedServer,
      1 / (1 - hackRatio)
    );
  }
  public growThread(): number {
    return 1.2 * growThread(this.ns, this.observedServer, this.hackRatio);
  }
  public growTiming(): number {
    return this.timeLine.growStart;
  }
  public hackThread(): number {
    return hackThread(this.ns, this.observedServer, this.hackRatio);
  }
  public hackTiming(): number {
    return this.timeLine.hackStart;
  }
  public weak1Thread(): number {
    return 1.2 * weakenThreadForHack(this.ns, this.observedServer, this.hackRatio);
  }
  public weak1Timing(): number {
    return this.timeLine.firstWeakStart;
  }
  public weak2Thread(): number {
    return 1.2 * weakenThreadForGrow(this.ns, this.observedServer, this.hackRatio);
  }
  public weak2Timing(): number {
    return this.timeLine.secondWeakStart;
  }
  public runGrow(runOn: string): void {
    const thread = this.growThread();
    if (thread <= 0 || thread > this.threadThresh) return;
    this.ns.exec(
      scriptPosition.pureGrow,
      runOn,
      thread,
      this.observedServer,
      Date.now()
    );
  }
  public runHack(runOn: string): void {
    const thread = this.hackThread();
    if (thread <= 0 || thread > this.threadThresh) return;
    this.ns.exec(
      scriptPosition.pureHack,
      runOn,
      thread,
      this.observedServer,
      Date.now()
    );
  }
  public runWeak1(runOn: string): void {
    const thread = this.weak1Thread();
    if (thread <= 0 || thread > this.threadThresh) return;
    this.ns.exec(
      scriptPosition.pureWeaken,
      runOn,
      thread,
      this.observedServer,
      Date.now()
    );
  }
  public runWeak2(runOn: string): void {
    const thread = this.weak2Thread();
    if (thread <= 0 || thread > this.threadThresh) return;
    this.ns.exec(
      scriptPosition.pureWeaken,
      runOn,
      thread,
      this.observedServer,
      Date.now()
    );
  }
  public runWeakToLowest(runOn: string): void {
    const thread =
      (this.ns.getServerSecurityLevel(this.observedServer) -
      this.ns.getServerMinSecurityLevel(this.observedServer)) /
      0.05;
    this.ns.exec(
      scriptPosition.pureWeaken,
      runOn,
      thread * 1.1,
      this.observedServer,
      Date.now()
    );
  }
}
