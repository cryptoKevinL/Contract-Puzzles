const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    let game = await Game.deploy();
    await game.deployed();

    // good luck
    while (! (await game.isWon())) {
      let signer = ethers.Wallet.createRandom().connect(ethers.provider);
      const signerAddress = await signer.getAddress();

      //wallet needs ETH to make this TX
      await ethers.provider.send("hardhat_setBalance", [signerAddress, "0xffffffffffffffffffff"]);

      game = await game.connect(signer);
      //console.log("address: " + await signer.getAddress());
      try {
        await game.win();
      } catch (error) {
        //console.log(error);
        continue;
      }
    }

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
