
// modify data structure as needed, specify rounding precision 
export function calculateAverage(values: number[], precision: number): number {
    if (values.length === 0) return 0;
    let total = values.reduce((sum, value) => sum + value, 0);
    let average = total / values.length;
    return parseFloat(average.toFixed(precision));
}
  
  export function calculateMedian(values: number[]): number {
    const sortedValues = values.slice().sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);

    return sortedValues.length % 2 !== 0
        ? sortedValues[mid]
        : (sortedValues[mid - 1] + sortedValues[mid]) / 2;
}

export function calculateStandardDeviation(values: number[], precision: number): number {
    if (values.length === 0) return 0;
    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    return parseFloat(Math.sqrt(variance).toFixed());
}

