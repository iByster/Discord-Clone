export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700">
      {children}
    </div>
  );
}
