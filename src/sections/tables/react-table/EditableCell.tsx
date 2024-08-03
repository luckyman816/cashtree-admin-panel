import { useEffect, useMemo, useState } from 'react';

// material-ui
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Stack,
  Slider,
  Tooltip,
  IconButton
} from '@mui/material';

// third-party
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useTable, useFilters, Column, HeaderGroup, Row, Cell } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport } from 'components/third-party/ReactTable';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

import makeData from 'data/react-table';
import { DefaultColumnFilter } from 'utils/react-table';

// assets
import { CheckOutlined } from '@ant-design/icons';

interface CellEditProps {
  value: any;
  row: Row;
  column: any;
  updateData: (index: number, id: string, value: string) => void;
}

const CellEdit = ({ value: initialValue, row: { index }, column: { id, dataType }, updateData }: CellEditProps) => {
  const [value, setValue] = useState(initialValue);
  const [showSelect, setShowSelect] = useState(false);

  const onChange = (e: any) => {
    setValue(e.target?.value);
  };

  const onBlur = () => {
    updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  let element;
  let userInfoSchema;
  switch (id) {
    case 'email':
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.string().email('Enter valid email ').required('Email is a required field')
      });
      break;
    case 'age':
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.number()
          .typeError('Age must be number')
          .required('Age is required')
          .min(18, 'You must be at least 18 years')
          .max(100, 'You must be at most 60 years')
      });
      break;
    case 'visits':
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.number().typeError('Visits must be number').required('Required')
      });
      break;
    default:
      userInfoSchema = Yup.object().shape({
        userInfo: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is Required')
      });
      break;
  }

  switch (dataType) {
    case 'text':
      element = (
        <>
          <Formik
            initialValues={{
              userInfo: value
            }}
            enableReinitialize
            validationSchema={userInfoSchema}
            onSubmit={() => {}}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <TextField
                  value={values.userInfo}
                  id={`${index}-${id}`}
                  name="userInfo"
                  onChange={(e) => {
                    handleChange(e);
                    onChange(e);
                  }}
                  onBlur={handleBlur}
                  error={touched.userInfo && Boolean(errors.userInfo)}
                  helperText={touched.userInfo && errors.userInfo && (errors.userInfo as string)}
                  sx={{
                    '& .MuiOutlinedInput-input': { py: 0.75, px: 1, width: { xs: 80 } },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                  }}
                />
              </Form>
            )}
          </Formik>
        </>
      );
      break;
    case 'select':
      element = (
        <>
          <Select
            labelId="editable-select-status-label"
            sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }, svg: { display: 'none' } }}
            id="editable-select-status"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          >
            <MenuItem value="Complicated">
              <Chip color="error" label="Complicated" size="small" variant="light" />
            </MenuItem>
            <MenuItem value="Relationship">
              <Chip color="success" label="Relationship" size="small" variant="light" />
            </MenuItem>
            <MenuItem value="Single">
              <Chip color="info" label="Single" size="small" variant="light" />
            </MenuItem>
          </Select>
        </>
      );
      break;
    case 'progress':
      element = (
        <>
          {!showSelect ? (
            <div onClick={() => setShowSelect(true)}>
              <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
            </div>
          ) : (
            <>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ pl: 1, minWidth: 120 }}>
                <Slider
                  value={value}
                  min={0}
                  max={100}
                  step={1}
                  onBlur={onBlur}
                  onChange={(event: Event, newValue: number | number[]) => {
                    setValue(newValue);
                  }}
                  valueLabelDisplay="auto"
                  aria-labelledby="non-linear-slider"
                />
                <Tooltip title={'Submit'}>
                  <IconButton onClick={() => setShowSelect(false)}>
                    <CheckOutlined />
                  </IconButton>
                </Tooltip>
              </Stack>
            </>
          )}
        </>
      );
      break;
    default:
      element = <span></span>;
      break;
  }
  return element;
};

// ==============================|| REACT TABLE ||============================== //

interface TableProps {
  columns: Column[];
  data: [];
  updateData: (rowIndex: number, columnId: string, value: string) => void;
  skipPageReset: boolean;
}

function ReactTable({ columns, data, updateData, skipPageReset }: TableProps) {
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      Cell: CellEdit
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateData
    },
    useFilters
  );

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: HeaderGroup) => (
              <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row: Row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell: Cell) => (
                <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

// ==============================|| REACT TABLE - EDITABLE CELL ||============================== //

const EditableCell = () => {
  const [data, setData] = useState(() => makeData(10));
  const [skipPageReset, setSkipPageReset] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
        dataType: 'text'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        dataType: 'text'
      },
      {
        Header: 'Email',
        accessor: 'email',
        dataType: 'text'
      },
      {
        Header: 'Age',
        accessor: 'age',
        dataType: 'text'
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        dataType: 'text'
      },
      {
        Header: 'Status',
        accessor: 'status',
        dataType: 'select'
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
        dataType: 'progress'
      }
    ],
    []
  );

  const updateData = (rowIndex: number, columnId: string, value: string | number) => {
    // we also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old: []) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...(old[rowIndex] as {}),
            [columnId]: value
          };
        }
        return row;
      })
    );
  };

  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  return (
    <MainCard title="Cell Editable" content={false} secondary={<CSVExport data={data} filename={'cell-editable-table.csv'} />}>
      <ScrollX>
        <ReactTable columns={columns} data={data} updateData={updateData} skipPageReset={skipPageReset} />
      </ScrollX>
    </MainCard>
  );
};

export default EditableCell;
