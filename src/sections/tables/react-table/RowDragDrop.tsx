import { useCallback, useMemo, useState } from 'react';

// material-ui
import { Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { Cell, Column, HeaderGroup, Row, useTable } from 'react-table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';

import update from 'immutability-helper';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, DraggableRow } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

// ==============================|| REACT TABLE ||============================== //

const ReactTable = ({ columns, data }: { columns: Column[]; data: [] }) => {
  const [records, setRecords] = useState(data);

  const getRowId = useCallback((row: any) => row.id, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    data: records,
    columns,
    getRowId
  });

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const dragRecord = records[dragIndex];
    setRecords(
      update(records, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord]
        ]
      })
    );
  };

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup: HeaderGroup<{}>) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              <TableCell />
              {headerGroup.headers.map((column: HeaderGroup<{}>) => (
                <TableCell {...column.getHeaderProps([{ className: column.className }])}>{column.render('Header')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row: Row, index: number) => {
            prepareRow(row);
            return (
              <DraggableRow index={index} moveRow={moveRow} {...row.getRowProps()}>
                {row.cells.map((cell: Cell) => (
                  <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                ))}
              </DraggableRow>
            );
          })}
        </TableBody>
      </Table>
    </DndProvider>
  );
};

// ==============================|| REACT TABLE - ROW DRAG & DROP ||============================== //

const RowDragDrop = ({ data }: { data: [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
        className: 'cell-center'
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

  return (
    <MainCard title="Row Drag & Drop" content={false} secondary={<CSVExport data={data} filename={'row-dragable-table.csv'} />}>
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
};

export default RowDragDrop;
