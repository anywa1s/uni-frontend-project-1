import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  isLoading: boolean;
  errorMessage: string | null; 
  isErrorModalOpen: boolean;   
}

const initialState: SettingsState = {
  isLoading: false,
  errorMessage: null,
  isErrorModalOpen: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    showError: (state, action: PayloadAction<string>) => {
      if (action.payload && action.payload.trim() !== '') {
        state.errorMessage = action.payload;
        state.isErrorModalOpen = true;
      } 
      else {
        state.errorMessage = null;
        state.isErrorModalOpen = false;
      }
    },

    hideErrorModal: (state) => {
      state.isErrorModalOpen = false;
      state.errorMessage = null;
    },

    resetSettings: () => initialState,
  },
});

export const { setLoading, showError, hideErrorModal, resetSettings } = settingsSlice.actions;
export default settingsSlice.reducer;