
const main = async() =>{

    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("mordor");
    await domainContract.deployed();

    console.log("contract deploy to: ", domainContract.address);

    console.log("contract deployed by", owner.address);

    var txn = await domainContract.registerDomain("orcs", {value: hre.ethers.utils.parseEther('1234')});
    await txn.wait();
    
   const balance = await hre.ethers.provider.getBalance(domainContract.address);

   console.log("contract balance: ", hre.ethers.utils.formatEther(balance));

   try {
       txn = await domainContract.connect(randomPerson).withdraw();
       await txn.wait();
   } catch (error) {
       console.log("couldnt rob contract");
   }

   let ownerBalance = await hre.ethers.provider.getBalance(owner.address);

   console.log("balance of owner before withdrawn", hre.ethers.utils.formatEther(ownerBalance));

   txn = await domainContract.connect(owner).withdraw();

   await txn.wait();

   const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
   ownerBalance = await hre.ethers.provider.getBalance(owner.address);


   console.log("contract balance after withdrawal: ", hre.ethers.utils.formatEther(contractBalance));
   console.log("owner balance after withdrawal: ", hre.ethers.utils.formatEther(ownerBalance));


}

const runMain = async ()=>{
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();