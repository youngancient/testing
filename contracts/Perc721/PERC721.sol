// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IPERC721.sol";
import "./IPERC721Metadata.sol";
import "@openzeppelin/contracts/utils/Context.sol";

/**
 * @dev Implementation of the {IPERC721} interface.
 */
 contract PERC721 is Context, IPERC721, IPERC721Metadata {
    // Mapping from token ID to owner address
    mapping(uint256 => address) internal _owners;

    // Mapping owner address to token count
    mapping(address => uint256) internal _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // Token metadata
    mapping(uint256 => string) private _tokenURIs;

    string private _name;
    string private _symbol;

    /**
     * @dev Initializes the contract with a `name` and a `symbol` for the token collection.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev See {IPERC721Metadata-name}.
     */
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IPERC721Metadata-symbol}.
     */
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IPERC721Metadata-tokenURI}.
     */
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(_exists(tokenId), "PERC721: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    /**
     * @dev See {IPERC721-balanceOf}.
     */
    function balanceOf(
        address owner
    ) public view virtual override returns (uint256) {
        require(msg.sender == owner, "PERC721: msg.sender != owner");
        return _balances[owner];
    }

    /**
     * @dev See {IPERC721-ownerOf}.
     */
    function ownerOf(
        uint256 tokenId
    ) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        require(
            owner != address(0),
            "PERC721: owner query for nonexistent token"
        );
        require(msg.sender == owner, "PERC721: msg.sender != owner");
        return owner;
    }

    /**
     * @dev Mints a new token with `tokenId` to the caller's address.
     */
    function mint(uint256 tokenId, string memory uri) public virtual {
        require(!_exists(tokenId), "PERC721: Token already minted");
        _balances[_msgSender()] += 1;
        _owners[tokenId] = _msgSender();
        _tokenURIs[tokenId] = uri;
    }

    /**
     * @dev Transfers `tokenId` from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` must be owned by `from`.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "PERC721: transfer caller is not owner nor approved"
        );
        _transfer(from, to, tokenId);
    }

    /**
     * @dev Internal function to transfer ownership of a given token ID to another address.
     * As per ERC721 standards, it does not handle safe transfers.
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        require(
            ownerOf(tokenId) == from,
            "PERC721: transfer of token that is not own"
        );
        require(to != address(0), "PERC721: transfer to the zero address");

        _beforeTokenTransfer(from, to, tokenId);

        // Clear approvals from the previous owner
        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        _afterTokenTransfer(from, to, tokenId);
    }

    /**
     * @dev Internal function to approve `to` to operate on `tokenId`.
     */
    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     */
    function _isApprovedOrOwner(
        address spender,
        uint256 tokenId
    ) internal view virtual returns (bool) {
        require(
            _exists(tokenId),
            "PERC721: operator query for nonexistent token"
        );
        address owner = ownerOf(tokenId);
        return (spender == owner);
    }

    /**
     * @dev Internal function to check if a token exists.
     */
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}

    /**
     * @dev Hook that is called after any token transfer.
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {}

    function safeTransferFrom(
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