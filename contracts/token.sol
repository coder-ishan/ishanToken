// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.5.0 < 0.9.0;
import "hardhat/console.sol";
//for debugging^^^^^//
//contract//
contract Token{
    string public name ="HardHat token";
    string public symbol ="HHT";
    uint public totalSupply= 11111;
    address public owner;
    mapping(address=>uint)balances;
    
    constructor(){
        balances[msg.sender]=totalSupply;
        owner= msg.sender;
    }
    function transfer(address to, uint amount) external{ 
        require(balances[msg.sender]>=amount,"Not enough Tokens");
        balances[msg.sender]-=amount;
        balances[to]+=amount;
    }
    function balanceOf(address account) external view returns (uint){
        return balances[account];
    }
}


