import { getCaseDetails, listCases } from '@/services/case';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case List'
}

export async function generateStaticParams() {
  const cases = await listCases();

  return cases.map((item) => ({
    id: `${item.id}`,
    caseId: item.caseId,
  }))
}

export default async function CaseDetails({ params }: { params: { id: string, caseId: string } }) {
  const res = await getCaseDetails(params.id);
  console.log(res);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p> Case Details </p>
        <p>{res?.caseId}</p>
        <p>{res?.issue}</p>
        <p>{res?.facts}</p>
      </div>
    </main>
  )
}
