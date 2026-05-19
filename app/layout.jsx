export const metadata = {
  title: "Avdhoot AI",
  description: "An awareness companion by Nomind Club.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
