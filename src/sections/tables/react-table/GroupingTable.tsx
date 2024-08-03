import React from 'react';

// material-ui
import { Box, Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useTable, useGroupBy, useExpanded, Column, Row, HeaderGroup, Cell } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { roundedMedian } from 'utils/react-table';

// assets
import { DownOutlined, GroupOutlined, RightOutlined, UngroupOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: { columns: Column[]; data: [] }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState: { groupBy: ['age'] }
    },
    useGroupBy,
    useExpanded
  );

  const firstPageRows = rows.slice(0, rows.length);

  let groupedData: any = [];
  if (rows.filter((row) => row.original).length) {
    groupedData = rows.map((row) => row.original).filter((row) => row !== undefined);
  } else {
    groupedData = [];
    rows.forEach((row: Row) => {
      if (row.subRows.length) {
        groupedData.push({ ...row.values });
        row.subRows.forEach((subRow: Row) => {
          if (subRow.subRows.length) {
            groupedData.push({ ...subRow.values });
            subRow.subRows.forEach((innerRow: Row) => {
              groupedData.push({
                ...innerRow.values,
                age: undefined,
                status: undefined
              });
            });
          } else {
            groupedData.push({
              ...subRow.values,
              age: undefined
            });
          }
        });
      } else {
        groupedData.push({ ...row.values });
      }
    });
  }

  return (
    <MainCard
      content={false}
      title="Grouping With Seperate Column"
      secondary={
        <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Legend /> <CSVExport data={groupedData} filename={'grouping-seperate-column-table.csv'} />
        </Stack>
      }
    >
      <Stack direction="row" spacing={2} sx={{ p: 2.5, display: { xs: 'flex', sm: 'none' } }} justifyContent="flex-end">
        <Legend /> <CSVExport data={groupedData} filename={'grouping-seperate-column-table.csv'} />
      </Stack>
      <ScrollX sx={{ maxHeight: 600 }}>
        <Table {...getTableProps()}>
          <TableHead sx={{ position: 'sticky', top: -1, zIndex: 1199 }}>
            {headerGroups.map((headerGroup: HeaderGroup<{}>, i: number) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: HeaderGroup<{}>, index: number) => {
                  const groupIcon = column.isGrouped ? <UngroupOutlined /> : <GroupOutlined />;
                  return (
                    <TableCell {...column.getHeaderProps([{ className: column.className }])}>
                      <Stack direction="row" spacing={1.15} alignItems="center" sx={{ display: 'inline-flex' }}>
                        {column.canGroupBy ? (
                          <Box
                            sx={{ color: column.isGrouped ? 'error.main' : 'primary.main', fontSize: '1rem' }}
                            {...column.getGroupByToggleProps()}
                          >
                            {groupIcon}
                          </Box>
                        ) : null}
                        <Box>{column.render('Header')}</Box>
                      </Stack>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {firstPageRows.map((row: Row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell: Cell) => {
                    let bgcolor = 'background.paper';
                    if (cell.isGrouped) bgcolor = 'success.lighter';
                    if (cell.isAggregated) bgcolor = 'warning.lighter';
                    if (cell.isPlaceholder) bgcolor = 'error.lighter';

                    const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;

                    return (
                      <TableCell {...cell.getCellProps([{ className: cell.column.className }])} sx={{ bgcolor }}>
                        {cell.isGrouped ? (
                          <Stack direction="row" spacing={1} alignItems="center" sx={{ display: 'inline-flex' }}>
                            <Box sx={{ pr: 0.5, fontSize: '0.75rem', color: 'text.secondary' }} {...row.getToggleRowExpandedProps()}>
                              {collapseIcon}
                            </Box>
                            <Box>{cell.render('Cell')}</Box>
                            <Box>({row.subRows.length})</Box>
                          </Stack>
                        ) : cell.isAggregated ? (
                          cell.render('Aggregated')
                        ) : cell.isPlaceholder ? null : (
                          cell.render('Cell')
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| LEGEND ||============================== //

function Legend() {
  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
      <Chip color="success" variant="light" label="Grouped" size="small" />
      <Chip color="warning" variant="light" label="Aggregated" size="small" />
      <Chip color="error" variant="light" label="Repeated" size="small" />
    </Stack>
  );
}

// ==============================|| REACT TABLE - GROUPING TABLE ||============================== //

function GroupingTable({ data }: { data: [] }) {
  const columns = React.useMemo(
    () =>
      [
        {
          Header: 'First Name',
          accessor: 'firstName',
          aggregate: 'count',
          Aggregated: ({ value }: { value: number }) => `${value} Person`,
          disableGroupBy: true
        },
        {
          Header: 'Last Name',
          accessor: 'lastName',
          disableGroupBy: true
        },
        {
          Header: 'Email',
          accessor: 'email',
          disableGroupBy: true
        },
        {
          Header: 'Age',
          accessor: 'age',
          className: 'cell-right',
          aggregate: 'average',
          Aggregated: ({ value }: { value: number }) => `${Math.round(value * 100) / 100} (avg)`
        },
        {
          Header: 'Visits',
          accessor: 'visits',
          className: 'cell-right',
          aggregate: 'sum',
          Aggregated: ({ value }: { value: number }) => `${value} (total)`,
          disableGroupBy: true
        },
        {
          Header: 'Status',
          accessor: 'status',
          Cell: ({ value }: { value: string }) => {
            switch (value) {
              case 'Complicated':
                return <Chip color="error" label="Complicated" size="small" />;
              case 'Relationship':
                return <Chip color="success" label="Relationship" size="small" />;
              case 'Single':
              default:
                return <Chip color="info" label="Single" size="small" />;
            }
          }
        },
        {
          Header: 'Profile Progress',
          accessor: 'progress',
          aggregate: roundedMedian,
          Aggregated: ({ value }: { value: number }) => `${value} (med)`,
          disableGroupBy: true,
          Cell: ({ value }: { value: number }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
        }
      ] as Column[],
    []
  );

  return <ReactTable columns={columns} data={data} />;
}

export default GroupingTable;
