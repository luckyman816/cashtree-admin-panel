import { useCallback, useMemo } from 'react';
import { useTable, useSortBy, useBlockLayout, Column, HeaderGroup } from 'react-table';
import { FixedSizeList } from 'react-window';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// project-import
import makeData from 'data/react-table';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import MainCard from 'components/MainCard';
import { CSVExport, HeaderSort } from 'components/third-party/ReactTable';
import ScrollX from 'components/ScrollX';

// types
import { ThemeMode } from 'types/config';

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
}

function ReactTable({ columns, data, getHeaderProps }: TableProps) {
  const theme = useTheme();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data
    },
    useSortBy,
    useBlockLayout
  );

  const RenderRow = useCallback(
    ({ index, style }: any) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <TableRow
          {...row.getRowProps({
            style
          })}
        >
          {row.cells.map((cell) => {
            return (
              <TableCell
                sx={{
                  backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[100] : theme.palette.common.white
                }}
                {...cell.getCellProps()}
              >
                {cell.render('Cell')}
              </TableCell>
            );
          })}
        </TableRow>
      );
    },
    [prepareRow, rows, theme]
  );

  // Render the UI for your table
  return (
    <Stack spacing={10}>
      <MainCard
        title="Virtualized Rows"
        content={false}
        secondary={<CSVExport data={data} filename="virtualized-row-table.csv" />}
        sx={{ maxWidth: 1205 }}
      >
        <ScrollX>
          <TableWrapper>
            <Table {...getTableProps()} stickyHeader>
              <TableHead>
                {headerGroups.map((headerGroup) => (
                  <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <TableCell
                        sx={{ position: 'sticky !important' }}
                        {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}
                      >
                        <HeaderSort column={column} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>

              <TableBody {...getTableBodyProps()}>
                <FixedSizeList height={600} itemCount={rows.length} itemSize={60} width="100%">
                  {RenderRow}
                </FixedSizeList>
              </TableBody>
            </Table>
          </TableWrapper>
        </ScrollX>
      </MainCard>
    </Stack>
  );
}

function App() {
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
        Header: 'Role',
        accessor: 'role'
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
        Header: 'Progress',
        accessor: 'progress',
        Cell: ({ value }: { value: number }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
      }
    ],
    []
  );

  const data = useMemo(() => makeData(10000), []);

  return <ReactTable columns={columns} data={data} getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()} />;
}

export default App;
