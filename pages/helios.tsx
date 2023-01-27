import type { NextPage } from "next";
import Head from "next/head";
import WalletConnect from "../components/WalletConnect";
import { useStoreActions, useStoreState } from "../utils/store";
import Link from "next/link";
import { useState, useEffect } from "react";
import initLucid from "../utils/lucid";
import {
  Address, 
  applyParamsToScript,
  Constr,
  Data,
  Lovelace,
  Lucid,
  MintingPolicy,
  PolicyId,
  SpendingValidator,
  TxHash,
  Unit,
  utf8ToHex,
} from "lucid-cardano";
import * as helios from "@hyperionbt/helios";

const Helios: NextPage = () => {
  const walletStore = useStoreState((state: any) => state.wallet);
  const [nftList, setNftList] = useState([]);
  const [lucid, setLucid] = useState<Lucid>();
  const [script, setScript] = useState<SpendingValidator>();
  const [scriptAddress, setScriptAddress] = useState("");
  const [refTxHash, setRefTxHash] = useState("");

  useEffect(() => {
    if (lucid) {
      initLucid(walletStore.name).then((Lucid: Lucid) => {
        setLucid(Lucid);
      });
    }  
  }, [lucid]);

  const vestingPolicy: SpendingValidator = {
    type: "PlutusV1",
    script:
      "5907945907910100003233223232323232323232323232323322323232323222232325335332232333573466e1c005",
  };

  // const mintingPolicy: MintingPolicy = {
  //   type: "PlutusV2",
  //   script: "5909785909750100003323322332232323232323232323232323232323232323232323232322335501622232325335330050043333573466e1cd55cea80124000466442466002006004646464646464646464646464646666ae68cdc39aab9d500c480008cccccccccccc88888888888848cccccccccccc00403403002c02802402001c01801401000c008cd405c060d5d0a80619a80b80c1aba1500b33501701935742a014666aa036eb94068d5d0a804999aa80dbae501a35742a01066a02e0406ae85401cccd5406c085d69aba150063232323333573466e1cd55cea801240004664424660020060046464646666ae68cdc39aab9d5002480008cc8848cc00400c008cd40add69aba15002302c357426ae8940088c98c80b8cd5ce01781701609aab9e5001137540026ae854008c8c8c8cccd5cd19b8735573aa004900011991091980080180119a815bad35742a00460586ae84d5d1280111931901719ab9c02f02e02c135573ca00226ea8004d5d09aba2500223263202a33573805605405026aae7940044dd50009aba1500533501775c6ae854010ccd5406c0748004d5d0a801999aa80dbae200135742a004603e6ae84d5d1280111931901319ab9c027026024135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d55cf280089baa00135742a004601e6ae84d5d1280111931900c19ab9c01901801610171326320173357389210350543500017135573ca00226ea800488c8cc05ccc0152401115554784f206e6f7420636f6e73756d656400335501933553018120013232123300122333500522002002001002350012200112330012253350021020100101d232325335333573466e3cd400888008d40048800808007c4ccd5cd19b873500222001350012200102001f101f35006220013500122002323500122222222222200c5001330054911377726f6e6720616d6f756e74206d696e746564005335323301b502000132350012222222222220085001101c22135002222533500413301c32333573466e3c01000408c088d401c88cccd40048c98c8074cd5ce249024c680001d200123263201d3357389201024c680001d23263201d3357389201024c680001d333573466e1c005200202202122102313500122002225335001101a13357380040322464460046eb0004c8004d5406c88cccd55cf8009280e919a80e18021aba1002300335744004024464646666ae68cdc39aab9d5002480008cc8848cc00400c008c028d5d0a80118029aba135744a004464c6402466ae7004c0480404d55cf280089baa0012323232323333573466e1cd55cea8022400046666444424666600200a0080060046464646666ae68cdc39aab9d5002480008cc8848cc00400c008c04cd5d0a80119a8068091aba135744a004464c6402e66ae7006005c0544d55cf280089baa00135742a008666aa010eb9401cd5d0a8019919191999ab9a3370ea0029002119091118010021aba135573ca00646666ae68cdc3a80124004464244460020086eb8d5d09aab9e500423333573466e1d400d20002122200323263201933573803403202e02c02a26aae7540044dd50009aba1500233500975c6ae84d5d1280111931900999ab9c014013011135744a00226ae8940044d55cf280089baa0011335500175ceb44488c88c008dd5800990009aa80c11191999aab9f0022501b233501a33221233001003002300635573aa004600a6aae794008c010d5d100180809aba100112232323333573466e1d4005200023212230020033005357426aae79400c8cccd5cd19b8750024800884880048c98c8040cd5ce00880800700689aab9d500113754002464646666ae68cdc3a800a400c46424444600800a600e6ae84d55cf280191999ab9a3370ea004900211909111180100298049aba135573ca00846666ae68cdc3a801a400446424444600200a600e6ae84d55cf280291999ab9a3370ea00890001190911118018029bae357426aae7940188c98c8040cd5ce00880800700680600589aab9d500113754002464646666ae68cdc39aab9d5002480008cc8848cc00400c008c014d5d0a8011bad357426ae8940088c98c8030cd5ce00680600509aab9e5001137540024646666ae68cdc39aab9d5001480008dd71aba135573ca004464c6401466ae7002c0280204dd5000919191919191999ab9a3370ea002900610911111100191999ab9a3370ea004900510911111100211999ab9a3370ea00690041199109111111198008048041bae35742a00a6eb4d5d09aba2500523333573466e1d40112006233221222222233002009008375c6ae85401cdd71aba135744a00e46666ae68cdc3a802a400846644244444446600c01201060186ae854024dd71aba135744a01246666ae68cdc3a8032400446424444444600e010601a6ae84d55cf280591999ab9a3370ea00e900011909111111180280418071aba135573ca018464c6402666ae7005004c04404003c03803403002c4d55cea80209aab9e5003135573ca00426aae7940044dd50009191919191999ab9a3370ea002900111999110911998008028020019bad35742a0086eb4d5d0a8019bad357426ae89400c8cccd5cd19b875002480008c8488c00800cc020d5d09aab9e500623263200c33573801a01801401226aae75400c4d5d1280089aab9e500113754002464646666ae68cdc3a800a400446424460020066eb8d5d09aab9e500323333573466e1d400920002321223002003375c6ae84d55cf280211931900499ab9c00a009007006135573aa00226ea8004488c8c8cccd5cd19b87500148010848880048cccd5cd19b875002480088c84888c00c010c018d5d09aab9e500423333573466e1d400d20002122200223263200a33573801601401000e00c26aae7540044dd50009191999ab9a3370ea0029001100691999ab9a3370ea0049000100691931900319ab9c007006004003135573a6ea8005261200149010350543100225335002100110073200135500822112225335001135003220012213335005220023004002333553007120010050040011122300200132001355006222533500110022213500222330073330080020060010033200135500522225335001100222135002225335333573466e1c005200000a0091333008007006003133300800733500b12333001008003002006003122002122001112200212212233001004003112323001001223300330020020013351223351223300248008cc011221200534cb9c671a75858286c9b9d3ef94577b4c5ea9087ad0899f6079eeeb1eee9e00480088848cc00400c00880048848cc00400c00880041",
  // };

  const alwaysSucceedScript: SpendingValidator = {
    type: "PlutusV2",
    script: "49480100002221200101",
  };

  const Datum = () => Data.empty();
  const Redeemer = () => Data.empty();


const harvestUtxos = async () => {
  if (lucid) {
    const alwaysSucceedAddress =
      lucid.utils.validatorToAddress(alwaysSucceedScript);
    const referenceScriptUtxos = (await lucid.utxosAt(alwaysSucceedAddress))
      .filter((utxo) => Boolean(utxo.scriptRef));

    if (!referenceScriptUtxos) throw new Error("Reference script not found");
    const utxos = (await lucid.utxosAt(alwaysSucceedAddress)).filter(
      (utxo) => utxo.datum === Datum() && !utxo.scriptRef
    );
    if (!utxos) throw new Error("Spending script utxo not found");

    const tx = await lucid
      .newTx()
      .attachSpendingValidator(alwaysSucceedScript)
      .collectFrom(utxos, Redeemer())
      .complete();

    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();
    return txHash;
  }
}

const closeUtxos =  async () => { 
  if (lucid) {
   const harvestValidator: SpendingValidator = {type: "PlutusV1" , script: "5907945907910100003233223232323232323232323232323322323232323222232325335332232333573466e1c005" } // change with our script
   const harvestAddress: Address = lucid.utils.validatorToAddress (harvestValidator)
   const redeemer = Data.empty()
   const utxos = await lucid.utxosAt(harvestAddress) 
   
  const ownAddr = await lucid.wallet.address (); 

   const tx = await lucid.newTx()
     .collectFrom(utxos, redeemer)  
     .attachSpendingValidator(harvestValidator)
     .addSigner(ownAddr)
     .complete()

   
   const signedTx = await tx.sign().complete()

   const txHash = await signedTx.submit()
  }}


  return (
    <div className="px-10">
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

      {/* connected Wallet Address */}
      <div>Address: {walletStore.address}</div>

      <div className="mx-40 my-10">

        {/* Harvest button */}
        <button className="btn btn-primary m-5" onClick={() => harvestUtxos()}>
          Harvest Position
        </button>
           {/* Close Position Button */}
        <button className="btn btn-secondary m-5" onClick={() => closeUtxos()}>
          Close Position
        </button>
      </div>
    </div>
  )
}

export default Helios
