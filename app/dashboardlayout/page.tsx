"use client";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import DashboardContent from "../../components/content/DashboardContent";
import UsersContent from "../../components/content/UsersContent";


export default function DashboardLayout() {
    const [activeTab, setActiveTab] = useState("dashboard");

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return <DashboardContent />;
            case "users":
                return <UsersContent />;
            default:
                return <DashboardContent />;
        }
    };

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
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

