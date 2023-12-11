"use client";

import { ConnectWallet, useWallet, useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

const WalletButton = () => {
  const [email, setEmail] = useState<string | undefined>();
  const address = useAddress();
  const wallet = useWallet("embeddedWallet");

  useEffect(() => {
    const fetchEmail = async () => {
      const emailAddr = await wallet?.getEmail();
      setEmail(emailAddr);
    };
    fetchEmail();
  }, [wallet]);

  return (
    <ConnectWallet
      theme={"dark"}
      modalSize={"compact"}
      className="h-10 px-2"
      detailsBtn={() => {
        return (
          <button className="rounded-lg h-12 px-2 bg-blue-400">
            {email ? email : address}
          </button>
        );
      }}
    />
  );
};

export default WalletButton;
