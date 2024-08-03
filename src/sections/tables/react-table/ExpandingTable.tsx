import { useCallback, useEffect, useMemo, useState, FC, Fragment } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Chip, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useExpanded, useTable, TableRowProps, Row, Cell, Column, HeaderGroup } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

import makeData from 'data/react-table';
import mockData from 'utils/mock-data';

// assets
import { DownOutlined, RightOutlined } from '@ant-design/icons';

// ==============================|| SUB ROW ||============================== //

function SubRows({ row, rowProps, data, loading }: { row: Row; rowProps: TableRowProps; data: []; loading: boolean }) {
  const theme = useTheme();

  if (loading) {
    return (
      <>
        {[0, 1, 2].map((item: number) => (
          <TableRow key={item}>
            <TableCell />
            {[0, 1, 2, 3, 4, 5].map((col: number) => (
              <TableCell key={col}>
                <Skeleton animation="wave" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </>
    );
  }

  return (
    <>
      {data.map((x: Row, i: number) => (
        <TableRow {...rowProps} key={`${rowProps.key}-expanded-${i}`} sx={{ bgcolor: alpha(theme.palette.primary.lighter, 0.35) }}>
          {row.cells.map((cell: Cell<{}, any>) => (
            <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>
              {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell', {
                // @ts-ignore --react-table
                value: cell.column.accessor && cell.column.accessor(x, i),
                row: { ...row, original: x }
              })}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

// ==============================|| SUB ROW - ASYNC DATA ||============================== //

function SubRowAsync({ row, rowProps }: { row: Row; rowProps: TableRowProps }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<[]>([]);
  const numRows = mockData(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(makeData(numRows.number.status(1, 5)));
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, []);

  return <SubRows row={row} rowProps={rowProps} data={data} loading={loading} />;
}

// ==============================|| REACT TABLE ||============================== //

interface TableProps {
  columns: Column[];
  data: [];
  renderRowSubComponent: FC<any>;
}

function ReactTable({ columns: userColumns, data, renderRowSubComponent }: TableProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, visibleColumns } = useTable(
    {
      columns: userColumns,
      data
    },
    useExpanded
  );

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup: HeaderGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: HeaderGroup) => (
              <TableCell {...column.getHeaderProps([{ className: column.className }])}>{column.render('Header')}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row: Row, i: number) => {
          prepareRow(row);
          const rowProps = row.getRowProps();

          return (
            <Fragment key={i}>
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell: Cell<{}>) => (
                  <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                ))}
              </TableRow>
              {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}

// ==============================|| REACT TABLE - EXPANDING TABLE ||============================== //

const ExpandingTable = ({ data }: { data: [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander',
        className: 'cell-center',
        Cell: ({ row }: { row: Row }) => {
          const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;
          return (
            <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }} {...row.getToggleRowExpandedProps()}>
              {collapseIcon}
            </Box>
          );
        },
        SubCell: () => null
      },
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

  const renderRowSubComponent = useCallback(
    ({ row, rowProps }: { row: Row; rowProps: TableRowProps }) => <SubRowAsync row={row} rowProps={rowProps} />,
    []
  );

  return (
    <MainCard content={false} title="Expanding Row" secondary={<CSVExport data={data} filename={'expanding-row-table.csv'} />}>
      <ScrollX>
        <ReactTable columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />
      </ScrollX>
    </MainCard>
  );
};

export default ExpandingTable;
