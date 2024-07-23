import SideNav from '@/components/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 h-full w-full">{children}</div>;
}
