import "./globals.css";

export const metadata = {
  title: "Inventory Management",
  description: "Created By Joel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
