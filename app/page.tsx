import { redirect } from 'next/navigation';

export default function Page() {
  return redirect('/home');
}

export const dynamic = 'force-dynamic';
