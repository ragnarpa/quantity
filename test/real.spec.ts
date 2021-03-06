import real from "../src";

describe("real", () => {
  it.each([["1 k"], ["1\tk"], ["1\nk"]])("throws with %s", (quantity) => {
    expect(() => real(quantity)).toThrow("Unknown quantity format.");
  });

  it.each([
    ["0,1"],
    ["1.2.3"],
    [".1.2"],
    ["++1"],
    ["+1+"],
    ["--1"],
    ["-1-"],
    ["+-1"],
    ["+1-"],
    ["1+"],
    ["1-"],
    ["1kk"],
    ["1Kii"],
    ["1ei"],
    ["1ee"],
    ["1e+1.2"],
    ["1e+1+"],
    ["1e-1.2"],
    ["1e1.2"],
    ["1 e"],
    ["1 2"],
    ["e"],
    ["K"],
    ["g"],
    ["t"],
    ["p"],
    ["e"],
    ["ni"],
    ["ui"],
    ["mi"],
    ["ki"],
    ["gi"],
    ["ti"],
    ["pi"],
    ["ei"],
  ])("throws with %s", (quantity) => {
    expect(() => real(quantity)).toThrow("Unknown number format.");
  });

  it.each([
    ["n"],
    ["u"],
    ["m"],
    ["k"],
    ["M"],
    ["G"],
    ["T"],
    ["P"],
    ["E"],
    ["Ki"],
    ["Mi"],
    ["Gi"],
    ["Ti"],
    ["Pi"],
    ["Ei"],
  ])("converts multiple %s without value to 0", (multiple) => {
    const result = real(multiple);

    expect(result).toStrictEqual(0);
  });

  it.each([
    ["00.0123456789", 0.0123456789],
    [".0123456789", 0.0123456789],
    ["+.0123456789", 0.0123456789],
    ["-.0123456789", -0.0123456789],
    ["00123456789.0123456789", 123456789.0123456789],
    ["1234567890.01234567890", 1234567890.0123456789],
    ["1234567890.0123456789", 1234567890.0123456789],
    ["1234567890.0123456789m", 1234567890.0123456789 * 1e-3],
    ["1234567890.0123456789u", 1234567890.0123456789 * 1e-6],
    ["1234567890.0123456789n", 1234567890.0123456789 * 1e-9],
    ["0.123456789k", 0.123456789 * 1e3],
    ["0.123456789M", 0.123456789 * 1e6],
    ["0.123456789G", 0.123456789 * 1e9],
    ["0.123456789T", 0.123456789 * 1e12],
    ["0.123456789P", 0.123456789 * 1e15],
    ["0.123456789E", 0.123456789 * 1e18],
    ["0.123456789Ki", 0.123456789 * 2 ** 10],
    ["0.123456789Mi", 0.123456789 * 2 ** 20],
    ["0.123456789Gi", 0.123456789 * 2 ** 30],
    ["0.123456789Ti", 0.123456789 * 2 ** 40],
    ["0.123456789Pi", 0.123456789 * 2 ** 50],
    ["0.123456789Ei", 0.123456789 * 2 ** 60],
  ])("converts float %s to %f", (quantity, expected) => {
    const result = real(quantity);

    expect(result).toStrictEqual(expected);
  });

  it.each([
    ["+0123456789", 123456789],
    ["-0123456789", -123456789],
    ["+123456789", 123456789],
    ["-123456789", -123456789],
    ["0123456789", 123456789],
    ["00123456789", 123456789],
    ["123456789", 123456789],
    ["123456789m", 123456789 * 1e-3],
    ["123456789u", 123456789 * 1e-6],
    ["123456789n", 123456789 * 1e-9],
    ["123456789k", 123456789 * 1e3],
    ["123456789M", 123456789 * 1e6],
    ["123456789G", 123456789 * 1e9],
    ["123456789T", 123456789 * 1e12],
    ["123456789P", 123456789 * 1e15],
    ["123456789E", 123456789 * 1e18],
    ["123456789Ki", 123456789 * 2 ** 10],
    ["123456789Mi", 123456789 * 2 ** 20],
    ["123456789Gi", 123456789 * 2 ** 30],
    ["123456789Ti", 123456789 * 2 ** 40],
    ["123456789Pi", 123456789 * 2 ** 50],
    ["123456789Ei", 123456789 * 2 ** 60],
  ])("converts integer %s to %i", (quantity, expected) => {
    const result = real(quantity);

    expect(result).toStrictEqual(expected);
  });

  it.each([
    ["123456789e-3", 123456789 * 1e-3],
    ["123456789e3", 123456789 * 1e3],
    ["123456789e0k", 123456789 * 1e3],
    ["123456789e0M", 123456789 * 1e6],
    ["123456789e0G", 123456789 * 1e9],
    ["123456789e0T", 123456789 * 1e12],
    ["123456789e0P", 123456789 * 1e15],
    ["123456789e0E", 123456789 * 1e18],
    ["123456789e0Ki", 123456789 * 2 ** 10],
    ["123456789e0Mi", 123456789 * 2 ** 20],
    ["123456789e0Gi", 123456789 * 2 ** 30],
    ["123456789e0Ti", 123456789 * 2 ** 40],
    ["123456789e0Pi", 123456789 * 2 ** 50],
    ["123456789e0Ei", 123456789 * 2 ** 60],
    ["0.123456789e3", 0.123456789 * 1e3],
    ["0.123456789e+3", 0.123456789 * 1e3],
    ["0.123456789e-3", 0.123456789 * 1e-3],
    ["0.123456789e-1m", 0.123456789e-1 * 1e-3],
    ["0.123456789e-1u", 0.123456789e-1 * 1e-6],
    ["0.123456789e-1n", 0.123456789e-1 * 1e-9],
    ["0.123456789e0m", 0.123456789 * 1e-3],
    ["0.123456789e0u", 0.123456789 * 1e-6],
    ["0.123456789e0n", 0.123456789 * 1e-9],
    ["0.123456789e0k", 0.123456789 * 1e3],
    ["0.123456789e0M", 0.123456789 * 1e6],
    ["0.123456789e0G", 0.123456789 * 1e9],
    ["0.123456789e0T", 0.123456789 * 1e12],
    ["0.123456789e0P", 0.123456789 * 1e15],
    ["0.123456789e0E", 0.123456789 * 1e18],
    ["0.123456789e0Ki", 0.123456789 * 2 ** 10],
    ["0.123456789e0Mi", 0.123456789 * 2 ** 20],
    ["0.123456789e0Gi", 0.123456789 * 2 ** 30],
    ["0.123456789e0Ti", 0.123456789 * 2 ** 40],
    ["0.123456789e0Pi", 0.123456789 * 2 ** 50],
    ["0.123456789e0Ei", 0.123456789 * 2 ** 60],
  ])(
    "converts quantity %s in scientific e notation to %s",
    (quantity, expected) => {
      const result = real(quantity);

      expect(result).toStrictEqual(expected);
    }
  );

  it.each([
    ["123456789E3", 123456789 * 1e3],
    ["123456789E-3", 123456789 * 1e-3],
    ["123456789E0k", 123456789 * 1e3],
    ["123456789E0M", 123456789 * 1e6],
    ["123456789E0G", 123456789 * 1e9],
    ["123456789E0T", 123456789 * 1e12],
    ["123456789E0P", 123456789 * 1e15],
    ["123456789E0E", 123456789 * 1e18],
    ["123456789E0Ki", 123456789 * 2 ** 10],
    ["123456789E0Mi", 123456789 * 2 ** 20],
    ["123456789E0Gi", 123456789 * 2 ** 30],
    ["123456789E0Ti", 123456789 * 2 ** 40],
    ["123456789E0Pi", 123456789 * 2 ** 50],
    ["123456789E0Ei", 123456789 * 2 ** 60],
    ["0.123456789E3", 0.123456789 * 1e3],
    ["0.123456789E+3", 0.123456789 * 1e3],
    ["0.123456789E-3", 0.123456789 * 1e-3],
    ["0.123456789E-1m", 0.123456789e-1 * 1e-3],
    ["0.123456789E-1u", 0.123456789e-1 * 1e-6],
    ["0.123456789E-1n", 0.123456789e-1 * 1e-9],
    ["0.123456789E0m", 0.123456789 * 1e-3],
    ["0.123456789E0u", 0.123456789 * 1e-6],
    ["0.123456789E0n", 0.123456789 * 1e-9],
    ["0.123456789E0k", 0.123456789 * 1e3],
    ["0.123456789E0M", 0.123456789 * 1e6],
    ["0.123456789E0G", 0.123456789 * 1e9],
    ["0.123456789E0T", 0.123456789 * 1e12],
    ["0.123456789E0P", 0.123456789 * 1e15],
    ["0.123456789E0E", 0.123456789 * 1e18],
    ["0.123456789E0Ki", 0.123456789 * 2 ** 10],
    ["0.123456789E0Mi", 0.123456789 * 2 ** 20],
    ["0.123456789E0Gi", 0.123456789 * 2 ** 30],
    ["0.123456789E0Ti", 0.123456789 * 2 ** 40],
    ["0.123456789E0Pi", 0.123456789 * 2 ** 50],
    ["0.123456789E0Ei", 0.123456789 * 2 ** 60],
  ])(
    "converts quantity %s in scientific E notation to %s",
    (quantity, expected) => {
      const result = real(quantity);

      expect(result).toStrictEqual(expected);
    }
  );
});
