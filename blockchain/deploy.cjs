// deploy.cjs
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // Compile the contract (just in case)
  await hre.run("compile");

  console.log("Deploying UserDetails contract...");

  const UserDetails = await hre.ethers.getContractFactory("UserDetails");
  const contract = await UserDetails.deploy(); // Ethers v6 deploy returns deployed contract

  console.log("✅ Contract deployed to:", contract.target || contract.address);

  // Save ABI and address for frontend
  const artifact = await hre.artifacts.readArtifact("UserDetails");

  const contractsDir = path.join(
    __dirname,
    "..",
    "smart-tourist-web",
    "src",
    "contracts"
  );
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  const data = {
    address: contract.target || contract.address,
    abi: artifact.abi,
  };

  fs.writeFileSync(
    path.join(contractsDir, "UserDetails.json"),
    JSON.stringify(data, null, 2)
  );

  console.log(
    "✅ ABI & address saved to smart-tourist-web/src/contracts/UserDetails.json"
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
