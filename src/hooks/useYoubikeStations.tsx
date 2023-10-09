import { useQuery } from "react-query";
import axios from "axios";
import { YoubikeStation, youbikeStationSchema } from "../types/youbikeStation";

const BASE_URL =
  "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";

export function useYoubikeStations() {
  const queryFn = () =>
    axios.get(BASE_URL).then((res) => {
      youbikeStationSchema.array().parse(res.data);
      return res.data as YoubikeStation[];
    });

  return useQuery(["youbike"], queryFn);
}
