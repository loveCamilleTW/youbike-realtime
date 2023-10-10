import { Fragment, forwardRef } from "react";
import { YoubikeStation } from "src/types/youbikeStation";

import {
  TableVirtuoso,
  TableComponents as tableComponents,
} from "react-virtuoso";
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface YoubikeListProps {
  data: YoubikeStation[];
}

export function YoubikeList(props: YoubikeListProps) {
  const { data } = props;

  const tableComponents: tableComponents<YoubikeStation> = {
    Scroller: forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{
          borderCollapse: "separate",
          tableLayout: "fixed",
          overflowX: "auto",
          borderRadius: "8px",
        }}
      />
    ),
    TableHead: TableHead,
    TableRow: (props) => <TableRow {...props} sx={{ height: "72px" }} />,
    TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  return (
    <Box
      sx={{
        height: "calc(72px * 6)", // 72 * 6
        borderRadius: "0, 0, 8px, 8px",
        borderColor: "rgba(174, 174, 174, 1)",
        width: "100%",
        overflow: "scoll",
      }}
    >
      <TableVirtuoso
        data={data}
        components={tableComponents}
        fixedHeaderContent={FixedHeaderContent}
        itemContent={RowContent}
      />
    </Box>
  );
}

function FixedHeaderContent() {
  const COLUMNS = [
    {
      width: 150,
      label: "縣市",
      dataKey: "city",
    },
    {
      width: 150,
      label: "區域",
      dataKey: "sarea",
    },
    {
      width: 150,
      label: "站點名稱",
      dataKey: "stationName",
    },
    {
      width: 150,
      label: "可借車輛",
      dataKey: "tot",
    },
    {
      width: 150,
      label: "可還空位",
      dataKey: "bemp",
    },
  ];

  return (
    <TableRow>
      {COLUMNS.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          style={{ width: column.width }}
          sx={{
            backgroundColor: "#B5CC22",
            color: "#FFFFFF",
            height: "66px",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function RowContent(index: number, youbikeStation: YoubikeStation) {
  const stationName = youbikeStation.sna.split("_")[1];
  const background = index % 2 === 0 ? "rgba(246, 246, 246, 1)" : "#fff";

  return (
    <Fragment>
      <TableCell sx={{ width: "20rem", background }}>台北市</TableCell>
      <TableCell sx={{ width: "20rem", background }}>
        {youbikeStation.sarea}
      </TableCell>
      <TableCell sx={{ width: "20rem", background }}>{stationName}</TableCell>
      <TableCell sx={{ width: "20rem", background }}>
        {youbikeStation.tot}
      </TableCell>
      <TableCell sx={{ width: "20rem", background }}>
        {youbikeStation.bemp}
      </TableCell>
    </Fragment>
  );
}
