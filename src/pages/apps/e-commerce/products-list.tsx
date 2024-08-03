import { useCallback, useEffect, useMemo, FC, Fragment, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  capitalize,
  Button,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';

// third-party
import { NumericFormat } from 'react-number-format';
import {
  useFilters,
  useExpanded,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  useTable,
  usePagination,
  Column,
  HeaderGroup,
  Row,
  Cell,
  HeaderProps
} from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import { HeaderSort, IndeterminateCheckbox, SortingSelect, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import ProductView from 'sections/apps/e-commerce/product-list/ProductView';

import { useDispatch, useSelector } from 'store';
import { getProducts } from 'store/reducers/product';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

// assets
import { CloseOutlined, PlusOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';

const productImage = require.context('assets/images/e-commerce', true);

// ==============================|| REACT TABLE ||============================== //

interface Props {
  columns: Column[];
  data: [];
  renderRowSubComponent: FC<any>;
}

function ReactTable({ columns, data, renderRowSubComponent }: Props) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'name', desc: false };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    allColumns,
    visibleColumns,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize },
    preGlobalFilteredRows,
    setGlobalFilter,
    setSortBy
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 5, hiddenColumns: ['image', 'description'], sortBy: [sortBy] }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  useMemo(() => {
    if (matchDownSM) {
      setHiddenColumns(['id', 'image', 'description', 'categories', 'offerPrice', 'quantity', 'isStock']);
    } else {
      setHiddenColumns(['image', 'description']);
    }
    // eslint-disable-next-line
  }, [matchDownSM]);

  const history = useNavigate();

  const handleAddProduct = () => {
    history(`/apps/e-commerce/add-new-product`);
  };

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 3, pb: 0 }}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <Stack direction="row" alignItems="center" spacing={1}>
            <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
            <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAddProduct}>
              Add Product
            </Button>
          </Stack>
        </Stack>

        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup: HeaderGroup<{}>) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column: HeaderGroup) => (
                  <TableCell {...column.getHeaderProps([{ className: column.className }])}>
                    <HeaderSort column={column} sort />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row: Row, i: number) => {
              prepareRow(row);
              const rowProps = row.getRowProps();

              return (
                <Fragment key={i}>
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
                  {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
                </Fragment>
              );
            })}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
    </>
  );
}

// ==============================|| PRODUCT LIST - MAIN ||============================== //

const ProductList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        title: 'Row Selection',
        Header: ({ getToggleAllPageRowsSelectedProps }: HeaderProps<{}>) => (
          <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
        ),
        accessor: 'selection',
        Cell: ({ row }: any) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
        disableSortBy: true
      },
      {
        Header: '#',
        accessor: 'id',
        className: 'cell-center'
      },
      {
        Header: 'Product Detail',
        accessor: 'name',
        Cell: ({ row }: { row: Row }) => {
          const { values } = row;
          return (
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                variant="rounded"
                alt={values.name}
                color="secondary"
                size="sm"
                src={productImage(`./thumbs/${!values.image ? 'prod-11.png' : values.image}`)}
              />
              <Stack spacing={0}>
                <Typography variant="subtitle1">{values.name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {values.description}
                </Typography>
              </Stack>
            </Stack>
          );
        }
      },
      {
        Header: 'Image',
        accessor: 'image',
        disableSortBy: true
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Categories',
        accessor: 'categories',
        Cell: ({ value }: { value: [] }) => (
          <Stack direction="row" spacing={0.25}>
            {value.map((item: string, index: number) => (
              <Typography variant="h6" key={index}>
                {capitalize(item)}
                {value.length > index + 1 ? ',' : ''}
              </Typography>
            ))}
          </Stack>
        )
      },
      {
        Header: 'Price',
        accessor: 'offerPrice',
        className: 'cell-right',
        Cell: ({ value }: { value: number }) => <NumericFormat value={value} displayType="text" thousandSeparator prefix="$" />
      },
      {
        Header: 'Qty',
        accessor: 'quantity',
        className: 'cell-right'
      },
      {
        Header: 'Status',
        accessor: 'isStock',
        Cell: ({ value }: { value: string }) => (
          <Chip color={value ? 'success' : 'error'} label={value ? 'In Stock' : 'Out of Stock'} size="small" variant="light" />
        )
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }: { row: Row }) => {
          const collapseIcon = row.isExpanded ? (
            <CloseOutlined style={{ color: theme.palette.error.main }} />
          ) : (
            <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
          );
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="View">
                <IconButton
                  color="secondary"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    row.toggleRowExpanded();
                  }}
                >
                  {collapseIcon}
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                  }}
                >
                  <EditTwoTone twoToneColor={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                  }}
                >
                  <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const renderRowSubComponent = useCallback(({ row }: { row: Row }) => <ProductView data={products[Number(row.id)]} />, [products]);

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={products as []} renderRowSubComponent={renderRowSubComponent} />
      </ScrollX>
    </MainCard>
  );
};

export default ProductList;
