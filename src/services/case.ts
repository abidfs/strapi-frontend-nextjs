import config from "@/config/config";
import { Metadata } from "./restaurant";

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
      { next: { tags: ["case-list"] } }
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
    console.log(err);
  }
  return [];
};

export const getCaseDetails = async (
  id: string
): Promise<CaseDetails | null> => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      next: { tags: [`case-details-${id}`] },
    });
    const { data } = await response.json();
    console.log(data);
    return { id: data.id, ...data.attributes };
  } catch (err) {
    console.log(err);
  }
  return null;
};
