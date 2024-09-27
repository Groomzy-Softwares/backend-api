export interface IAddOperatingTimeArgs {
  day: string;
  startTime: string;
  endTime: string;
}

export interface IEditOperatingTimeArgs {
  dayTimeId: number;
  day: string;
  startTime?: string;
  endTime?: string;
}

export interface IDeleteOperatingTimeArgs {
  dayTimeId: number;
}
