const {expect} =require("chai");
//const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
/*
describe("Ishan's Contract", function(){
    
    it("Deployment should assign total value to the owner", async function(){
        const[owner] = await ethers.getSigners();
        console.log("getSigners object",owner);
        const Token = await ethers.getContractFactory("Token");
        const ishanToken =await Token.deploy();
        const ownerBalance = await ishanToken.balanceOf(owner.address);
        expect(await ishanToken.totalSupply()).to.equal(ownerBalance);

    });
    it("Should transfer tokens between accounts", async function(){
        const[owner,addr1,addr2] = await ethers.getSigners(); 
        const Token = await ethers.getContractFactory("Token");
        const ishanToken = await Token.deploy();
        await ishanToken.transfer(addr1.address,10);
        expect(await ishanToken.balanceOf(addr1.address)).to.equal(10);
        
        //Transfer address1 to address2;
        await ishanToken.connect(addr1).transfer(addr2.address,5);
        expect(await ishanToken.balanceOf(addr2.address)).to.equal(5);

    });

});
*/
//https://ethereum-waffle.readthedocs.io/en/latest/matchers.html

describe("Token Contract",function(){
        let Token;
        let ishanToken;
        let owner;
        let addr1;
        let addr2;
        let addrs;

        beforeEach(async function(){
                Token= await ethers.getContractFactory("Token");
                [owner,addr1,addr2,...addrs] = await ethers.getSigners();
                ishanToken = await Token.deploy();
        });//every line runs in each test case
        describe("Deployment",function(){
            it("Should set the right owner",async function(){
                expect(await ishanToken.owner()).to.equal(owner.address);
            })
            it("Deployment should assign total value to the owner", async function(){
                const ownerBalance = await ishanToken.balanceOf(owner.address);
                expect(await ishanToken.totalSupply()).to.equal(ownerBalance);
            });
        });
       
        describe("Transfer",async function(){
            it("Should transfer tokens between accounts", async function(){
           
                await ishanToken.transfer(addr1.address,10);
                expect(await ishanToken.balanceOf(addr1.address)).to.equal(10);
                //Transfer address1 to address2;
                await ishanToken.connect(addr1).transfer(addr2.address,5);
                expect(await ishanToken.balanceOf(addr2.address)).to.equal(5);
        
            });
            it("Should fail if owner doesn't have enough tokens",async function(){
                const initialOwnerBalance = await ishanToken.balanceOf(owner.address);
                await expect(ishanToken.connect(addr1).transfer(owner.address,1)).to.be.revertedWith("Not enough Tokens");
               expect(await ishanToken.balanceOf(owner.address)).to.equal(
                initialOwnerBalance
                );
            });
            it("Should update balances after Transfer",async function(){
                    const initialOwnerBalance = await ishanToken.balanceOf(owner.address);
                    await ishanToken.transfer(addr1.address,5);
                    await ishanToken.transfer(addr2.address,10);
                    
                    const finalOwnerBalance = await ishanToken.balanceOf(owner.address);
                    expect(finalOwnerBalance).to.equal((initialOwnerBalance-15));
                    const addr1Balance = await ishanToken.balanceOf(addr1.address);
                    expect(addr1Balance).to.equal(5);
                    const addr2Balance = await ishanToken.balanceOf(addr2.address);
                    expect(addr2Balance).to.equal(10);
            });
        });
      

});
