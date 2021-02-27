export const milli = 1e-3,
  micro = 1e-6,
  nano = 1e-9,
  kilo = 1e3,
  mega = 1e6,
  giga = 1e9,
  tera = 1e12,
  peta = 1e15,
  exa = 1e18,
  kibi = 2 ** 10,
  mebi = 2 ** 20,
  gibi = 2 ** 30,
  tebi = 2 ** 40,
  pebi = 2 ** 50,
  exbi = 2 ** 60;

export type MultiplierFunction = (value: number) => number;

export const multipliers: { [index: string]: MultiplierFunction } = {
  m: (value) => value * milli,
  u: (value) => value * micro,
  n: (value) => value * nano,
  k: (value) => value * kilo,
  M: (value) => value * mega,
  G: (value) => value * giga,
  T: (value) => value * tera,
  P: (value) => value * peta,
  E: (value) => value * exa,
  Ki: (value) => value * kibi,
  Mi: (value) => value * mebi,
  Gi: (value) => value * gibi,
  Ti: (value) => value * tebi,
  Pi: (value) => value * pebi,
  Ei: (value) => value * exbi,
};

export const decimalMultiples = ["m", "u", "n", "k", "M", "G", "T", "P", "E"],
  binaryMultiples = ["K", "M", "G", "T", "P", "E"],
  binaryPrefix = "i";

/**
 * Convert given quantity into a real number.
 *
 * The function supports following quantity multiples:
 *    - n (nano)
 *    - u (micro)
 *    - m (milli)
 *    - k (kilo)
 *    - M (mega)
 *    - G (giga)
 *    - T (tera)
 *    - P (peta)
 *    - E (exa)
 *    - Ki (kibi)
 *    - Mi (mebi)
 *    - Gi (gibi)
 *    - Ti (tebi)
 *    - Pi (pebi)
 *    - Ei (exbi)
 *
 * The motivation for writing the function came from Kubernetes quantity definition at
 * https://github.com/kubernetes/apimachinery/blob/master/pkg/api/resource/quantity.go.
 * Unfortunately, Kubernetes' quantities can't be fed as-is into every other system.
 *
 * Conversions:
 *  1m => 0.001
 *  1u => 0.000001
 *  1n => 0.000000001
 *  1k => 1000 (10^3)
 *  1M => 1000000 (10^6)
 *  1G => 1000000000 (10^9)
 *  1T => 1000000000000 (10^12)
 *  1P => 1000000000000000 (10^15)
 *  1E => 1000000000000000000 (10^18)
 *  1Ki => 1024 (2^10)
 *  1Mi => 1048576 (2^20)
 *  1Gi => 1073741824 (2^30)
 *  1Ti => 1099511627776 (2^40)
 *  1Pi => 1125899906842624 (2^50)
 *  1Ei => 1152921504606847000 (2^60)
 *
 * Notes
 *
 * Conversion will be done in double-precision 64-bit floating point
 * arithmetic (https://developer.mozilla.org/en-US/docs/Glossary/number),
 * therefore the precision of the result is limited to double-precision 64-bit
 * floating point precision.
 *
 * @param quantity A string representing a quantity with possible multiple.
 */
export function real(quantity: string): number | undefined {
  if (!quantity) {
    return undefined;
  }

  let multiplier = "";
  let prefix = quantity.slice(-1);
  let valueStr = "";

  if (prefix === binaryPrefix) {
    prefix = quantity.slice(-2, -1);
    if (binaryMultiples.includes(prefix)) {
      multiplier = prefix + binaryPrefix;
      valueStr = quantity.slice(0, -2);
    } else {
      // Unknown prefix.
      // Let Number ctor handle it.
      valueStr = quantity;
    }
  } else if (decimalMultiples.includes(prefix)) {
    multiplier = prefix;
    valueStr = quantity.slice(0, -1);
  } else {
    // No prefix found.
    valueStr = quantity;
  }

  const value = Number(valueStr);

  if (Number.isNaN(value)) {
    throw new Error("Unknown number format.");
  }

  if (Object.prototype.hasOwnProperty.call(multipliers, multiplier)) {
    // We don't tolerate whitespace(s) separating
    // value and multiplier parts as it's confusing.
    // Number ctor is capable of handling it tho.
    if (/\s/.test(valueStr.slice(-1))) {
      throw new Error("Unknown quantity format.");
    }
    return multipliers[multiplier](value);
  }

  return value;
}

export default real;
