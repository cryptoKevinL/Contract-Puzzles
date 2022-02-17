const { assert } = require("chai");

describe("Game4", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    // nested mappings are rough :}
    const signer0 = ethers.provider.getSigner(0);
    const address0 = await signer0.getAddress();
    await game.write(address0);

    await game.win(address0);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
