export type Implant = {
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
};

export type Task = {
  id: string;
  task: Command;
  completed: boolean;
  data: object;
  implant: string;
};

export type Command = {
  cmd: string;
  arguments: string;
};
