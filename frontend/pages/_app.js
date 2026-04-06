import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </CartProvider>
  );
}

export default MyApp;
