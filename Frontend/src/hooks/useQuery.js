import { useQuery } from "@tanstack/react-query";
import api from "../api/api.js";

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    queryKey: ["my-shortenurls"],
    queryFn: async () => {
      return await api.get(
        "/api/urls/myurls",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        },
      );
    },
    select: (data) => {
      const sortedDate = data.data.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
      return sortedDate;
    },
    onError,
    staleTime: 5000,
  });
};

export const useFetchTotalClicks = (token, startDate, endDate, onError) => {
  return useQuery({
    queryKey: ["url-totalclick", startDate, endDate],
    queryFn: async () => {
      return await api.get(
        `/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        },
      );
    },
    select: (data) => {
      // data.data =>
      //  {
      //     "2024-01-01": 120,
      //     "2024-01-02": 95,
      //     "2024-01-03": 110,
      //   };

      const convertToArray = Object.keys(data.data).map((key) => ({
        clickDate: key,
        count: data.data[key], // data.data[2024-01-01]
      }));
      // Object.keys(data.data) => ["2024-01-01", "2024-01-02", "2024-01-03"]

      // FINAL:
      //   [
      //     { clickDate: "2024-01-01", count: 120 },
      //     { clickDate: "2024-01-02", count: 95 },
      //     { clickDate: "2024-01-03", count: 110 },
      //   ]
      return convertToArray;
    },
    onError,
    staleTime: 5000,
  });
};
