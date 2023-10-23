import { ChangeEvent, FC } from 'react';

type Props = {
  options: string[];
  value: string | null | undefined;
  name: string;
  label?: string;
  onChange: (value: string | null) => void;
};

const Select: FC<Props> = ({ options, label, value, onChange, name }) => {
  return (
    <div className="field">
      <label className="label" htmlFor={`select-${name}`}>{label} </label>
      <div className="control select is-fullwidth">
        <select
          name={name}
          id={`select-${name}`}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value || null)}
          value={value ?? ''}
          data-testid={`select-${name}`}
        >
          {/* empty option create ability to reset individual select */}
          <option value=""></option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
