// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IPERC721.sol";
import "./IPERC721Metadata.sol";

/**
 * @dev Sample implementation of the {IPERC721} contract with metadata.
 */
  contract PERC721Sample is IPERC721, IPERC721Metadata {
    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // Token metadata URI
    mapping(uint256 => string) private _tokenURIs;

    constructor() {
        _name = "Sample PERC721";
        _symbol = "pNFT";
    }

    /**
     * @dev See {IPERC721Metadata-name}.
     */
    function name() external view override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IPERC721Metadata-symbol}.
     */
    function symbol() external view override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IPERC721Metadata-tokenURI}.
     */
    function tokenURI(
        uint256 tokenId
    ) external view override returns (string memory) {
        require(
            _exists(tokenId),
            "PERC721Sample: URI query for nonexistent token"
        );
        return _tokenURIs[tokenId];
    }

    /**
     * @dev Mints a new token with `tokenId` to the caller's address.
     */
    function mint(uint256 tokenId, string memory uri) public {
        require(!_exists(tokenId), "PERC721Sample: Token already minted");
        _balances[msg.sender] += 1;
        _owners[tokenId] = msg.sender;
        _tokenURIs[tokenId] = uri;
    }

    /**
     * @dev Regular `balanceOf` function marked as internal, so we override it to extend visibility
     */
    function balanceOf(address owner) public view override returns (uint256) {
        require(msg.sender == owner, "PERC721Sample: msg.sender != owner");
        return _balances[owner];
    }

    /**
     * @dev Returns the owner of the `tokenId` token.
     * Requirements:
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) public view override returns (address) {
        address owner = _owners[tokenId];
        require(
            owner != address(0),
            "PERC721Sample: owner query for nonexistent token"
        );
        require(msg.sender == owner, "PERC721Sample: msg.sender != owner");
        return owner;
    }

    /**
     * @dev Internal function to check if a token exists.
     */
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _owners[tokenId] != address(0);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external override {}

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external override {}

    function approve(address to, uint256 tokenId) external override {}

    function getApproved(
        uint256 tokenId
    ) external view override returns (address) {}

    function setApprovalForAll(
        address operator,
        bool _approved
    ) external override {}

    function isApprovedForAll(
        address owner,
        address operator
    ) external view override returns (bool) {}

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external override {}
}