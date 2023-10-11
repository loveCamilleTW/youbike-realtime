import { useState, SyntheticEvent } from "react";

import { useYoubikeStations } from "@hooks/useYoubikeStations";
import { YoubikeList } from "@components";
import { AREAS, TAIWAN_CITIES, City } from "./Area";

import {
  Box,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Autocomplete,
} from "@mui/material";

const MAX_AREA_LENGTH = 50;

export function Main() {
  const { data: youbikeStations } = useYoubikeStations();
  const [city, setCity] = useState<City>(TAIWAN_CITIES[0]);
  const [areaCheckBoxes, setAreaCheckBoxes] = useState(
    new Array(MAX_AREA_LENGTH).fill(true),
  );
  const areas = AREAS[city.key];

  const isAllChecked = areaCheckBoxes.reduce((acc, cur) => acc && cur);

  if (!youbikeStations) return null;

  const stationNames = [
    ...new Set(
      youbikeStations.map((youbikeStation) => youbikeStation.sna.split("_")[1]),
    ),
  ];

  const chechedAreas: string[] = [];
  areas.forEach((area, index) => {
    if (areaCheckBoxes[index]) {
      chechedAreas.push(area);
    }
  });

  const filteredYoubikeStations = youbikeStations.filter((youbikeStation) => {
    return chechedAreas.includes(youbikeStation.sarea);
  });

  const handleChange = (_event: SyntheticEvent, newValue: City | null) => {
    if (!newValue) return;
    setCity(newValue);
  };

  const handleCheckboxChange = (index: number) => {
    return () => {
      setAreaCheckBoxes((prevState) => {
        prevState[index] = !prevState[index];
        return [...prevState];
      });
    };
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "2rem",
        marginTop: "4.5rem",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: "700",
          fontSize: "1.125rem",
          color: "secondary.main",
        }}
      >
        站點資訊
      </Typography>

      <Autocomplete
        disablePortal
        clearOnEscape
        id="city-autocomplete"
        options={TAIWAN_CITIES}
        sx={{ width: "100%", marginTop: "0.5rem" }}
        onChange={handleChange}
        value={city}
        renderInput={(params: object) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="選擇縣市"
            size="small"
            color="info"
            hiddenLabel
            sx={{
              backgroundColor: "info.main",
              "& fieldset": { border: "none" },
            }}
          />
        )}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={stationNames}
        sx={{ width: "100%", marginTop: "0.5rem" }}
        renderInput={(params: object) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="搜尋站點"
            size="small"
            color="info"
            hiddenLabel
            sx={{
              backgroundColor: "info.main",
              "& fieldset": { border: "none" },
            }}
          />
        )}
      />

      <Grid container>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                checked={isAllChecked}
                onChange={() => {
                  if (isAllChecked) {
                    setAreaCheckBoxes(new Array(MAX_AREA_LENGTH).fill(false));
                  } else {
                    setAreaCheckBoxes(new Array(MAX_AREA_LENGTH).fill(true));
                  }
                }}
              />
            }
            label={"全部勾選"}
            sx={{ "& .MuiFormControlLabel-label": { fontSize: "1rem" } }}
          />
        </Grid>

        {areas.map((area, index) => (
          <Grid item sm={3} xs={4} key={area}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  checked={areaCheckBoxes[index]}
                  onChange={handleCheckboxChange(index)}
                />
              }
              label={area}
              sx={{ "& .MuiFormControlLabel-label": { fontSize: "1rem" } }}
            />
          </Grid>
        ))}
      </Grid>

      <YoubikeList data={filteredYoubikeStations} />
    </Box>
  );
}
