"use client";

import { useState, useEffect } from "react";
import { BiconomyContext } from "../context/BiconomyContext";
import {
  BiconomySmartAccountV2,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
import {
  ECDSAOwnershipValidationModule,
  DEFAULT_ECDSA_OWNERSHIP_MODULE,
} from "@biconomy/modules";
import { bundler, paymaster } from "../context/BiconomyContext";
import { ChainId } from "@biconomy/core-types";
import { useSigner } from "@thirdweb-dev/react";

const BiconomyProvider = ({ children }: { children: React.ReactNode }) => {
  const [smartAccount, setSmartAccount] =
    useState<BiconomySmartAccountV2 | null>(null);
  const signer = useSigner();

  useEffect(() => {
    const connect = async () => {
      try {
        if (signer) {
          const mod = await ECDSAOwnershipValidationModule.create({
            signer: signer,
            moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
          });
          let biconomySmartAccount = await BiconomySmartAccountV2.create({
            chainId: ChainId.GOERLI,
            bundler: bundler,
            paymaster: paymaster,
            entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
            defaultValidationModule: mod,
            activeValidationModule: mod,
          });
          setSmartAccount(biconomySmartAccount);
        }
      } catch (e) {
        console.log("BiconomyProviderError: ", e);
      }
    };
    connect();
  }, [signer]);

  return (
    <BiconomyContext.Provider
      value={{
        bundler,
        paymaster,
        smartAccount,
      }}
    >
      {children}
    </BiconomyContext.Provider>
  );
};

export default BiconomyProvider;
