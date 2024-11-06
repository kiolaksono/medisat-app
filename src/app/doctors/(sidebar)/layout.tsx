import { SidebarDoctor } from "@/components/SidebarDoctor";
import { SidebarProvider } from "@/components/ui/sidebar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <SidebarDoctor />
        {children}
      </SidebarProvider>
    </>

  );
}
