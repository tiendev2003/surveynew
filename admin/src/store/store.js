import { configureStore } from '@reduxjs/toolkit';
import cauhoiReducer from '../features/cauhoi/cauhoiSlice';
import chudeReducer from '../features/chude/chudeSlice';
import khaosatReducer from '../features/khaosat/khaosatSlice';
import khoaReducer from '../features/khoa/khoaSlice';
import lophocReducer from '../features/lop/lophocSlice';
import userReducer from '../features/user/userSlice';
export const store = configureStore({
  reducer: {
    khaosat: khaosatReducer,
    cauhoi: cauhoiReducer,
    khoas: khoaReducer,
    lophocs: lophocReducer,
    users: userReducer,
    chude: chudeReducer,
  },
});