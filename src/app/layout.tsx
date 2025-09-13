import { AppStateProvider } from "../context/AppStateContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <AppStateProvider>{children}</AppStateProvider>
        <Footer />
      </body>
    </html>
  );
}
