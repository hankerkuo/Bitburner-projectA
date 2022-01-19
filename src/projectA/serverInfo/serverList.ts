export const serverList = (portToHack: number) => {
  switch(portToHack) {
    case 0:
      return [
        "n00dles",
        "sigma-cosmetics",
        "foodnstuff",
        "joesguns",
        "nectar-net",
        "hong-fang-tea",
        "harakiri-sushi",
      ];
    case 1:
      return ["neo-net", "zer0", "max-hardware", "iron-gym", "CSEC"];
    case 2:
      return [
        "avmnite-02h",
        "phantasy",
        "johnson-ortho",
        "crush-fitness",
        "omega-net",
        "the-hub",
        "silver-helix",
      ];
    case 3:
      return [
        "comptek",
        "netlink",
        "catalyst",
        "I.I.I.I",
        "rothman-uni",
        "summit-uni",
      ];
    case 4:
      return ["syscore"];
    default:
      return [];
  }
}