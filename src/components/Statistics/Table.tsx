import numeral from 'numeral';
import { FC } from 'react';

type Props = {
  headers: string[];
  data: (number | string)[][];
  caption: string;
};

const Table: FC<Props> = ({ headers, data, caption }) => {
  return (
    <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" data-testid="table">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, id) => {
          return (
            <tr key={id}>
              {item.map((c, idc) => {
                return (
                  <td align="left" key={idc}>
                    {numeral(c).format('$0,0.00')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
