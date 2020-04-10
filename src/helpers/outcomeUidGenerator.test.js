import outcomeUidGenerator from "./outcomeUidGenerator";

describe('outcomeUidGenerator.js', () => {
    it('throws for a null market', () => {
      expect(() => outcomeUidGenerator(null, null)).toThrowError("market is null")
    });
})
