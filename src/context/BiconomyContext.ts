"use client";

import { createContext } from "react";
import { IBundler, Bundler } from "@biconomy/bundler";
import { IPaymaster, BiconomyPaymaster } from "@biconomy/paymaster";
import { BiconomySmartAccountV2 } from "@biconomy/account";
import { ChainId } from "@biconomy/core-types";
import { DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/modules";

export type Context = {
  bundler: IBundler;
  paymaster: IPaymaster;
  smartAccount: BiconomySmartAccountV2 | null;
};

export const bundler: IBundler = new Bundler({
  bundlerUrl:
    "https://bundler.biconomy.io/api/v2/5/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
  chainId: ChainId.GOERLI,
  entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});

export const paymaster: IPaymaster = new BiconomyPaymaster({
  //https://dashboard.biconomy.io/ get paymaster urls from your dashboard
  paymasterUrl:
    "https://paymaster.biconomy.io/api/v1/5/igqkK1az9.3a21eea9-34fe-4a0d-a897-4a7fd5fabd0e",
});

export const BiconomyContext = createContext<Context>({
  bundler: bundler,
  paymaster: paymaster,
  smartAccount: null,
});
