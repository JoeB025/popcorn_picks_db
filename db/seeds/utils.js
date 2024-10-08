const db = require('../../db/connection')

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

// exports.formatComments = (comments, idLookup) => {
//   return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
//     const movie_id = idLookup[belongs_to];
//     return {
//       movie_id,
//       author: created_by,
//       ...this.convertTimestampToDate(restOfComment),
//     };
//   });
// };
