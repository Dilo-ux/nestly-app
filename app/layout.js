import "./globals.css";

export const metadata = {
  title: "Nestly — The trusted rental operating system",
  description: "Find, verify, and manage rentals in Nigeria — all in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
