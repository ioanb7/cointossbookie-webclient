import { groupBy } from '@/helpers';

describe('helpers.js', () => {

  describe('groupBy', () => {

    it('works for an empty list', () => {
      var input = []
      var output = {}

      expect(groupBy(input, 'age')).toEqual(output)
    });

    it('works for integer key value', () => {
      var input = [{
          name: 'x',
          age: 20
        },
        {
          name: 'y',
          age: 20
        }
      ]

      var output = {
        20: input
      }

      expect(groupBy(input, 'age')).toEqual(output)
    });

    it("doesn't combine values if they don't equal", () => {
      var input = [{
          name: 'x',
          age: 20
        },
        {
          name: 'y',
          age: 21
        }
      ]

      var output = {
        20: [{
          name: 'x',
          age: 20
        }],
        21: [{
          name: 'y',
          age: 21
        }]
      }
      const result = groupBy(input, 'age')
      expect(result).toEqual(output)
    });
  });
});
