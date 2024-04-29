import { loadStripe, Stripe } from "@stripe/stripe-js"

let stripePromise = null
const initializeStripe = async () => {
    if (!stripePromise) {
        stripePromise = await loadStripe("pk_test_51PAP8QDzstqEKrnR7Bgr9b2X4nsjoovVb22OMNB07KvYNo6CE3OcWEiIG5hoazVnrF32C70l4gaw8vyo5BtNzURE00kueYESTO")
    }
    return stripePromise
}

export default initializeStripe
