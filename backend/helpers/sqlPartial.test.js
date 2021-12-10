const { sqlForPartialUpdate } = require('./sqlPartial');

describe('sqlForPartialUpdate', () => {
  test('works: 1 item', () => {
    const result = sqlForPartialUpdate(
      {isAdmin: true},
      {isAdmin: 'is_admin'}
    );
    expect(result).toEqual({
      setCols: "\"is_admin\"=$1",
      values: [true]
    });
  });

  test('works: 2 items', () => {
    const result = sqlForPartialUpdate(
      {username: 'whatsittooya', isAdmin: true},
      {isAdmin: 'is_admin'}
    );
    expect(result).toEqual({
      setCols: "\"username\"=$1, \"is_admin\"=$2",
      values: ['whatsittooya', true]
    });
  });
});