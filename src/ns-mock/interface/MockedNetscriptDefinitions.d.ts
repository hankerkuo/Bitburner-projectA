/**
 * Options to affect the behavior of {@link NSMock.hack | hack}, {@link NSMock.grow | grow}, and {@link NSMock.weaken | weaken}.
 * @public
 */
 export interface BasicHGWOptions {
  /** Number of threads to use for this function. Must be less than or equal to the number of threads the script is running with. */
  threads?: number;
  /** Set to true this action will affect the stock market. */
  stock?: boolean;
}

export interface NSMock {
  readonly args: (string | number | boolean)[];
  hack(host: string, opts?: BasicHGWOptions): Promise<number>;
  grow(host: string, opts?: BasicHGWOptions): Promise<number>;
  weaken(host: string, opts?: BasicHGWOptions): Promise<number>;
  hackAnalyzeThreads(host: string, hackAmount: number): number;
  growthAnalyze(host: string, growthAmount: number, cores?: number): number;
  getServerMoneyAvailable(host: string): number;
  getServerMaxMoney(host: string): number;
  print(...args: any[]): void;
}