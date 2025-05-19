import { format } from 'date-fns';

export const formatTime = (timestamp) => {
  try {
    return format(new Date(timestamp), 'HH:mm:ss');
  } catch {
    return timestamp;
  }
};
