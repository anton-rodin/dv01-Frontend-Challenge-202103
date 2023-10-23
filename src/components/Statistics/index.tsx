import { FC, useEffect } from 'react';
import Table from './Table';
import { useDispatch, useSelector } from '../../hooks';
import { fetchData, selectAgregated, selectAgregatedBar } from '../../store/statistics/statistics';
import Form from './Form';
import BarChart from './BarChart';

const Statistics: FC = () => {
  const dispatch = useDispatch();
  const { data, headers } = useSelector(selectAgregated);
  const barData = useSelector(selectAgregatedBar);

  useEffect(() => {
    // Fetch data when the component mounts
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="is-flex">
      <Form />
      <div className="is-flex-grow-2 p-3">
        <h1 className="is-size-1 pb-5">Statistics</h1>
        {data.length ? (
          <>
            <Table headers={headers} data={data} caption='Loan Grade Statistics'></Table>,
            <BarChart data={barData} />
          </>
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
};

export default Statistics;
