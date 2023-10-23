import Papa from 'papaparse';

import rawDataUrl from './loansize.csv';

export type AccountInfo = {
  year: string;
  quarter: string;
  grade: string;
  homeOwnership: string;
  term: string;
  currentBalance: number;
};

type ParseResult = {
  data: string[][];
};

const parseData = (result: ParseResult, rawData: AccountInfo[]): AccountInfo[] => {
  result.data.splice(0, 2);
  const { data } = result;
  for (let i = 0; i < data.length; i += 1) {
    const year = data[i][0];
    const quarter = data[i][1];
    const grade = data[i][2];
    const homeOwnership = data[i][3];
    const term = data[i][4];
    // By default, all data parsed from the CSV is in string format. Only convert data to numbers when it will be used for calculations.
    const currentBalance = Number(data[i][5]);
    rawData.push({
      year,
      quarter,
      grade,
      homeOwnership,
      term,
      currentBalance,
    });
  }

  return rawData;
};

export const getData = async (): Promise<AccountInfo[]> => {
  const csvData = await fetch(rawDataUrl).then((response) => {
    return response.text();
  });
  const data: AccountInfo[] = [];
  // removed unnecessary await
  Papa.parse(csvData, {
    // enabeling skipping empty lines. In provided file 2 last lines are empty
    skipEmptyLines: true,
    complete: (result) => parseData(result as ParseResult, data),
  });

  return data;
};
