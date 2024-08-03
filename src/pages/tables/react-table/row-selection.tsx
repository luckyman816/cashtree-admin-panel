import { useMemo } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useFilters, useRowSelect, useTable, usePagination, Column, Row, HeaderGroup, Cell } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, IndeterminateCheckbox, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

import makeData from 'data/react-table';
import SyntaxHighlight from 'utils/SyntaxHighlight';
import { renderFilterTypes } from 'utils/react-table';

// types
import { ThemeDirection } from 'types/config';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: { columns: Column[]; data: [] }) {
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { selectedRowIds, pageIndex, pageSize },
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 10, selectedRowIds: { 0: true, 5: true, 7: true } }
    },
    useFilters,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns: Column[]) => [
        {
          id: 'row-selection-chk',
          accessor: 'Selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
          ),
          Cell: ({ row }: any) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        },
        ...columns
      ]);
    }
  );

  return (
    <>
      <MainCard
        title="Row Selection (Pagination)"
        content={false}
        secondary={<CSVExport data={selectedFlatRows.map((d: Row) => d.original)} filename={'row-selection-table.csv'} />}
      >
        <ScrollX>
          <TableRowSelection selected={Object.keys(selectedRowIds).length} />
          <Stack
            spacing={3}
            sx={{
              ...(theme.direction === ThemeDirection.RTL && {
                '.MuiTable-root': { width: { xs: '930px', sm: 'inherit' } },
                pre: { width: { xs: '930px', sm: 'inherit' }, overflowX: 'unset' }
              })
            }}
          >
            <Table {...getTableProps()}>
              <TableHead>
                {headerGroups.map((headerGroup) => (
                  <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                    {headerGroup.headers.map((column: HeaderGroup) => (
                      <TableCell {...column.getHeaderProps([{ className: column.className }])}>{column.render('Header')}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody {...getTableBodyProps()}>
                {page.map((row: Row, i: number) => {
                  prepareRow(row);
                  return (
                    <TableRow
                      {...row.getRowProps()}
                      onClick={() => {
                        row.toggleRowSelected();
                      }}
                      sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                    >
                      {row.cells.map((cell: Cell) => (
                        <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                      ))}
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell sx={{ p: 2, pb: 0 }} colSpan={8}>
                    <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <SyntaxHighlight>
              {JSON.stringify(
                {
                  selectedRowIndices: selectedRowIds,
                  'selectedFlatRows[].original': selectedFlatRows.map((d: Row) => d.original)
                },
                null,
                2
              )}
            </SyntaxHighlight>
          </Stack>
        </ScrollX>
      </MainCard>
    </>
  );
}

// ==============================|| REACT TABLE - ROW SELECTION ||============================== //

const RowSelectionTable = () => {
  const data = useMemo(() => makeData(2000), []);
  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Age',
        accessor: 'age',
        className: 'cell-right'
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        className: 'cell-right'
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }: { value: string }) => {
          switch (value) {
            case 'Complicated':
              return <Chip color="error" label="Complicated" size="small" variant="light" />;
            case 'Relationship':
              return <Chip color="success" label="Relationship" size="small" variant="light" />;
            case 'Single':
            default:
              return <Chip color="info" label="Single" size="small" variant="light" />;
          }
        }
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
        Cell: ({ value }: { value: number }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
      }
    ],
    []
  );

  return <ReactTable columns={columns} data={data} />;
};

export default RowSelectionTable;
