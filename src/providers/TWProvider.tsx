"use client";

import {
  ThirdwebProvider,
  metamaskWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";

const TWProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThirdwebProvider
      activeChain="goerli"
      clientId="2d32afbd9a5a9db3a9ed09f23114d671"
      supportedWallets={[
        metamaskWallet(),
        embeddedWallet({
          auth: {
            options: ["email", "google", "apple", "facebook"],
          },
        }),
      ]}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default TWProvider;
