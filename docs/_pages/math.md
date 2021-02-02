---
title: Math
parent: Advanced Topics
---
# Math
{: .no_toc}

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## Calculation Blocks

![calculation block]({{site.baseurl}}/img/calculation.png)

All mathematical operations in Blawx need to be contained in a Calclulation block. A calculation block has
two value inputs. The first is the variable to which the numerical value of the calculation should be assigned.
The second accepts any numerical values, math operations, or aggregate operations that return a number.

## Math Operators

![math operation]({{site.baseurl}}/img/math_operator.png)

The math operator block allows you access to the basic mathematical functions of addition, subtraction,
multiplication, and division.

## Aggregates

![aggregate block]({{site.baseurl}}/img/aggregate.png)

The aggregate block allows you to do a calculation on a set of number-value results from a search question. It requires you to choose the aggregate function you want, then it requires you to choose the variable that will hold the number values you are interested in, and then it requires you to do a search that will find the relevant variables.

The block will return a Number value, as is suggested by its colour, and it can be used anywhere a number can be used, such as in a mathematical operation, or a comparison.

### Minimum
Minimum will provide you with the smallest number in the set of results. If the set of results is 1,3,5,6,6,7,8; the answer will be 1.

### Maximum
Maximum will provide you with the largest number in the set of results. If the set of results is 1,3,5,6,6,7,8; the answer will be 8.

### Count
Count will provide you with the size of the set of results. If the set of results is 1,3,5,6,6,7,8; the answer will be 7.

### Distinct Count
Distinct Count will provide you with the size of the set of results excluding duplicates. If the set of results is 1,3,5,6,6,7,8; the answer will be 6.

### Average
Average will provide you with the mean of the set of results. If the set of results is 1,3,5,6,6,7,8; the answer will be 5.142….

### Distinct Average
Distinct Average will provide you with the mean of the set of results excluding duplicates. If the set of results is 1,3,5,6,6,7,8; the answer will be 5.

### Sum
Sum will provide you with the sum of the set of results. If the set of results is 1,3,5,6,6,7,8; the answer will be 36.

### Distinct Sum
Distinct Sum will provide you with the sum of the set of results excluding duplicates. If the set of results is 1,3,5,6,6,7,8; the answer will be 30.