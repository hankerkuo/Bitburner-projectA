export const CONST = {
  // this will limit the thread calculation model's max
  // value calculated for running scripts
  MAX_THREAD_PER_SCRIPT: 100,

  // this will be used to gate the `grow` script
  // since grow script is likely to use lots of theads
  WAIT_THRESHOLD_THREAD: 100,

  // Action series: Hack->Weak->Grow->Weak
  // this constant define the interval between them
  // the smaller, the more RAM needed!
  ACTION_INTERVAL: 800,
  
  // the percentage of `MAX money` aiming to hack
  // within a single run, in the early game with
  // limited RAM, you may need to set this low
  HACK_RATIO: 0.1,
  
  // set to 0 will let the grow ratio automatic
  // automatic means the script will try to 
  // maximize the server's money in a single run
  GROW_RATIO: 0
}