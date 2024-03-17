import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import { Menu } from "lucide-react";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      {/* <div className="bg-slate-500 w-16 h-16 absolute z-50 md:flex hidden">
        <button>
          <Menu />
        </button>
      </div> */}
      <div className="hidden md:flex h-full w-[86px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[86px] h-full">{children}</main>
    </div>
  );
}
