import util from 'common/util';

const parseDate = util.date.parseDate;

export const formatDate = (str, format = 'YYYY-MM-DD hh:mm:ss') => {
    return str == null ? '未知' : parseDate(str, format);
};
