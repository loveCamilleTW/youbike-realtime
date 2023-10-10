import { useState } from "react";

import { useYoubikeStations } from "@hooks/useYoubikeStations";
import { YoubikeList } from "@components";

import {
  Box,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const TAIWAN_CITIES = [
  "臺北市",
  "新北市",
  "桃園市",
  "臺中市",
  "臺南市",
  "高雄市",
  "新竹縣",
  "苗栗縣",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義縣",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "臺東縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
  "基隆市",
  "新竹市",
  "嘉義市",
];

const TAIPEI_AREAS = [
  "松山區",
  "信義區",
  "大安區",
  "中山區",
  "中正區",
  "大同區",
  "萬華區",
  "文山區",
  "南港區",
  "內湖區",
  "士林區",
  "北投區",
];

export function Main() {
  const { data: youBikeStations } = useYoubikeStations();
  const [age, setAge] = useState("");
  if (!youBikeStations) return null;

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "2rem",
      }}
    >
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">選擇縣市</InputLabel> */}
        <Select
          labelId="city-select-label"
          id="city-select"
          value={age}
          // label="選擇縣市"
          onChange={handleChange}
        >
          {TAIWAN_CITIES.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Grid container>
        {TAIPEI_AREAS.map((area) => (
          <Grid item sm={3} xs={4} key={area}>
            <FormControlLabel control={<Checkbox />} label={area} />
          </Grid>
        ))}
      </Grid>

      <YoubikeList data={youBikeStations} />
    </Box>
  );
}
