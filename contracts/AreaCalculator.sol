// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract AreaOfShapes{
    uint public area;
    function areaOfRectangle(uint length, uint breadth) public{
        area = 2 *(length + breadth);
    }
    function areaOfSquare(uint length) public{
        area = length * length;
    }
    function areaOfTriangle(uint base, uint height) public{
        area = (base * height) / 2;
    }
}
