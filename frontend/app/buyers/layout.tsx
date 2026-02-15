import { CartProvider } from "@/lib/cart-context";
import BuyersShell from "@/app/buyers/_components/BuyersShell";

export default function BuyersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <BuyersShell>{children}</BuyersShell>
    </CartProvider>
  );
}
