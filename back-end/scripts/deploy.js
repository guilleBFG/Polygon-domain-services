
const main = async() =>{


    const domainContractFactory = await hre.ethers.getContractFactory('Domains');

    const domainContract = await domainContractFactory.deploy("mordor");

    await domainContract.deployed();

    console.log("contract deploy to: ", domainContract.address);


 /*   var txn = await domainContract.registerDomain("goblin", {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    const domainOwner = await domainContract.getAddress("goblin");

    console.log("owner of domain:", domainOwner);
    
    */
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