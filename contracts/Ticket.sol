// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "solmate/src/tokens/ERC721.sol";
import "solmate/src/auth/Owned.sol";
import "solmate/src/utils/LibString.sol";

// Author: @Luan-Web3
contract Ticket is ERC721, Owned {
    using LibString for uint256;
    
    uint256 private _nextTokenId;
    
    constructor() ERC721("EventTicket", "ETK") Owned(msg.sender) {}
    
    function issueTicket(address to) external onlyOwner {
        _nextTokenId++;
        _safeMint(to, _nextTokenId);
    }
    
    function verifyOwnership(address owner, uint256 tokenId) external view returns (bool) {
        return ownerOf(tokenId) == owner;
    }

    function tokenURI(uint256 id) public pure virtual override returns (string memory) {
        return string.concat("https://api.example.com/tickets/", LibString.toString(id));
    }
}
