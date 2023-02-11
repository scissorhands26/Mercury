export type Implant = {
  expand: any;
  id: string;
  production_implant: boolean;
  active: boolean;
  platform: string;
  name: string;
  release_version: number;
  platform_version: number;
  created: string;
  last_checkin_date: string;
  last_checkin_ip: string;
  tasks: object;
  is_task_pending: boolean;
  tasks_completed: number;
  task_data: object;
  key: string;
};

export type Task = {
  timeAgo: any;
  updated: any;
  completed: any;
  expand: any;
  created: string;
  id: string;
  task: Command;
  status: number;
  data: object;
  implant: string;
};

export type Command = {
  args: string;
  cmd: string;
};

export type Location = {
  location: any;
  asn: string;
  city: string;
  continent_code: string;
  country: string;
  country_area: number;
  country_calling_code: string;
  country_capital: string;
  country_code: string;
  country_code_iso3: string;
  country_name: string;
  country_population: number;
  country_tld: string;
  currency: string;
  currency_name: string;
  in_eu: false;
  ip: string;
  languages: string;
  latitude: number;
  longitude: number;
  network: string;
  org: string;
  postal: string;
  region: string;
  region_code: string;
  timezone: string;
  utc_offset: string;
  version: string;
};
