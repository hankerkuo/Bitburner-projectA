interface portServersInfo {
  [key: string]: string | number,
}

export const serverList = (portToHack: number):portServersInfo => {
  switch (portToHack) {
    case 0:
      return {
        n00dles: 1,
        "sigma-cosmetics": 1,
        foodnstuff: 1,
        joesguns: 1,
        "nectar-net": 1,
        "hong-fang-tea": 1,
        "harakiri-sushi": 1,
      };
    case 1:
      return {
        "neo-net": 1,
        zer0: 1,
        "max-hardware": 1,
        "iron-gym": 1,
        CSEC: 0,
      };
    case 2:
      return {
        "avmnite-02h": 0,
        phantasy: 1,
        "johnson-ortho": 1,
        "crush-fitness": 1,
        "omega-net": 1,
        "the-hub": 1,
        "silver-helix": 1,
      };
    case 3:
      return {
        comptek: 1,
        netlink: 1,
        catalyst: 1,
        "I.I.I.I": 0,
        "rothman-uni": 0,
        "summit-uni": 1,
        "rho-construction": 1,
        "millenium-fitness": 1,
      };
    case 4:
      return {
        syscore: 1,
        "global-pharm": 1,
        "nova-med": 1,
        "zb-def": 1,
        "alpha-ent": 1,
        "aevum-police": 1,
        "univ-energy": 1,
        unitalife: 1,
        "snap-fitness": 1,
        "lexo-corp": 1,
      };
    case 5:
      return {
        "zb-institute": 1,
        "galactic-cyber": 1,
        "defcomm": 1,
        "aerocorp": 1,
        "omnia": 1,
        "icarus": 1,
        "taiyang-digital": 1,
        "solaris": 1,
        "infocomm": 1,
        "zeus-med": 1,
        "deltaone": 1,
        "titan-labs": 1,
        "helios": 1,
        "omnitek": 1,
        "kuai-gong": 1,
        "blade": 1,
        "megacorp": 1,
        "nwo": 1,
        "microdyne": 1,
        "vitalife": 1,
        "4sigma": 1,
        "b-and-a": 1,
        "ecorp": 1,
        "clarkinc": 1,
        "stormtech": 1,
        "fulcrumtech": 1,
        "The-Cave": 0,
        "fulcrumassets": 1,
        "powerhouse-fitness": 1,
      };
    default:
      return {};
  }
};
