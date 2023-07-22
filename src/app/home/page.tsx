import { listCases } from '@/services/case';
import { Metadata } from 'next';
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Case List'
}

export default async function Home() {
  const res = await listCases();
  console.log(res);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p> Case List </p>
        {res.map((item) => (
          <Link key={item.id} href={`/home/${item.id}`}>{item.issue}</Link>
        ))}
      </div>
    </main>
  )
}
