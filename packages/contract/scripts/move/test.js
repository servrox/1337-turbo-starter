require("dotenv").config();

const cli = require("@aptos-labs/ts-sdk/dist/common/cli/index.js");

async function test() {
  const move = new cli.Move();

  await move.test({
    packageDirectoryPath: "@repo/contract",
    namedAddresses: {
      message_board_addr: "0x100",
    },
  });
}
test();
