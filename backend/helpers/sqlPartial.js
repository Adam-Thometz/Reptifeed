const { BadRequestError } = require('../expressError');

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError('No data to update');

  const cols = keys.map((colName, i) => `"${jsToSql[colName] || colName}"=$${i+1}`);

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate)
  };
};

module.exports = { sqlForPartialUpdate };