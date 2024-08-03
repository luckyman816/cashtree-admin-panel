
import { useMemo, useState,useEffect} from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
 
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';

// third-party

import update from 'immutability-helper';


import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import { LabelKeyObject } from 'react-csv/components/CommonPropTypes';

import {
  useColumnOrder,
  useExpanded,
  useFilters,
  useGroupBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  Column,
  HeaderGroup,
  Row,
  Cell,

} from 'react-table';

// project import
import MainCard from 'components/MainCard';

import ScrollX from 'components/ScrollX';


import {
  DraggableHeader,

  HeaderSort,

  TablePagination,
  CSVExport,
  EmptyTable,
  Item
} from 'components/third-party/ReactTable';

import {

  renderFilterTypes,

  GlobalFilter,
  DefaultColumnFilter,


} from 'utils/react-table';

// assets
import { DownOutlined, GroupOutlined, RightOutlined, UngroupOutlined } from '@ant-design/icons';

import { getWallets } from 'store/reducers/wallet'; 
import { useSelector } from 'store';
// types



// ==============================|| REACT TABLE ||============================== //


function ReactTable({ columns, data }: { columns: Column[]; data: object[] }) {
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const [editableRowIndex,] = useState(null);

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const initialState = useMemo(
    () => ({
      filters: [{ id: 'status', value: '' }],
      hiddenColumns: ['id', 'role', 'contact', 'country', 'fatherName'],
      columnOrder: ['selection', 'avatar', 'lastName', 'firstName', 'email', 'age', 'visits', 'status', 'progress'],
      pageIndex: 0,
      pageSize: 10
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    page,
    prepareRow,
    setColumnOrder,
    gotoPage,
    setPageSize,

    allColumns,
    state: { globalFilter, hiddenColumns, pageIndex, pageSize, columnOrder },
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState,
      filterTypes,
      editableRowIndex,
      
    },
    useGlobalFilter,
    useFilters,
    useColumnOrder,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    
  );

  const reorder = (item: Item, newIndex: number) => {
    const { index: currentIndex } = item;

    let dragRecord = columnOrder[currentIndex];
    if (!columnOrder.includes(item.id)) {
      dragRecord = item.id;
    }

    setColumnOrder(
      update(columnOrder, {
        $splice: [
          [currentIndex, 1],
          [newIndex, 0, dragRecord]
        ]
      })
    );
  };

  let headers: LabelKeyObject[] = [];
  allColumns.map((item) => {
    if (!hiddenColumns?.includes(item.id) && item.id !== 'selection' && item.id !== 'edit') {
      headers.push({ label: typeof item.Header === 'string' ? item.Header : '#', key: item.id });
    }
    return item;
  });

  return (
    <>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" sx={{ p: 2, pb: 0 }}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <Stack direction="row" spacing={2}>
            
            <CSVExport
              data={selectedFlatRows.length > 0 ? selectedFlatRows.map((d: Row) => d.original).filter((d) => d !== undefined) : data}
              filename={'wallet-table.csv'}
              headers={headers}
            />
          </Stack>
        </Stack>

        <Box sx={{ width: '100%', overflowX: 'auto', display: 'block' }}>
          <Table {...getTableProps()}>
            <TableHead sx={{ borderTopWidth: 2 }}>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: HeaderGroup<{}>, index: number) => {
                    const groupIcon = column.isGrouped ? <UngroupOutlined /> : <GroupOutlined />;
                    return (
                      <TableCell {...column.getHeaderProps([{ className: column.className }])}>
                        <DraggableHeader reorder={reorder} key={column.id} column={column} index={index}>
                          <Stack direction="row" spacing={1.15} alignItems="center" sx={{ display: 'inline-flex' }}>
                            {column.canGroupBy ? (
                              <Box
                                sx={{ color: column.isGrouped ? 'error.main' : 'primary.main', fontSize: '1rem' }}
                                {...column.getGroupByToggleProps()}
                              >
                                {groupIcon}
                              </Box>
                            ) : null}
                            <HeaderSort column={column} sort />
                          </Stack>
                        </DraggableHeader>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>

            {/* striped table -> add class 'striped' */}
            <TableBody {...getTableBodyProps()} className="striped">
              {headerGroups.map((group: HeaderGroup<{}>) => (
                <TableRow {...group.getHeaderGroupProps()}>
                  {group.headers.map((column: HeaderGroup) => (
                    <TableCell {...column.getHeaderProps([{ className: column.className }])}>
                      {column.canFilter ? column.render('Filter') : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {page.length > 0 ? (
                page.map((row: Row, i: number) => {
                  prepareRow(row);
                  return (
                    <TableRow
                      {...row.getRowProps()}
                      {...(editableRowIndex !== row.index && {
                        onClick: () => {
                          
                        }
                      })}
                      sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                    >
                      {row.cells.map((cell: Cell) => {
                        let bgcolor = 'inherit';
                        if (cell.isGrouped) bgcolor = 'success.lighter';
                        if (cell.isAggregated) bgcolor = 'warning.lighter';
                        if (cell.isPlaceholder) bgcolor = 'error.lighter';
                        if (cell.isPlaceholder) bgcolor = 'error.lighter';
                        if (row.isSelected) bgcolor = alpha(theme.palette.primary.lighter, 0.35);
                        const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;

                        return (
                          <TableCell {...cell.getCellProps([{ className: cell.column.className }])} sx={{ bgcolor }}>
                            {cell.isGrouped ? (
                              <Stack direction="row" spacing={1} alignItems="center" sx={{ display: 'inline-flex' }}>
                                <Box
                                  sx={{ pr: 1.25, fontSize: '0.75rem', color: 'text.secondary' }}
                                  onClick={(e: any) => {
                                    row.toggleRowExpanded();
                                    e.stopPropagation();
                                  }}
                                >
                                  {collapseIcon}
                                </Box>
                                {cell.render('Cell')} ({row.subRows.length})
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
                })
              ) : (
                <EmptyTable msg="No Data" colSpan={9} />
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
        </Box>
        <Box sx={{ p: 2, py: 0 }}>
          <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
        </Box>
      </Stack>
    </>
  );
}

// ==============================|| REACT TABLE - UMBRELLA ||============================== //



// const data = useSelector(selectLeaders);


const WalletBoard = () => {

  useEffect(()=>{
    getWallets();
  },[])
  // const data = useMemo(() => makeData(200), []);
  const wallet_state = useSelector((state) => state.wallet.wallets)
  const [wallets, setWallets]  = useState(wallet_state)
  useEffect(()=>{
    setWallets(wallet_state)
  },[wallet_state])
  
  // const data = [
  //   {
  //     rank: "1",
  //     userName:"kjsldf",
  //     email:"sdfl@dxf.com"
  //   },
  //   {
  //     rank: "2",
  //     userName:"kjsldf",
  //     email:"sdfl@dxf.com"
  //   },
  //   {
  //     rank: "3",
  //     userName:"kjsldf",
  //     email:"sdfl@dxf.com"
  //   },
  // ];
  const columns = useMemo(
    () =>
      [
        {
          Header: 'User Name',
          Footer: 'User Name',
          accessor: 'userName',
          dataType: 'text',
          disableGroupBy: true,
          aggregate: 'count',
          Aggregated: ({ value }: { value: number }) => `${value} Person`
        },
        
        {
          Header: 'Email',
          Footer: 'Email',
          accessor: 'email',
          dataType: 'text',
          disableGroupBy: true
        },
        {
          Header: 'Wallet Address',
          Footer: 'Wallet Address',
          accessor: 'wallet',
          dataType: 'text',
          disableGroupBy: true
        },
      ] as unknown as Column[],
    []
  );

  return (
    <MainCard>
      <ScrollX>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <ReactTable columns={columns} data={wallets} />
        </DndProvider>
      </ScrollX>
    </MainCard>
  );
};

export default WalletBoard;
