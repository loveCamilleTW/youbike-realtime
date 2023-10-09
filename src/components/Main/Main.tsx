import { CSSProperties } from "react";

import { useYoubikeStations } from "@hooks/useYouBikeStations";
import { YoubikeStation } from "src/types/youbikeStation";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export function Main() {
  const { data: youBikeStations } = useYoubikeStations();

  if (!youBikeStations) return null;

  return (
    <Box>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <YoubikeList data={youBikeStations} />
    </Box>
  );
}

interface YoubikeListProps {
  data: YoubikeStation[];
}

function YoubikeList(props: YoubikeListProps) {
  const { data } = props;

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const youbikeStation = data[index];
    const stationName = youbikeStation.sna.split("_")[1];
    const background = index % 2 === 0 ? "rgba(246, 246, 246, 1)" : "#fff";

    return (
      <Box
        style={style}
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "72px",
          justifyContent: "space-between",
          alignItems: "center",
          background,
        }}
      >
        <Box sx={{ flex: "1, 1, 0" }}>台北市</Box>
        <Box sx={{ flex: "1, 1, 0" }}>{youbikeStation.sarea}</Box>
        <Box sx={{ flex: "1, 1, 0" }}>{stationName}</Box>
        <Box sx={{ flex: "1, 1, 0" }}>{youbikeStation.tot}</Box>
        <Box sx={{ flex: "1, 1, 0" }}>{youbikeStation.bemp}</Box>
      </Box>
    );
  };

  const itemKey = (index: number, data: YoubikeStation[]) => {
    const item = data[index];

    return item.sna;
  };

  return (
    <Box
      sx={{
        height: "calc(72px * 6)", // 72 * 6
        borderRadius: "0, 0, 8px, 8px",
        borderColor: "rgba(174, 174, 174, 1)",
        width: "500px",
      }}
    >
      <AutoSizer>
        {({ height, width }) => {
          console.log("height = ", height);
          return (
            <FixedSizeList
              height={height}
              width={width}
              itemCount={data.length}
              itemSize={100} // Adjust the item size as needed
              itemData={data}
              itemKey={itemKey}
            >
              {Row}
            </FixedSizeList>
          );
        }}
      </AutoSizer>
    </Box>
  );
}
