import { useMemo } from 'react';

// material-ui
import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableFooter, TableRow } from '@mui/material';

// third-party
import { useTable, useFilters, useGlobalFilter, Column, Row, HeaderGroup, Cell } from 'react-table';

// project import
import makeData from 'data/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, EmptyTable } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

import {
  GlobalFilter,
  DefaultColumnFilter,
  SelectColumnFilter,
  SliderColumnFilter,
  NumberRangeColumnFilter,
  renderFilterTypes,
  filterGreaterThan
} from 'utils/react-table';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: { columns: Column[]; data: [] }) {
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);
  const initialState = useMemo(() => ({ filters: [{ id: 'status', value: '' }] }), []);

  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, state, preGlobalFilteredRows, setGlobalFilter } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        initialState,
        filterTypes
      },
      useGlobalFilter,
      useFilters
    );

  const sortingRow = rows.slice(0, 10);

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ padding: 2 }}>
        <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
        <CSVExport data={rows.map((d: Row) => d.original)} filename={'empty-table.csv'} />
      </Stack>

      <Table {...getTableProps()}>
        <TableHead sx={{ borderTopWidth: 2 }}>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: HeaderGroup) => (
                <TableCell {...column.getHeaderProps([{ className: column.className }])}>{column.render('Header')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {headerGroups.map((group: HeaderGroup<{}>) => (
            <TableRow {...group.getHeaderGroupProps()}>
              {group.headers.map((column: HeaderGroup) => (
                <TableCell {...column.getHeaderProps([{ className: column.className }])}>
                  {column.canFilter ? column.render('Filter') : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {sortingRow.length > 0 ? (
            sortingRow.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell: Cell) => (
                    <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <EmptyTable msg="No Data" colSpan={7} />
          )}
        </TableBody>

        {/* footer table */}
        <TableFooter sx={{ borderBottomWidth: 2 }}>
          {footerGroups.map((group) => (
            <TableRow {...group.getFooterGroupProps()}>
              {group.headers.map((column: HeaderGroup) => (
                <TableCell {...column.getFooterProps([{ className: column.className }])}>{column.render('Footer')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
    </>
  );
}

// ==============================|| REACT TABLE - EMPTY ||============================== //

const EmptyTableDemo = () => {
  const data = useMemo(() => makeData(0), []);

  const columns = useMemo(
    () =>
      [
        {
          Header: 'First Name',
          Footer: 'First Name',
          accessor: 'firstName'
        },
        {
          Header: 'Last Name',
          Footer: 'Last Name',
          accessor: 'lastName',
          filter: 'fuzzyText'
        },
        {
          Header: 'Email',
          Footer: 'Email',
          accessor: 'email'
        },
        {
          Header: 'Age',
          Footer: 'Age',
          accessor: 'age',
          className: 'cell-right',
          Filter: SliderColumnFilter,
          filter: 'equals'
        },
        {
          Header: 'Visits',
          Footer: 'Visits',
          accessor: 'visits',
          className: 'cell-right',
          Filter: NumberRangeColumnFilter,
          filter: 'between'
        },
        {
          Header: 'Status',
          Footer: 'Status',
          accessor: 'status',
          Filter: SelectColumnFilter,
          filter: 'includes',
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
          Footer: 'Profile Progress',
          accessor: 'progress',
          Filter: SliderColumnFilter,
          filter: filterGreaterThan,
          Cell: ({ value }: { value: number }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
        }
      ] as Column[],
    []
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
};

export default EmptyTableDemo;
