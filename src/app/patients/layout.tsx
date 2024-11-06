import Navbar from "@/components/Navbar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <div className="w-full flex justify-center">
          <Navbar/>
        <div className="w-96 mt-16 p-3">
          {children}
          </div>
        </div>
      
  );
}
