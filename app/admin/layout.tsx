import { DarkModeProvider } from "@/app/meditrack/DarkModeContext";
import AdminLayout from "@/admin_view/admin_layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DarkModeProvider>
      <AdminLayout>{children}</AdminLayout>
    </DarkModeProvider>
  );
}
