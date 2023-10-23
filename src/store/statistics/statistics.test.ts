import { configureStore } from '@reduxjs/toolkit';
import statisticsReducer, { StatisticsState, selectAgregated, setYear } from './statistics';

const initialData = [
  {
    year: '2019',
    quarter: 'Q1',
    grade: '1',
    homeOwnership: 'OWN',
    term: ' 36 months',
    currentBalance: 1000,
  },
  {
    year: '2018',
    quarter: 'Q1',
    grade: '2',
    homeOwnership: 'OWN',
    term: ' 36 months',
    currentBalance: 1050,
  },
];

describe('selectAgregated Selector Test', () => {
  let store: ReturnType<typeof configureStore>;

  it('should be empty', () => {
    store = configureStore({
      reducer: {
        statistics: statisticsReducer,
      },
    });
    const state = store.getState() as { statistics: StatisticsState };
    const aggregation = selectAgregated(state);

    expect(aggregation).toEqual({
      data: [],
      headers: [],
    });
  });

  it('should be not empty', async () => {
    store = configureStore({
      preloadedState: {
        statistics: {
          data: initialData,
          loading: false,
          error: null,
          homeOwnership: null,
          quarter: null,
          term: null,
          year: null,
        },
      },
      reducer: {
        statistics: statisticsReducer,
      },
    });

    const state = store.getState() as { statistics: StatisticsState };
    const aggregation = selectAgregated(state);

    expect(aggregation).toEqual({
      data: [[1000, 1050]],
      headers: ['Grade 1', 'Grade 2'],
    });
  });

  it('should filter', async () => {
    store = configureStore({
      preloadedState: {
        statistics: {
          data: initialData,
          loading: false,
          error: null,
          homeOwnership: null,
          quarter: null,
          term: null,
          year: null,
        },
      },
      reducer: {
        statistics: statisticsReducer,
      },
    });
    store.dispatch(setYear('2018'));

    const state = store.getState() as { statistics: StatisticsState };
    const aggregation = selectAgregated(state);

    expect(aggregation).toEqual({
      data: [[1050]],
      headers: ['Grade 2'],
    });
  });
});
