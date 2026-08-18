import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Standards International School',
  description: 'Administrative dashboard for Standards International School management.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {children}
    </div>
  );
}
