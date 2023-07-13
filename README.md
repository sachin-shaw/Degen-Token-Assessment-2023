# Degen-Token-Assessment-2023

## Description
This repository contains Solidity contracts for a game and gaming store implemented on the Ethereum blockchain. The contracts provide functionality for granting items to players, redeeming items from the store, and managing a custom token called DegenToken for in-game transactions.

## The contracts have been thoroughly tested and have passed all the functionality requirements.

## The functionality of the contracts is as follows:

1. The Game contract : allows the game administrator to grant items to players. It stores the items owned by each player in the playerItems mapping.

2. The GamingStore contract : allows players to redeem items using the DegenToken. Players can add items to the store using the addItem function. Each item has a unique ID, name, and price. Players can check if an item has been redeemed using the isItemRedeemed function. The redeemItem function allows players to redeem an item from the store by specifying the item ID. Upon redemption, the purchases mapping is updated to track the redemption status. The getItem function retrieves the details of an item by its ID, and the getItemsCount function returns the total number of items in the store.

3. The DegenToken contract : manages the custom token used for in-game transactions. It allows players to transfer tokens to each other using the transfer function. The transferFrom function enables third-party transfers by using allowances. Players can approve other accounts to spend tokens on their behalf using the approve function. The allowance function allows checking the amount of tokens approved for a spender. The mint function allows the game administrator to create new tokens and distribute them to players. The burn function allows players to burn their own tokens. Additionally, the redeem function enables players to redeem an item from the gaming store by specifying the item ID. This function deducts the item's price from the player's balance, updates the purchases mapping, and grants the item to the player in the game using the grantItem function from the Game contract.

## Verification on Snowtrace Testnet
The contracts have been verified and deployed on the Snowtrace Testnet with the following contract addresses:
Please search on https://testnet.snowtrace.io/

1. Game Contract: 0xA575BaCBf9AB3cb22AA773A4b4e53Bf2601D17F6
2. GamingStore Contract: 0xc22052AFA28bf1671cC9e827243e9D3355f4277F
3. DegenToken Contract: 0xB8a646a691ea2ABF67450AAf5c53FA908a790517
   
You can interact with the contracts on the Snowtrace Testnet using the provided contract addresses.

## Testing
The contracts have undergone comprehensive testing to ensure their functionality and robustness. The testing process involved the following steps:

Unit Testing: Each contract was individually tested using Solidity unit testing frameworks like Hardhat. The unit tests cover various scenarios to verify the correct implementation of contract functions and validate their expected behavior.

Integration Testing: The contracts were tested together to ensure their compatibility and proper interaction. Integration tests were performed to verify the seamless functioning of the game, gaming store, and DegenToken contracts as a unified system.

Deployment Testing: The contracts were deployed on the Snowtrace Testnet and extensively tested in a simulated live environment. The testing process included verifying the correct deployment of contracts, executing various transactions, and validating the expected outcomes.

Security Audits: The contracts were reviewed and audited for potential security vulnerabilities by experienced Solidity developers and auditors. The identified issues, if any, were addressed to enhance the security of the contracts.

By undergoing rigorous testing, including unit testing, integration testing, deployment testing, and security audits, the contracts have proven to be reliable and robust for use in the intended scenarios.

## Getting Started
Installing
To use these contracts, you can download the Solidity source code files directly from this repository.

## Executing program
To compile and deploy the contracts, you can use a Solidity development environment like Remix . Follow the steps below:

Open the Solidity development environment of your choice.
Create a new Solidity file for each contract: Game.sol, GamingStore.sol, and DegenToken.sol.
Copy the contract code into their respective files.
Compile the contracts in the development environment, ensuring you set the appropriate compiler version (pragma).
Deploy the contracts to the Snowtrace Testnet using the provided contract addresses.
Once the contracts are deployed, you can interact with them using a web3-enabled application or by calling the contract functions directly.

## Testing
To run the tests for the contracts, follow the steps below:

Install the required dependencies by running npm install in the project directory.
Make sure you have a local Ethereum network or testnet set up. You can use tools like Hardhat  for local development and testing.
Run the tests using npx hardhat test command.
The tests cover various scenarios and ensure the correct functionality of the contracts. They verify the grant and retrieval of items in the Game contract, addition and redemption of items in the GamingStore contract, and token transfers and approvals in the DegenToken contract.

The test results will be displayed in the console, indicating whether the tests have passed or failed. Any failures or errors will be highlighted for further investigation.

## Examples
Here are some examples of how you can interact with the contracts:

Granting an item to a player in the game:

solidity
```
game.grantItem(playerAddress, itemId);
```
Redeeming an item from the gaming store using DegenTokens:

solidity
Copy code
```
gamingStore.redeem(playerAddress, itemId);
```
Transferring DegenTokens from one account to another:

solidity
Copy code
```
degenToken.transfer(recipientAddress, amount);
```
Make sure to adjust the contract addresses and function parameters according to your specific use case.

## Authors
Sachin kumar

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
