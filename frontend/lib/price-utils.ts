// Price formatter - converts numbers to k/m notation
export function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return `${(price / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (price >= 1_000) {
    return `${(price / 1_000).toFixed(0)}k`;
  }
  return price.toString();
}

// Full price with TZS
export function formatPriceFull(price: number): string {
  return `TZS ${formatPrice(price)}`;
}

// Parse price from k/m notation
export function parsePrice(priceStr: string): number {
  const cleanStr = priceStr.toLowerCase().replace(/tzs\s*/i, "").trim();
  
  if (cleanStr.includes("m")) {
    const num = parseFloat(cleanStr.replace("m", ""));
    return num * 1_000_000;
  }
  if (cleanStr.includes("k")) {
    const num = parseFloat(cleanStr.replace("k", ""));
    return num * 1_000;
  }
  return parseFloat(cleanStr);
}
