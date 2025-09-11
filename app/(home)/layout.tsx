import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
      // activeTab={activeTab} setActiveTab={setActiveTab} 
      />

      {/* Right side */}
      <div className="flex-1 flex flex-col h-screen"> {/* full height */}
        {/* Topbar */}
        <Topbar />

        {/* Main content scrollable */}
        <main className="flex-1 overflow-auto p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
