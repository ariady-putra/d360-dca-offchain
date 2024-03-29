import { useStoreState } from "../utils/store";
import { useState, useEffect } from "react";
import { getAccounts } from "../utils/cardano";
import AccountGrid from "../components/AccountGrid";
import initLucid from "../utils/lucid";

const SwapDCA = () => {
  const walletStore = useStoreState((state: any) => state.wallet);
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    if (walletStore.connected) {
      initLucid(walletStore.name).then((lucid) => {
        getAccounts(lucid).then((res: any) => {
          setAccountList(res.addressInfo.accounts);
        });
      });
    }
  }, [walletStore.address]);

  return (
    <div className="flex bg-[image:url('/bgf.jpg')] bg-no-repeat bg-cover bg-center bg-fixed h-screen w-full items-center">
      <AccountGrid accounts={accountList} swap={true} />
    </div>
  );
};

export default SwapDCA;
