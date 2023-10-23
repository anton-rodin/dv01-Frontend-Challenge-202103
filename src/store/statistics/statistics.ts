import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { AccountInfo, getData } from '../../request/api';

// Define an async thunk action for fetching data
// I assume there will be an API call. CSV file has been used for simplicity
export const fetchData = createAsyncThunk('statistics/fetchData', getData);

export type StatisticsState = {
  homeOwnership: string | null;
  quarter: string | null;
  term: string | null;
  year: string | null;
  data: AccountInfo[] | null;
  loading: boolean;
  error: string | null | undefined;
};

const initialState: StatisticsState = {
  homeOwnership: null,
  quarter: null,
  term: null,
  year: null,
  data: null,
  loading: false,
  error: null,
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setHomeOwnership: (state, action) => {
      state.homeOwnership = action.payload;
    },
    setQuarter: (state, action) => {
      state.quarter = action.payload;
    },
    setTerm: (state, action) => {
      state.term = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    reset: (state) => {
      state.homeOwnership = null;
      state.quarter = null;
      state.term = null;
      state.year = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// SELECTORS

export const selectStatistics = ({ statistics }: { statistics: StatisticsState }) => statistics;
export const selectAccounts = ({ statistics }: { statistics: StatisticsState }) => statistics.data;
export const selectHomeOwnership = ({ statistics }: { statistics: StatisticsState }) => statistics.homeOwnership;
export const selectQuarter = ({ statistics }: { statistics: StatisticsState }) => statistics.quarter;
export const selectTerm = ({ statistics }: { statistics: StatisticsState }) => statistics.term;
export const selectYear = ({ statistics }: { statistics: StatisticsState }) => statistics.year;

const getOptions = (data: AccountInfo[] | null, key: keyof AccountInfo) => {
  const set = new Set<string>();
  data?.forEach((item) => {
    // if null or undefined, convert to empty string
    // otherwise, convert value to string
    const value = item[key] == null ? '' : String(item[key]);
    set.add(value);
  });

  // @ts-ignore TS doesn't like strings substruction
  return Array.from(set).sort((a, b) => a - b); // better sorting for numeric strings
};
export const selectGradeOptions = createSelector([selectAccounts], (data) => getOptions(data, 'grade'));
export const selectHomeOwnershipOptions = createSelector([selectAccounts], (data) => getOptions(data, 'homeOwnership'));
export const selectQuarterOptions = createSelector([selectAccounts], (data) => getOptions(data, 'quarter'));
export const selectTermOptions = createSelector([selectAccounts], (data) => getOptions(data, 'term'));
export const selectYearOptions = createSelector([selectAccounts], (data) => getOptions(data, 'year'));

export const selectAgregated = createSelector(
  [selectAccounts, selectHomeOwnership, selectQuarter, selectTerm, selectYear],
  (data, homeOwnership, quarter, term, year) => {
    const aggregation: { [key: string]: number } = {};
    const rawData: AccountInfo[] = [];

    data?.forEach((item) => {
      if (homeOwnership != null && item.homeOwnership !== homeOwnership) {
        return;
      }
      if (quarter != null && item.quarter !== quarter) {
        return;
      }
      if (term != null && item.term !== term) {
        return;
      }
      if (year != null && item.year !== year) {
        return;
      }
      rawData.push(item);
      aggregation[item.grade] = aggregation[item.grade] || 0;

      // I assume in the task by "total aggregation" is meant the sum of the currentBalance field
      aggregation[item.grade] += item.currentBalance;
    });

    // Sort grades in ascending order
    // @ts-ignore
    const order = Object.keys(aggregation).sort((a, b) => a - b); // better sorting for numeric strings

    // if no data
    if (!order.length) {
      return { headers: [], data: [] };
    }
    // Create the right order for table's cells
    // Arrays harder to read but structuer itself is much simpler
    // this data structure is ok for current task but
    // at least to have a an array of objects in data will be better rendering performance
    return {
      headers: order.map((key) => (key ? `Grade ${key}` : 'No grade')),
      // round to 2 digits after comma
      data: [order.map((key) => Math.round(aggregation[key] * 100) / 100)],
    };
  },
);


export const selectAgregatedBar = createSelector([selectAgregated], (agregated) => {
  const result: { key: string; value: number }[] = [];
  agregated.headers.forEach((header, i) => {
    result.push({ key: header, value: agregated.data[0][i] });
  });
  return result;
});

export const { setHomeOwnership, setQuarter, setTerm, setYear, reset } = statisticsSlice.actions;

export default statisticsSlice.reducer;
