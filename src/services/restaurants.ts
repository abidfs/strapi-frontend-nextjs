import config from "@/config/config";

const baseUrl = `${config.strapiHost}/api/restaurants`;

export type Restaurant = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Metadata = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export const getAllRestaurants = async (): Promise<
  | {
      restaurants: Restaurant[];
      metadata: Metadata;
    }
  | undefined
> => {
  try {
    const response = await fetch(baseUrl);
    const { data, meta: metadata } = await response.json();
    const restaurants = data.map(
      (item: {
        id: string;
        attributes: { Name: string; Description: string };
      }) => ({
        id: item.id,
        name: item.attributes.Name,
        description: item.attributes.Description,
      })
    );
    return { restaurants, metadata };
  } catch (err) {
    console.log(err);
  }
};
