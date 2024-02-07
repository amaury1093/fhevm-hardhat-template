import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:deployIncoSlots").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers = await ethers.getSigners();
  const incoSlotsFactory = await ethers.getContractFactory("IncoSlots");
  const incoSlots = await incoSlotsFactory.connect(signers[0]).deploy();
  await incoSlots.waitForDeployment();
  console.log("IncoSlots deployed to: ", await incoSlots.getAddress());
});
