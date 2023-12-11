import { useContract } from "@thirdweb-dev/react";
import ERC20 from "../abi/ERC20";
import { useContractWriteWithAA } from "./useContractWriteWithAA";

export const useWriteApprove = (
  contractAddr: string,
  spender: string,
  amount: number
) => {
  const args = [spender, amount];
  const { contract } = useContract(contractAddr, ERC20);
  const { mutator } = useContractWriteWithAA(contract, ERC20, "approve", args);
  return { mutator };
};
