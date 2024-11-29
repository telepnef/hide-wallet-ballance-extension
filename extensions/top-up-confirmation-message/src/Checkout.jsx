import {
  Banner,
  reactExtension,
  useCartLines,
} from '@shopify/ui-extensions-react/checkout';

const thankYouBlock = reactExtension(
  'purchase.thank-you.block.render',
  () => <Extension />,
);
export { thankYouBlock };

const orderStatusBlock = reactExtension(
  'customer-account.order-status.block.render',
  () => <Extension />,
);
export { orderStatusBlock };
function Extension() {

  const items = useCartLines();

  const showBanner = items.some(lineItem => lineItem.merchandise.product.productType === 'Top Up');
console.log(items);
  return (
    showBanner ? <Banner title="Top Up in progress.">
      Please allow a few minutes for Al Ain Water to process your Top Up
    </Banner> : ''
  );
}