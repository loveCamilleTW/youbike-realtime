import { z } from "zod";

export const youbikeStationSchema = z.object({
  ar: z.string(),
  aren: z.string(),
  infoDate: z.string(),
  infoTime: z.string(),
  lat: z.number(),
  lng: z.number(),
  sno: z.string(),

  /** 區 */
  sarea: z.string(),

  /** 站名 */
  sna: z.string(),

  /** 場站總停車格 */
  tot: z.number(),

  /** 場站目前車輛數量 */
  sbi: z.number(),

  /** 空位數量 */
  bemp: z.number(),

  /** 全站禁用狀態(0:禁用、1:啟用) */
  act: z.string(),
});

export type YoubikeStation = z.infer<typeof youbikeStationSchema>;
