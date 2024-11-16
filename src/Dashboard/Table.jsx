import { Box, Button, Stack } from '@mui/material';
import MuiPagination from '@mui/material/Pagination';
import { darken, lighten, styled } from '@mui/material/styles';
import {
  DataGrid, GridPagination, gridPageCountSelector, useGridApiContext, useGridSelector, GridToolbar,
  GridToolbarQuickFilter,
  GridToolbarContainer
} from '@mui/x-data-grid';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSV, deleteData, page_count } from '../Reducers/userReducer';
import DeleteIcon from '@mui/icons-material/Delete';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import { useLocation } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette?.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette?.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette?.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette?.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette?.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette?.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));
function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

function Pagination({ page, onPageChange, className }) {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pages = useSelector((state) => state?.user?.page)
  const dispatch = useDispatch()
  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount > 5 ? pageCount : 10}
      page={pages + 1}
      onChange={(event, newPage) => {
        onPageChange(event, newPage - 1);
        dispatch(page_count(newPage - 1))
      }}
    />
  );
}
const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .super-app-theme--Open': {
    backgroundColor: '#00ffbf',
    '&:hover': {
      backgroundColor: '#F5F5F5',
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.info.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.info.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--track': {
    backgroundColor: '#DCDCDC',
    '&:hover': {
      backgroundColor: '#F5F5F5',
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.info.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.info.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--route': {
    backgroundColor: '#e6e6ff',
    '&:hover': {
      backgroundColor: '#F5F5F5',
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.info.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.info.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--unload': {
    backgroundColor: '#ff9933',
    '&:hover': {
      backgroundColor: '#F5F5F5',
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.info.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.info.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--Filled': {
    backgroundColor: 'rgb(88, 208, 99)',
    '&:hover': {
      backgroundColor: 'rgb(88, 208, 99,0.6)',
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.success.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.success.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--PartiallyFilled': {
    backgroundColor: '#ffff00',
    '&:hover': {
      backgroundColor: '#ffff80',
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.warning.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.warning.main,
          theme.palette.mode,
        ),
      },
    },
  },
  '& .super-app-theme--Rejected': {
    backgroundColor: 'rgb(255, 94, 94)',
    '&:hover': {
      backgroundColor: 'rgb(255, 94, 94,0.6)'
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode,
        ),
      },
    },
  },
}));
function CustomPagination(props) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 1,
        pb: 0,
        textAlign: 'left',
        color: '#000'
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
}
function CustomToolbar({ bulkdel,bulkmove,openColumn,handleChangePosting,handleChangePostingvalue }) {
  const deletedata = useSelector((state) => state?.user?.deleteData)
  const location = useLocation()
  const dispatch = useDispatch()
  return (
    <GridToolbarContainer>
      <QuickSearchToolbar />
       <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => openColumn()}>
        {location?.pathname === '/dashboard/Trash' ? 'New Tracker' : location?.pathname === '/dashboard/view-dat' ? 'ADD NEW DAT LOAD' : location?.pathname === '/dashboard/view-truckstop' ? 'ADD NEW TRUCKSTOP LOAD' : location?.pathname === '/dashboard/Trucker-Path' ? 'ADD NEW TRUCKERPATH LOAD' : location?.pathname === '/dashboard/direct-freight' ? 'ADD NEW DIRECT FREIGHT LOAD' : location?.pathname === '/dashboard/shippers-details' ? 'ADD SHIPPER' : location?.pathname === '/dashboard/consignee-details' ? 'ADD CONSIGNEE' : 'ADD NEW LOAD'}
        </Button>
        {(location?.pathname === '/dashboard/consignee-details' || location?.pathname === '/dashboard/shippers-details') && <Button variant="contained" onClick={() => dispatch(CSV(true))}>
        {location?.pathname === '/dashboard/shippers-details' ? "ADD SHIPPER'S CSV" : "ADD CONSIGNEE'S CSV"}
        </Button>}
        {/* <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button> */}
      </Stack>
      {location?.pathname === '/dashboard/direct-freight' && <Stack direction="row" spacing={2}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Posting Type</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={handleChangePostingvalue}
        label="Posting Type"
        onChange={handleChangePosting}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value='test_loads'>Test Loads</MenuItem>
        <MenuItem value='test_trucks'>Test Trucks</MenuItem>
        <MenuItem value='private_loads'>Private Loads</MenuItem>
        <MenuItem value='private_trucks'>Private Trucks</MenuItem>
        <MenuItem value='trucks'>Trucks</MenuItem>
        <MenuItem value='loads'>Loads</MenuItem>
      </Select>
    </FormControl>
    </Stack>}
      {deletedata?.length > 0 && <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => bulkdel()} startIcon={<DeleteIcon />} disabled={(location?.pathname !== '/dashboard/Trash') && deletedata?.length > 10}>
          {`Delete ${location?.pathname !== '/dashboard/Trash' ? `(${deletedata?.length} of 10 (max) )`:""}`}
        </Button>
        {/* <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button> */}
      </Stack>}
      {deletedata?.length > 0 && deletedata?.[0]?.trackingId && <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => bulkmove()} startIcon={<AddToDriveIcon />}>
          Recover Loads
        </Button>
        {/* <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button> */}
      </Stack>}
      {/* <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: 'Change density' } }}
      /> */}
      <Box sx={{ flexGrow: 1 }} />
      {/* <GridToolbarExport
        slotProps={{
          tooltip: { title: 'Export data' },
          button: { variant: 'outlined' },
        }}
      /> */}
    </GridToolbarContainer>
  );
}

export default function ColumnData({ rows, columns, top, bulkdel,bulkmove,openColumn,handleChangePosting,handleChangePostingvalue }) {
  const dispatch = useDispatch()
  const deletedata = useSelector((state) => state?.user?.deleteData)
  return (
    <div className='track_table_common'>
      <StyledDataGrid
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          fontSize: 10
        }}
        getRowClassName={(params) => `super-app-theme--${params.row.loadStatus == 'NOT STARTED' ? 'Rejected' : params.row.loadStatus == 'DELIVERED' ? 'Filled' : params.row.loadStatus == 'PICKED UP' ? 'PartiallyFilled' : params.row.loadStatus == 'LOADING' ? 'Open' : params.row.loadStatus == 'UNLOADING' ? 'unload' : params.row.loadStatus == 'UNLOADING' ? 'track' : 'route'}`}
        pagination
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
          pagination: CustomPagination,
          toolbar: CustomToolbar
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100 },
          }
        }}
        pageSizeOptions={[100]}
        getRowId={(row) => row?.trackingId || row?.loadId || row?.shipment_info?.external_id || row?.shipment_info?.id || row?.posting_id || row?.custom_id || row?.id}
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rows.filter((row) =>
            selectedIDs.has(row?.trackingId || row?.id?.toString() || row?.loadId?.toString() || row?.shipment_info?.external_id?.toString() || row?.posting_id)
          );
          dispatch(deleteData(selectedRowData))
        }}
        rowSelection={true}
        checkboxSelection={true}
        cellSelection={false}
        rowHeight={27}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            bulkdel: bulkdel,
            bulkmove:bulkmove,
            openColumn:openColumn,
            handleChangePosting:handleChangePosting,
            handleChangePostingvalue:handleChangePostingvalue
          },
        }}
      />
    </div>
  );
}