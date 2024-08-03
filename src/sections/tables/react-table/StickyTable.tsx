import { useMemo } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// third-party
import { useTable, useSortBy, Column, Row, HeaderGroup, Cell } from 'react-table';
import { useSticky } from 'react-table-sticky';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, HeaderSort } from 'components/third-party/ReactTable';

// types
import { ThemeMode } from 'types/config';

// ==============================|| REACT TABLE ||============================== //

// table style
const TableWrapper = styled('div')(({ theme }) => ({
  '.header': {
    position: 'sticky',
    zIndex: 1,
    width: 'fit-content'
  },
  '& th[data-sticky-td]': {
    position: 'sticky',
    zIndex: '5 !important'
  }
}));

interface TableProps {
  columns: Column[];
  data: [];
  getHeaderProps: (column: HeaderGroup) => {};
  title?: string;
}

function ReactTable({ columns, data, getHeaderProps, title }: TableProps) {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 80,
      width: 100,
      maxWidth: 400
    }),
    []
  );
  const theme = useTheme();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useSortBy,
    useSticky
  );

  const sortingRow = rows.slice(0, 19);
  let sortedData = sortingRow.map((d: Row) => d.original);
  Object.keys(sortedData).forEach((key: string) => sortedData[Number(key)] === undefined && delete sortedData[Number(key)]);

  return (
    <MainCard
      title={title}
      content={false}
      secondary={
        <CSVExport data={sortedData} filename={title === 'Sticky Header' ? 'sticky-header-table.csv' : 'sticky-column-table.csv'} />
      }
    >
      <ScrollX sx={{ height: 500 }}>
        <TableWrapper>
          <Table {...getTableProps()} stickyHeader>
            <TableHead>
              {headerGroups.map((headerGroup: HeaderGroup<{}>) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: HeaderGroup<{}>) => {
                    return (
                      <TableCell
                        sx={{ position: 'sticky !important' }}
                        {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}
                      >
                        <HeaderSort column={column} />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {sortingRow.map((row: Row) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell: Cell) => {
                      return (
                        <TableCell
                          sx={{
                            backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : theme.palette.common.white
                          }}
                          {...cell.getCellProps([{ className: cell.column.className }])}
                        >
                          {cell.render('Cell')}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableWrapper>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - STICKY ||============================== //

const StickyTable = ({ columns, data, title }: { data: []; columns: Column[]; title?: string }) => {
  return <ReactTable columns={columns} data={data} title={title} getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()} />;
};

export default StickyTable;
