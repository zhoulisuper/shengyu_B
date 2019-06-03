import moment from 'moment';

export default current => {
  return (
    (current && current.valueOf() > Date.now()) ||
    (current &&
      current.valueOf() <
        moment()
          .subtract(2, 'years')
          .format('X') *
          1000)
  );
};
