import { getAddress } from "ethers/lib/utils";

export function getLogoUrl(address: string) {
  try {
    let checksumAddress = getAddress(address);
    const url = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${checksumAddress}/logo.png`;
    return url;
  } catch (e) {
    console.error("Invalid Address", e);
    return "";
  }
}

export function formatNumber(number: number | string, compact = true, fractionDigits = 0) {
  const value = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: fractionDigits,
    ...(compact ? { notation: "compact", compactDisplay: "short" } : {}),
  }).format(number as number);

  return value;
}

export function formatCurrency(number: number | string, compact = true, decimals = 2) {
  const value = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    ...(compact ? { notation: "compact", compactDisplay: "short" } : {}),
  }).format(number as number);

  return value.replace(/US/, "");
}
