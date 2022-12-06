import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table as TableMui,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { loadingAtom, groupsAtom } from "../atoms";

export const Table = () => {
  const loading = useAtomValue(loadingAtom);
  const groupsList = useAtomValue(groupsAtom);

  return (
    <TableContainer component={Paper}>
      <TableMui sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Dirigente</TableCell>
            <TableCell>Ajudante</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && "carregando"}
          {groupsList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.overseer}</TableCell>
              <TableCell>{row.assistant}</TableCell>
              <TableCell><button>remove</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableMui>
    </TableContainer>
  );
};
