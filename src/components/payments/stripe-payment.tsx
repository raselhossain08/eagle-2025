// DEPRECATED: This component has been replaced with stripe-elements-payment.tsx
// Please use StripeElementsPayment instead for PCI compliance

export { StripeElementsPayment as StripePayment } from "./stripe-elements-payment";

// The old manual card collection implementation has been removed
// due to Stripe's requirement to use Elements for PCI compliance.
//
// For reference:
// - Old implementation: Manual card input fields (DEPRECATED)
// - New implementation: Stripe Elements (PCI compliant)
//
// Update your imports to use:
// import { StripeElementsPayment } from "./stripe-elements-payment";
