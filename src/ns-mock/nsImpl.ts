import {
  NSMock,
  BasicHGWOptions,
} from "./interface/MockedNetscriptDefinitions";
import { TestConst } from "./constant/const";

export class NsImpl implements NSMock {
  readonly args;
  constructor(args0: string) {
    this.args = [args0];
  }

  hack(host: string, opts?: BasicHGWOptions): Promise<number> {
    return new Promise((resolve, reject) => {
      // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
      // In this example, we use setTimeout(...) to simulate async code.
      // In reality, you will probably be using something like XHR or an HTML5 API.
      setTimeout(function () {
        if (host === "testServer") {
          resolve(TestConst.HACK_AMOUNT_TEST_SERVER);
        } else {
          resolve(0);
        }
      }, 250);
    });
  }

  grow(host: string, opts?: BasicHGWOptions): Promise<number> {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        if (host === "testServer") {
          resolve(TestConst.GROW_AMOUNT_TEST_SERVER);
        } else {
          resolve(0);
        }
      }, 250);
    });
  }

  weaken(host: string, opts?: BasicHGWOptions): Promise<number> {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        if (host === "testServer") {
          resolve(TestConst.WEAKEN_AMOUNT_TEST_SERVER);
        } else {
          resolve(0);
        }
      }, 250);
    });
  }

  getServerMoneyAvailable(host: string): number {
    if (host === "testServer") {
      return TestConst.MONEY_AVAIL_TEST_SERVER;
    }
    else {
      return 0;
    }
  }

  getServerMaxMoney(host: string): number {
    if (host === "testServer") {
      return TestConst.MAX_MONEY_TEST_SERVER;
    }
    else {
      return 0;
    }
  }

  hackAnalyzeThreads(host: string, hackAmount: number): number {
    if (hackAmount > this.getServerMoneyAvailable(host)) {
      return -1;
    }
    if (host === "testServer") {
      //TODO: simulate the algorithm of needed threads
      // here is just the simple simulation -> amount = (1 + x) ^ y
      return Math.pow(1 + (hackAmount / this.getServerMoneyAvailable(host)), 20);
    } else {
      return -1;
    }
  }
}
