import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AuriMax - Todo en Auriculares",
  description: "Los mejores auriculares del mercado",
  keywords: ["Auriculares" , "Aurimax", "Venta de Auriculares", "Sony", "JBL"]
};


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
{/*         <AuthProvider>
 */}        <CartProvider >
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        </CartProvider>
{/*         </AuthProvider>
 */}        </body>
    </html>
  );
}
