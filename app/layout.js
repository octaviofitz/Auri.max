import { Average_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Especifica el peso de la fuente
const averageSans = Average_Sans({
  subsets: ["latin"],
  weight: "400" // Asegúrate de usar el peso disponible
});

// Importa Firebase aquí
import { app } from '../app/config/firebase';
import Banner from "./components/Banner";

// Agrega este console.log aquí
console.log('Firebase initialized:', app !== undefined);

export const metadata = {
  title: "AuriMax - Todo en Auriculares",
  description: "Los mejores auriculares del mercado",
  keywords: ["Auriculares", "Aurimax", "Venta de Auriculares", "Sony", "JBL"]
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${averageSans.className} bg-amber-50 text-black`}>
         <AuthProvider>
           <CartProvider>
             <Navbar />
             <Banner />
             <main>
               {children}
             </main>
             <Footer />
           </CartProvider>
         </AuthProvider>
      </body>
    </html>
  );
}
