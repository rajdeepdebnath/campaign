export interface Campaign {
  id: string;
  name: string;
  type: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  weekdays: string[];
}
