export type ClockData = {
  id: number,
  name: string,
  timezone: number,
}

export interface ClockProps extends ClockData {
  onRemove: (id: number) => void,
}
