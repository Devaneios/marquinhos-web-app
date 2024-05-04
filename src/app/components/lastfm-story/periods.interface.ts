export interface Periods {
  [name: string]: string;
}

export const periodMap: Periods = {
  '7day': 'Last week',
  '1month': 'Last month',
  '3month': 'Last 3 months',
  '6month': 'Last 6 months',
  '12month': 'Last year',
  overall: 'Overall',
};
