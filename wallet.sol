// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FireblocksWalletInfo {
    address owner;

    struct WalletInfo {
        uint256 totalTokens;
        string[] topUsedTokens;
        string[] topPlatforms;
    }

    mapping(address => WalletInfo) private walletInfos;

    modifier onlyOwner {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setWalletInfo(
        uint256 totalTokens, 
        string[] memory topUsedTokens, 
        string[] memory topPlatforms
    ) public onlyOwner {
        WalletInfo storage walletInfo = walletInfos[msg.sender];
        walletInfo.totalTokens = totalTokens;
        walletInfo.topUsedTokens = topUsedTokens;
        walletInfo.topPlatforms = topPlatforms;
    }

    function getWalletInfo() public view onlyOwner returns (WalletInfo memory) {
        return walletInfos[msg.sender];
    }
}
