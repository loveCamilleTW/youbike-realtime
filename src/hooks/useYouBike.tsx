import { useQuery } from "react-query";
import axios from "axios";

const BASE_URL =
  "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";

export function useYouBike() {
  const queryFn = () => axios.get(BASE_URL);

  return useQuery(["youbike"], queryFn, {
    select: (res) => res.data,
  });
}
