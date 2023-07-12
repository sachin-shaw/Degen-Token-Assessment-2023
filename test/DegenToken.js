
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Game Contract", function () {
  let Game;
  let game;
  let owner;
  let player1;
  let player2;
  let itemId;

  before(async function () {
    [owner, player1, player2] = await ethers.getSigners();

    Game = await ethers.getContractFactory("Game");
    game = await Game.deploy();
    await game.deployed();
  });

  it("should grant an item to a player", async function () {
    const grantItemTx = await game.connect(owner).grantItem(player1.address, 1);
    await grantItemTx.wait();

    expect(grantItemTx)
      .to.emit(game, "ItemGranted")
      .withArgs(player1.address, 1);
  });

  it("should return a player's items", async function () {
    const playerItems = await game.getPlayerItems(player1.address);
    expect(playerItems).to.deep.equal([1]);
  });
});

describe("GamingStore Contract", function () {
  let GamingStore;
  let gamingStore;
  let owner;
  let player1;
  let player2;

  beforeEach(async function () {
    GamingStore = await ethers.getContractFactory("GamingStore");
    [owner, player1, player2] = await ethers.getSigners();

    gamingStore = await GamingStore.deploy();
    await gamingStore.deployed();
  });

  it("should add an item to the store", async function () {
    const addItemTx = await gamingStore.addItem("Item 1", 100);
    await addItemTx.wait();
  
    const newItemId = (await gamingStore.getItemsCount()) - 1;
  
    expect(newItemId).to.equal(0);
  
    const item = await gamingStore.getItem(newItemId);
    expect(item.itemId).to.equal(newItemId);
    expect(item.name).to.equal("Item 1");
    expect(item.price).to.equal(100);
  });
  

  it("should redeem an item", async function () {
    const addItemTx = await gamingStore.addItem("Item 1", 100);
    await addItemTx.wait();
  
    const newItemId = (await gamingStore.getItemsCount()) - 1;
  
    const redeemItemTx = await gamingStore.redeemItem(player1.address, newItemId);
    await redeemItemTx.wait();
  
    expect(redeemItemTx)
      .to.emit(gamingStore, "ItemRedeemed")
      .withArgs(player1.address, newItemId);
  
    const isItemRedeemed = await gamingStore.isItemRedeemed(player1.address, newItemId);
    expect(isItemRedeemed).to.be.true;
  });
  
  it("should check if an item is redeemed", async function () {
    const addItemTx = await gamingStore.addItem("Item 1", 100);
    await addItemTx.wait();
  
    const newItemId = (await gamingStore.getItemsCount()) - 1;
  
    const isItemRedeemedBefore = await gamingStore.isItemRedeemed(player1.address, newItemId);
    expect(isItemRedeemedBefore).to.be.false;
  
    const redeemItemTx = await gamingStore.redeemItem(player1.address, newItemId);
    await redeemItemTx.wait();
  
    const isItemRedeemedAfter = await gamingStore.isItemRedeemed(player1.address, newItemId);
    expect(isItemRedeemedAfter).to.be.true;
  });
  

  it("should get the total number of items in the store", async function () {
    const addItemTx1 = await gamingStore.addItem("Item 1", 100);
    await addItemTx1.wait();

    const addItemTx2 = await gamingStore.addItem("Item 2", 200);
    await addItemTx2.wait();

    const addItemTx3 = await gamingStore.addItem("Item 3", 300);
    await addItemTx3.wait();

    const itemsCount = await gamingStore.getItemsCount();

    expect(itemsCount).to.equal(3);
  });
});


describe("DegenToken Contract", function () {
  let DegenToken;
  let degenToken;
  let owner;
  let player1;
  let player2;

  before(async function () {
    [owner, player1, player2] = await ethers.getSigners();
    [owner, recipient] = await ethers.getSigners();

    DegenToken = await ethers.getContractFactory("DegenToken");
    degenToken = await DegenToken.deploy(
      "Degen",
      "DGN",
      18,
      1000000
    );
    await degenToken.deployed();
  });

  it("should have the correct token properties", async function () {
    expect(await degenToken.name()).to.equal("Degen");
    expect(await degenToken.symbol()).to.equal("DGN");
    expect(await degenToken.decimals()).to.equal(18);
    expect(await degenToken.totalSupply()).to.equal(BigInt("1000000") * BigInt(10 ** 18));
  });
  

  it("should transfer tokens from the sender to a recipient", async function () {
    const transferAmount = 100;
  
    // Mint tokens for the sender
    const mintTx = await degenToken.connect(owner).mint(player1.address, transferAmount);
    await mintTx.wait();
  
    const player1BalanceBefore = await degenToken.balanceOf(player1.address);
    const player2BalanceBefore = await degenToken.balanceOf(player2.address);
  
    const transferTx = await degenToken.connect(player1).transfer(player2.address, transferAmount);
    await transferTx.wait();
  
    expect(transferTx)
      .to.emit(degenToken, "Transfer")
      .withArgs(player1.address, player2.address, transferAmount);
  
    const player1BalanceAfter = await degenToken.balanceOf(player1.address);
    const player2BalanceAfter = await degenToken.balanceOf(player2.address);
  
    expect(player1BalanceAfter).to.equal(player1BalanceBefore - transferAmount);
    expect(player2BalanceAfter).to.equal(player2BalanceBefore + transferAmount);
  });
  
  it("should transfer tokens from an account to another account by a third party", async function () {
    const transferAmount = 200;
  
    // Mint tokens for the sender
    const mintTx = await degenToken.connect(owner).mint(player1.address, transferAmount);
    await mintTx.wait();
  
    // Approve the third party to spend tokens on behalf of the sender
    const approveTx = await degenToken.connect(player1).approve(player2.address, transferAmount);
    await approveTx.wait();
  
    const player1BalanceBefore = await degenToken.balanceOf(player1.address);
  
    const transferFromTx = await degenToken
      .connect(player2)
      .transferFrom(player1.address, player2.address, transferAmount);
    await transferFromTx.wait();
  
    expect(transferFromTx)
      .to.emit(degenToken, "Transfer")
      .withArgs(player1.address, player2.address, transferAmount);
  
    const player1BalanceAfter = await degenToken.balanceOf(player1.address);
  
    expect(player1BalanceAfter).to.equal(player1BalanceBefore - transferAmount);
  });
  
  it("should check the allowance granted to a spender by an owner", async function () {
    const approveAmount = 100;
  
    const approveTx = await degenToken.connect(player1).approve(player2.address, approveAmount);
    await approveTx.wait();
  
    const allowanceAmount = await degenToken.allowance(player1.address, player2.address);
    expect(allowanceAmount).to.equal(approveAmount);
  });
  

  it("should mint tokens and increase total supply", async function () {
    const initialSupply = await degenToken.totalSupply();

    await degenToken.connect(owner).mint(recipient.address, ethers.utils.parseEther("100"));

    const balance = await degenToken.balanceOf(recipient.address);
    const newTotalSupply = await degenToken.totalSupply();

    expect(balance).to.equal(ethers.utils.parseEther("100"));
    expect(newTotalSupply).to.equal(initialSupply.add(ethers.utils.parseEther("100")));
  });

  it("should burn tokens and decrease total supply", async function () {
    const initialSupply = await degenToken.totalSupply();

    await degenToken.connect(recipient).burn(ethers.utils.parseEther("50"));

    const balance = await degenToken.balanceOf(recipient.address);
    const newTotalSupply = await degenToken.totalSupply();

    expect(balance).to.equal(ethers.utils.parseEther("50"));
    expect(newTotalSupply).to.equal(initialSupply.sub(ethers.utils.parseEther("50")));
  });

  
  
});