import type { Metadata } from "next";
import AdminPageClient from "@/components/admin/admin-page-client";

export const metadata: Metadata = {
    title: "Demo Admin | Subsights",
    description: "Admin dashboard for monitoring demo performance and events. Local browser data only.",
};

export default function AdminPage() {
    return <AdminPageClient />;
}
