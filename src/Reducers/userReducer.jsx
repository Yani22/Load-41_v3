import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    value: [],
    userID: [],
    appleID: [],
    cell: [],
    load: [],
    delete: [],
    trucker: [],
    dat: [],
    truckstop: [],
    direct: [],
    docid: '',
    user: [],
    maps: true,
    mapData: {},
    logs: [],
    bulk: false,
    single: false,
    csv: false,
    page: 0,
    deleteData: [],
    locationLogs: [],
    shareType:'',
    changeDate:''
  },
  reducers: {
    deleteData: (state, action) => {
      state.deleteData = action.payload
    },
    mapData: (state, action) => {
      state.mapData = action.payload
    },
    locationLogs: (state, action) => {
      state.locationLogs = action.payload
    },
    Maps: (state, action) => {
      state.maps = action.payload
    },
    appleID: (state, action) => {
      state.appleID = action.payload
    },
    userID: (state, action) => {
      state.userID = action.payload
    },
    Cell: (state, action) => {
      if (action.payload.id == 'tracking') state.cell = action.payload.data
      if (action.payload.id == 'load_data') state.load = action.payload.data
      if (action.payload.id == 'tracking_delete') state.delete = action.payload.data
      if (action.payload.id == 'trucker') state.trucker = action.payload.data
      if (action.payload.id == 'dat') state.dat = action.payload.data
      if (action.payload.id == 'truckstop') state.truckstop = action.payload.data
      if (action.payload.id == 'direct') state.direct = action.payload.data
      // if(action.payload.id == 'tracking_dashboard')state.cell = action.payload.data
      // if(action.payload.id == 'tracking_dashboard')state.cell = action.payload.data
    },
    DocId: (state, action) => {
      state.docid = action.payload
    },
    Users: (state, action) => {
      state.user = action.payload
    },
    Logs: (state, action) => {
      state.logs = action.payload
    },
    Bulk: (state, action) => {
      state.bulk = action.payload
    },
    CSV: (state, action) => {
      state.csv = action.payload
    },
    Single: (state, action) => {
      state.single = action.payload
    },
    page_count: (state, action) => {
      state.page = action.payload
    },
    shareType: (state, action) => {
      state.shareType = action.payload
    },
    changeDate: (state, action) => {
      state.changeDate = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { locationLogs, changeDate, CSV, appleID, userID,shareType, Cell, DocId, Users, Maps, mapData, Logs, Bulk, Single, page_count, deleteData } = userSlice.actions

export default userSlice.reducer