// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  // Get the cart total from the function input, and return early if it's below 100
  const cartTotal = parseFloat(input.cart.cost.totalAmount.amount ?? "0.0");
  console.log(input.cart);
  const walletBalance = parseFloat(input?.cart?.buyerIdentity?.customer?.walletBalance?.value ?? "0.0");
  const walletBalanceCache = parseFloat(input?.cart?.buyerIdentity?.customer?.walletBalanceCache?.value ?? "0.0");
  const hasNewWalletTransactionTag = input?.cart?.buyerIdentity?.customer?.hasTags[0].hasTag;

  let hidePaymentMethod;
  if (hasNewWalletTransactionTag) {
    if (walletBalanceCache < cartTotal) {
      // Find the payment method to hide
    hidePaymentMethod = input.paymentMethods
    .find(method => method.name.includes("Wallet"));
  }

  } else if (walletBalance < cartTotal) {
    // Find the payment method to hide
  hidePaymentMethod = input.paymentMethods
  .find(method => method.name.includes("Wallet"));
}
  



  if (!hidePaymentMethod) {
    return NO_CHANGES;
  }

  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
  return {
    operations: [{
      hide: {
        paymentMethodId: hidePaymentMethod.id
      }
    }]
  }
}