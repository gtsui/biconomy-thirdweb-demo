"use client ";

import { useContext } from "react";
import { Web3Button } from "@thirdweb-dev/react";
import { BiconomyContext } from "../context/BiconomyContext";
import { useWriteApprove } from "../hooks/useWriteApprove";
import WalletButton from "@/src/components/WalletButton";

const Body = () => {
  const contractAddr = "0x4D1A5AE1b77a6CdA9D7b0f2e1a3c10890C7BB141";
  const spender = "0xAAAA8C5867f5c44B6025688F481B34514e09fd8d";
  const { smartAccount } = useContext(BiconomyContext);
  const { mutator } = useWriteApprove(contractAddr, spender, 42069);

  return (
    <div className="flex flex-col p-4 gap-4">
      <WalletButton />
      <p>Smart Account: {smartAccount?.accountAddress}</p>
      <Web3Button
        className="hover:bg-green-400 hover:text-white"
        contractAddress={contractAddr}
        action={mutator}
      >
        Execute Tx
      </Web3Button>
    </div>
  );
};

export default Body;
