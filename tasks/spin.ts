import { EventLog } from "ethers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("task:spin").setAction(async function (taskArguments: TaskArguments, hre) {
  const { ethers, deployments } = hre;
  const signers = await ethers.getSigners();
  const incoSlotsDeployment = await deployments.get("IncoSlots");

  const incoSlots = await ethers.getContractAt("IncoSlots", incoSlotsDeployment.address);

  const res = await incoSlots.connect(signers[0]).spin();
  console.log("Spinning...");
  const receipt = await res.wait();
  console.log("Included in block");
  const event = receipt?.logs.find((l) => (l as EventLog).eventName === "RandomNumber");
  console.log(event);
});
