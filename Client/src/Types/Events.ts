// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Events {
  export interface EventRequest {
    Title: string;
    DateOfEvent: Date;
    TimeOfEvent: string;
    Category: string;
    Location: string;
    Description?: string;
  }

  export interface EventResponse {
    id: number;
     title: string;
    dateOfEvent: Date;
    timeOfEvent: string;
    category: string;
    location: string;
    description?: string;
    count: number;
  }
}
