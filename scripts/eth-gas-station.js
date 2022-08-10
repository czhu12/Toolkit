import axios from "https://cdn.skypack.dev/axios";
import * as ethers from "https://cdn.skypack.dev/ethers@5.6.9";

const GAS_FOR_ERC721 = 2448192;
const GAS_FOR_ERC20 = 645637;


import axiosCacheAdapter from "https://cdn.skypack.dev/axios-cache-adapter";
const cache = axiosCacheAdapter.setupCache({
  maxAge: 15 * 60 * 1000
})
const api = axios.create({
  adapter: cache.adapter
})
import * as alchemySdk from "https://cdn.skypack.dev/alchemy-sdk@2.0.1";

const API_KEY = "YQKCK3xUJNyUwMfgXNxFtjx3e6kpY-rC";
// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: API_KEY, // Replace with your Alchemy API Key.
  network: alchemySdk.Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new alchemySdk.Alchemy(settings);

const response = await api.get("https://api.coingecko.com/api/v3/simple/price?ids=weth&vs_currencies=usd")
const conversionRate = response.data.weth.usd

const gasPrice = await alchemy.core.getGasPrice()
const gasPriceInEther = ethers.utils.formatEther(gasPrice);
const erc721 = GAS_FOR_ERC721 * conversionRate * gasPriceInEther;
const erc20 = GAS_FOR_ERC20 * conversionRate * gasPriceInEther;
kit.text("### Cost of deploying ERC popular contracts");
kit.text(`Price for ERC721: **$${erc721.toFixed(2)} USD**`);
kit.text(`Price for ERC20: **$${erc20.toFixed(2)} USD**`);