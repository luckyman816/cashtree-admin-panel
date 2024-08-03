import { useMemo } from 'react';

// material-ui
import { Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useTable, useSortBy, Column, Row, HeaderGroup, Cell } from 'react-table';

// project import
import makeData from 'data/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, HeaderSort } from 'components/third-party/ReactTable';

// ==============================|| REACT TABLE ||============================== //

interface TableProps {
  columns: Column[];
  data: [];
  getHeaderProps: (column: HeaderGroup) => {};
}

function ReactTable({ columns, data, getHeaderProps }: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: 'firstName',
            desc: false
          }
        ]
      }
    },
    useSortBy
  );

  const sortingRow = rows.slice(0, 9);
  let sortedData = sortingRow.map((d: Row) => d.original);
  Object.keys(sortedData).forEach((key: string) => sortedData[Number(key)] === undefined && delete sortedData[Number(key)]);

  return (
    <MainCard title="Sorting Table" content={false} secondary={<CSVExport data={sortedData} filename={'sorting-table.csv'} />}>
      <ScrollX>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: HeaderGroup) => (
                  <TableCell {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}>
                    <HeaderSort column={column} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {sortingRow.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell: Cell) => (
                    <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - SORTING ||============================== //

const SortingTable = () => {
  const data = useMemo(() => makeData(40), []);
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
        Header: 'Profile Progress',
        accessor: 'progress',
        Cell: ({ value }: { value: number }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
      }
    ],
    []
  );

  return <ReactTable columns={columns} data={data} getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()} />;
};

export default SortingTable;
