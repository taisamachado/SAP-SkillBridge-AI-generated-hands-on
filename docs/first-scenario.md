# First Scenario: Billing Blocked by Credit Management

## Scenario Title

Billing Blocked by Credit Management

## Training Goal

Help a beginner learner understand how to investigate a billing failure in SAP by following a guided sequence of transactions and interpreting the business meaning of each result.

## Business Context

A customer reports that billing cannot be completed for sales document **1000234**.

The current business status is:

| Sales Document | Logistics Status | Billing Status |
| --- | --- | --- |
| 1000234 | Completed | Blocked for credit review |

The learner must determine whether the issue is caused by logistics execution or by credit management controls.

## Initial Problem

The learner starts by reproducing the issue in **VF01** and sees that billing cannot be created.

This teaches an important beginner lesson:

- first reproduce the issue,
- then identify the blocking domain,
- then validate the business context before deciding what action is appropriate.

## Guided Investigation Path

### 1. Use `VF01`

Purpose:

- reproduce the billing issue,
- confirm that the problem is real,
- observe the first blocking clue.

Expected learning outcome:

- billing creation fails,
- logistics is already complete,
- the learner should suspect a financial or credit-related block.

### 2. Use `VKM3`

Purpose:

- analyze blocked documents in credit management,
- confirm whether the sales document is under credit review.

Expected learning outcome:

- the document appears in credit review,
- the learner understands that billing is blocked by credit management,
- the learner begins to think about governance and release validation.

### 3. Use `VA03`

Purpose:

- review the sales document context,
- explain the issue in business language.

Expected learning outcome:

- the learner confirms that the issue is not a logistics failure,
- the learner can explain that billing is blocked because the document is pending credit review,
- the learner understands the difference between technical investigation and business explanation.

## SAP Transactions Involved

- `VF01` — Create Billing Document
- `VKM3` — Release Sales Documents for Credit Management Review
- `VA03` — Display Sales Document

## Success Criteria

The scenario is solved when the learner can explain all of the following:

1. Billing failed in `VF01`.
2. The root cause is a credit management block identified in `VKM3`.
3. The sales document context in `VA03` confirms that logistics is complete.
4. A release decision should only happen after validating governance-relevant checks.

## Learning Objectives

By completing this scenario, the learner should be able to:

- investigate a billing issue in the correct sequence,
- distinguish logistics completion from financial release readiness,
- understand the role of credit management in Order-to-Cash,
- explain SAP findings in plain business language,
- build confidence using SAP transactions step by step.

## Why This Scenario Is Beginner-Friendly

This scenario is intentionally designed to reduce learner anxiety.

It does that by:

- giving a clear first step,
- limiting the number of transactions,
- explaining why each transaction matters,
- using Bob coaching messages in plain English,
- focusing on reasoning instead of memorization.

## Recommended Next Scenarios

After this scenario, the next beginner-friendly scenarios should be:

1. Stock divergence blocking delivery
2. Delivery completed but billing still blocked
3. Customer master data issue affecting sales processing
4. Fiscal reconciliation issue in FI