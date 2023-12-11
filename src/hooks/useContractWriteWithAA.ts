import { useContext } from "react";
import { SmartContract } from "@thirdweb-dev/react";
import { BiconomyContext } from "../context/BiconomyContext";
import { ethers } from "ethers";
import { useSigner } from "@thirdweb-dev/react";

export const useContractWriteWithAA = (
  contract: SmartContract<any> | undefined,
  abi: any,
  functionName: string,
  args: any[]
) => {
  const signer = useSigner();
  const { smartAccount } = useContext(BiconomyContext);
  if (!contract || !signer?.provider || !smartAccount) {
    const mutator = () => {
      console.log("Contract not found!");
    };
    return { mutator };
  } else {
    const mutator = async () => {
      const contractAddr = contract?.getAddress();
      const ethersContract = new ethers.Contract(
        contractAddr,
        abi,
        signer.provider
      );
      console.log(args);
      const unsignedTx = await ethersContract.populateTransaction[functionName](
        ...args
      );
      const tx = {
        to: contract.getAddress(),
        data: unsignedTx.data,
      };
      let userOp = await smartAccount.buildUserOp([tx]);
      const userOpResponse = await smartAccount.sendUserOp(userOp);
      const { receipt } = await userOpResponse.wait(1);
      console.log("txHash", receipt.transactionHash);
    };
    return { mutator };
  }
};
