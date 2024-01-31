import { stripe } from "@/lib/stripe";
import CheckoutService from "@/features/Shop/services/checkout.service";

export default async function PaymentPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await CheckoutService.getOrder({
    paymentIntentId: params.id,
  });
  const paymentIntent = await stripe.paymentIntents.retrieve(params.id);
  const paymentMethod = await stripe.paymentMethods.retrieve(
    paymentIntent.payment_method as string,
  );

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-14">PaymentPage</div>
  );
}
