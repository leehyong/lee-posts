import moment from 'moment';

export function nowStr(){
    return moment().format("MMM DD, YYYY HH:mm")
}
