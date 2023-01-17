import type { NextPage } from "next";
import Head from "next/head";
import WalletConnect from "../components/WalletConnect";
import { useStoreActions, useStoreState } from "../utils/store";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getAssets } from "../utils/cardano";
import NftGrid from "../components/NftGrid";
import initLucid from "../utils/lucid";

const Home: NextPage = () => {
  const walletStore = useStoreState((state: any) => state.wallet);
  const [nftList, setNftList] = useState([]);

  useEffect(() => {
    //const lucid = initLucid(walletStore.name)
    if (walletStore.address != "") {
      getAssets(walletStore.address).then((res: any) => {
        setNftList(res.addressInfo.nfts);
      });
    }
  }, [walletStore.address]);

  return (
    <div className="px-10">
      <Head>
        <title>DApp360 DCA</title>
        <meta name="description" content="Dollar Cost Averaging contracts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            Cardano
          </Link>
        </div>
        <div className="flex-none">
          <WalletConnect />
        </div>
      </div>
      <div>Address: {walletStore.address}</div>
      <div className="mx-40 my-10">
        <Link href="/helios">
          <button className="btn btn-primary m-5">
            Smart Contract example
          </button>
        </Link>
        <div>Your NFTs:</div>
        <NftGrid nfts={nftList} />
      </div>

      {/* Portfolio page:
      - account details
      - submit harvest
      - submit close */}
      <div className="mx-40 my-10">
        <Link href="/portfolio">
          <button className="btn btn-primary m-5">Portfolio</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
