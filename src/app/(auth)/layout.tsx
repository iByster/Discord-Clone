export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-emerald-500 to-lime-600">
      {children}
    </div>
  );
}
