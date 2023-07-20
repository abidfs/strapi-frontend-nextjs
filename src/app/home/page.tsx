import { getAllRestaurants } from '@/services/restaurants';
import Image from 'next/image'

export default async function Home() {
  const res = await getAllRestaurants();
  console.log(res);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello home
    </main>
  )
}
