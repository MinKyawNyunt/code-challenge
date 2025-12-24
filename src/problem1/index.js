/**
 * Solution 1: Iterative approach using a for loop
 * 
 * @param {number} n - Any integer to sum up to
 * @returns {number} The summation from 1 to n
 * @time O(n) - Linear time complexity
 * @space O(1) - Constant space complexity
 */
var sum_to_n_a = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

/**
 * Solution 2: Mathematical formula - Gauss's formula
 * 
 * @param {number} n - Any integer to sum up to
 * @returns {number} The summation from 1 to n using formula n(n+1)/2
 * @time O(1) - Constant time complexity
 * @space O(1) - Constant space complexity
 */
var sum_to_n_b = function(n) {
    return (n * (n + 1)) / 2;
};

/**
 * Solution 3: Recursive approach
 * 
 * @param {number} n - Any integer to sum up to
 * @returns {number} The summation from 1 to n using recursion
 * @time O(n) - Linear time complexity
 * @space O(n) - Linear space complexity due to call stack
 */
var sum_to_n_c = function(n) {
    if (n <= 0) return 0;
    return n + sum_to_n_c(n - 1);
};
