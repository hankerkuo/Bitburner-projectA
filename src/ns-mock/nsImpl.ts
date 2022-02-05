import { NSMock, BasicHGWOptions } from '@ns-mock'
import { TestConst } from '/ns-mock/constant/const';

export class NsImpl implements NSMock {
  readonly args;
  constructor(args0:string){
    this.args = [args0];
  }
  hack(host: string, opts?: BasicHGWOptions): Promise<number> {
    return new Promise((resolve, reject) => {
      // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
      // In this example, we use setTimeout(...) to simulate async code.
      // In reality, you will probably be using something like XHR or an HTML5 API.
      setTimeout( function() {
        if (host === "testServer"){
          resolve(TestConst.HACK_AMOUNT_TEST_SERVER)
        } else{
          resolve(0)
        }
      }, 250)
    })
  }
}