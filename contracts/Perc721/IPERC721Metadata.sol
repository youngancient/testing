// SPDX-License-Identifier: MIT
// Privacy-Enhanced ERC721 Metadata Interface (IPERC721Metadata.sol)

pragma solidity ^0.8.17;

import "./IPERC721.sol";

/**
 * @dev Interface for the optional metadata functions from the ERC721 standard.
 */
interface IPERC721Metadata is IPERC721 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
     */
    function tokenURI(uint256 tokenId) external view returns (string memory);
}