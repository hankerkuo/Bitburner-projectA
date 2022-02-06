## Bitburner - projectA: Best Automate Bitburner

This project implements the hack algorithm mentioned on the official website:
[HWGW (Hack-Weak-Grow-Weak algorithm)](https://bitburner.readthedocs.io/en/latest/advancedgameplay/hackingalgorithms.html#batch-algorithms-hgw-hwgw-or-cycles)
- First need to compile the Typescript files and put them into the game, check [vscode-template](https://github.com/bitburner-official/vscode-template) for more details
- The algorithm implemented will calculate threads for best hack/grow the server
- Global settings: Edit the [Config file](https://github.com/hankerkuo/Bitburner-projectA/blob/develop/src/projectA/serverInfo/constant.ts) before running

## Examples
- `dispatcher.js` is the core script, basic command for hacking `n00dles` on `home`:
```
run /projectA/controller/dispatcher.js n00dles home
```

## Bonus Feature - Make unit test possible for Bitburner
Aside from core automation code of Bitburner,
in this repo, we provide a [framework](https://github.com/hankerkuo/Bitburner-projectA/tree/develop/src/ns-mock) for mocking Bitburner in-game APIs.

Hope the essence of TDD (Test-Driven-Development) can be adopted among the
Bitburner development community as well!

Please check the [test](https://github.com/hankerkuo/Bitburner-projectA/tree/develop/test) folder, there are some examples for how to use the mocking framework.

## Template of Typescript for Bitburner of this project
Thanks for the great work of
[vscode-template](https://github.com/bitburner-official/vscode-template)