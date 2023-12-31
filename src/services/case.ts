import config from "@/config/config";

const baseUrl = `${config.strapiHost}/api/cases`;

export type Case = {
  id: number;
  caseId: string;
  issue: string;
};

export type CaseDetails = Case & {
  facts: string;
};

export const listCases = async (): Promise<Case[]> => {
  try {
    const response = await fetch(
      `${baseUrl}?fields[0]=caseId&fields[1]=issue`,
      { next: { tags: ["case"] } }
    );
    const { data, meta: metadata } = await response.json();
    return data.map(
      (item: {
        id: string;
        attributes: { caseId: string; issue: string };
      }) => ({
        id: item.id,
        caseId: item.attributes.caseId,
        issue: item.attributes.issue,
      })
    );
  } catch (err) {
    // console.log(err);
    console.log('problem in getting case list')
  }
  return [];
};

export const getCaseDetails = async (
  id: string
): Promise<CaseDetails | null> => {
  try {
    const response = await fetch(
      `${baseUrl}?filters[caseId][$eq]=${id.replace("-", "/")}`,
      {
        next: { tags: [`case`] },
      }
    );
    const { data } = await response.json();
    if (data && data.length > 0) {
      return { id: data[0].id, ...data[0].attributes };
    }
    return null;
  } catch (err) {
    // console.log(err);
    console.log('problem in getting case details')
  }
  return null;
};
