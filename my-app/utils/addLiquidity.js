import { Contract, utils } from "ethers";
import {
    EXCHANGE_CONTRACT_ABI,
    EXCHANGE_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
    TOKEN_CONTRACT_ADDRESS,
} from "../constants";

export const addLiquidity = async (
    signer,
    addCDAmoutWei,
    addETHAmountWei
) => {
    try {
        const tokenContract = new Contract(
            TOKEN_CONTRACT_ADDRESS,
            TOKEN_CONTRACT_ABI,
            signer
        );

        const exchangeContract = new Contract(
            EXCHANGE_CONTRACT_ADDRESS,
            EXCHANGE_CONTRACT_ABI,
            signer
        );

        let tx = await tokenContract.approve(EXCHANGE_CONTRACT_ADDRESS, addCDAmoutWei.toString());
        await tx.wait();
        tx = await exchangeContract.addLiquidity(addCDAmoutWei, { value: addETHAmountWei, });

        await tx.wait();
        console.log("Succesfully Added Liquidity to the Pool");
    } catch (error) {
        console.error(error);

    }
};


export const calculateCD = async (
    _addEther = "0",
    etherBalanceContract,
    cdTokenReserve
) => {
    const _addEtherAmountWei = utils.parseEther(_addEther);
    const cryptoDevTokenAmount = _addEtherAmountWei
        .mul(cdTokenReserve)
        .div(etherBalanceContract);
    return cryptoDevTokenAmount;

}