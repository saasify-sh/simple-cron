import { format } from 'date-fns'

// TODO: use timezone set for job
export const formatDate = (date) =>
  date ? format(date, 'MM/dd/yyyy HH:mm:ss OOOO') : 'n/a'
