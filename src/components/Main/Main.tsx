import { useState, SyntheticEvent, ReactNode } from "react";

import { useYoubikeStations } from "@hooks/useYoubikeStations";
import { useWindowDimensions } from "@hooks/useWindowDimensions";
import { YoubikeList } from "@components";
import BICYCLE_SVG from "@assets/bicycle.svg";
import { AREAS, TAIWAN_CITIES, City } from "./Area";
import { MOBILE_THRESHOLD } from "../../constants/responsive";

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
  const [station, setStation] = useState<string | null>(null);
  const [areaCheckBoxStates, setAreaCheckBoxStates] = useState(
    new Array(MAX_AREA_LENGTH).fill(true),
  );
  const areas = AREAS[city.key];

  const isAllChecked = areaCheckBoxStates.reduce((acc, cur) => acc && cur);

  if (!youbikeStations) return null;

  const stationNames = [
    ...new Set(
      youbikeStations.map((youbikeStation) => youbikeStation.sna.split("_")[1]),
    ),
  ];

  const chechedAreas: string[] = [];
  areas.forEach((area, index) => {
    if (areaCheckBoxStates[index]) {
      chechedAreas.push(area);
    }
  });

  const fiteredByStation =
    station === null || station === ""
      ? youbikeStations
      : youbikeStations.filter((youbikeStation) => {
          return youbikeStation.sna.split("_")[1] == station;
        });

  const filteredYoubikeStations = fiteredByStation.filter((youbikeStation) => {
    return chechedAreas.includes(youbikeStation.sarea);
  });

  const handleCityAutoCompleteChange = (
    _event: SyntheticEvent,
    newValue: City | null,
  ) => {
    if (!newValue) return;
    setCity(newValue);
  };

  const handleStationAutoCompleteChange = (
    _event: SyntheticEvent,
    newValue: string | null,
  ) => {
    setStation(newValue);
  };

  const handleCheckboxChange = (index: number) => {
    return () => {
      setAreaCheckBoxStates((prevState) => {
        prevState[index] = !prevState[index];
        return [...prevState];
      });
    };
  };

  const subTitle = (
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
  );

  const cityAutocomplete = (
    <Autocomplete
      disablePortal
      clearOnEscape
      id="city-autocomplete"
      options={TAIWAN_CITIES}
      sx={{ width: "100%", marginTop: "0.5rem" }}
      onChange={handleCityAutoCompleteChange}
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
  );

  const stationAutocomplete = (
    <Autocomplete
      disablePortal
      clearOnEscape
      id="combo-box-demo"
      options={stationNames}
      sx={{ width: "100%", marginTop: "0.5rem" }}
      onChange={handleStationAutoCompleteChange}
      value={station}
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
  );

  const areaCheckBoxes = (
    <Grid container>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              checked={isAllChecked}
              onChange={() => {
                if (isAllChecked) {
                  setAreaCheckBoxStates(new Array(MAX_AREA_LENGTH).fill(false));
                } else {
                  setAreaCheckBoxStates(new Array(MAX_AREA_LENGTH).fill(true));
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
                checked={areaCheckBoxStates[index]}
                onChange={handleCheckboxChange(index)}
              />
            }
            label={area}
            sx={{ "& .MuiFormControlLabel-label": { fontSize: "1rem" } }}
          />
        </Grid>
      ))}
    </Grid>
  );

  const youbikeList = <YoubikeList data={filteredYoubikeStations} />;

  return (
    <MainLayout
      subTitle={subTitle}
      cityAutocomplete={cityAutocomplete}
      stationAutocomplete={stationAutocomplete}
      areaCheckBoxes={areaCheckBoxes}
      youbikeList={youbikeList}
    />
  );
}

interface MainLayoutProps {
  subTitle: ReactNode;
  cityAutocomplete: ReactNode;
  stationAutocomplete: ReactNode;
  areaCheckBoxes: ReactNode;
  youbikeList: ReactNode;
}

function MainLayout(props: MainLayoutProps) {
  const { width } = useWindowDimensions();

  const {
    subTitle,
    cityAutocomplete,
    stationAutocomplete,
    areaCheckBoxes,
    youbikeList,
  } = props;

  if (width < MOBILE_THRESHOLD) {
    return (
      <Box
        sx={{
          width: "100%",
          padding: "2rem",
          marginTop: "4.5rem",
        }}
      >
        {subTitle}
        {cityAutocomplete}
        {stationAutocomplete}
        {areaCheckBoxes}
        {youbikeList}
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "6.5rem",
          margin: "7.75rem",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "12.125rem",
            marginBottom: "1.53125rem", // 24.5 / 16
          }}
        >
          <Box sx={{ flex: "1 1 0" }}>
            {subTitle}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              {cityAutocomplete}
              {stationAutocomplete}
            </Box>
            {areaCheckBoxes}
          </Box>
          <Box
            sx={{
              flex: "1 1 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ width: "501.98px", height: "171.5px" }}>
              <img src={BICYCLE_SVG} />
            </Box>
          </Box>
        </Box>

        {youbikeList}
      </Box>
    );
  }
}
