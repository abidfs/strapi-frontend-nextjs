import { getCaseDetails, listCases } from '@/services/case';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Details'
}

export async function generateStaticParams() {
  const cases = await listCases();
  return cases.map((item) => ({
    caseId: item.caseId.replace('/', '-'),
  }))
}

export default async function CaseDetails({ params }: { params: { caseId: string } }) {
  const res = await getCaseDetails(params.caseId);
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
