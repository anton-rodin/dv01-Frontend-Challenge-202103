import { FC } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import {
  reset,
  selectHomeOwnershipOptions,
  selectQuarterOptions,
  selectStatistics,
  selectTermOptions,
  selectYearOptions,
  setHomeOwnership,
  setQuarter,
  setTerm,
  setYear,
} from '../../store/statistics/statistics';
import Select from './Select';

const Form: FC = () => {
  const dispatch = useDispatch();
  const { homeOwnership, quarter, term, year } = useSelector(selectStatistics);

  const homeOwnershipOptions = useSelector(selectHomeOwnershipOptions);
  const quarterOptions = useSelector(selectQuarterOptions);
  const termOptions = useSelector(selectTermOptions);
  const yearOptions = useSelector(selectYearOptions);
  return (
    <form className="form is-flex-grow-1 is-flex-shrink-0 p-3" onSubmit={(e) => e.preventDefault()}>
      <h1 className="is-size-4 pb-2">Filters</h1>
      <div className="">
        <Select
          label="Home Ownership"
          name="homeOwnership"
          options={homeOwnershipOptions}
          onChange={(value) => dispatch(setHomeOwnership(value))}
          value={homeOwnership}
        ></Select>
        <Select
          label="Quarter"
          name="quarter"
          options={quarterOptions}
          onChange={(value) => dispatch(setQuarter(value))}
          value={quarter}
        ></Select>
        <Select
          label="Term"
          name="term"
          options={termOptions}
          onChange={(value) => dispatch(setTerm(value))}
          value={term}
        ></Select>
        <Select
          label="Year"
          name="year"
          options={yearOptions}
          onChange={(value) => dispatch(setYear(value))}
          value={year}
        ></Select>
        <div className="field">
          <div className="control">
            <button className="button is-primary" onClick={() => dispatch(reset())}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
