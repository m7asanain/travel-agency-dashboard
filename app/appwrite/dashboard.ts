import { appwriteConfig, database } from "./client";

interface Document {
  [key: string]: any;
}

type FilterByDate = (
  items: Document[],
  key: string,
  start: string,
  end?: string
) => number;

export const getUsersAndTripsStats = async (): Promise<DashboardStats> => {
  const date = new Date();
  const startCurrent = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).toISOString();
  const startPrev = new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    1
  ).toISOString();
  const endPrev = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).toISOString();

  const [users, trips] = await Promise.all([
    database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    ),
    database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.tripCollectionId
    ),
  ]);

  // counts how many documents in an array fall within a given date range
  const filterByDate: FilterByDate = (items, key, start, end) =>
    items.filter((item) => item[key] >= start && (!end || item[key] <= end))
      .length;

  const filterUsersByRole = (role: string) => {
    return users.documents.filter((u: Document) => u.status === role);
  };

  return {
    // return...
  };
};
