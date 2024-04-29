import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
// import { getApp } from "@firebase/app";
// import { getStripePayments } from "@invertase/firestore-stripe-payments";
import getStripe from "./initializeStripe";

export default async function createMonthlyCheckoutSession(uid) {
    console.log("monthly ran")
  const firestore = getFirestore();
  const createMonthlyCheckoutSessionRef = await addDoc(
    collection(firestore, "customers", uid, "checkout_sessions"),
    {
      price: "price_1PAQAiDzstqEKrnRQNg8gnzq",
      success_url: window.location.origin + "/foryou",
      cancel_url: window.location.origin + "/",
    }
  );console.log("session created", createMonthlyCheckoutSessionRef.id)
  onSnapshot(
    doc(
      firestore,
      "customers",
      uid,
      "checkout_sessions",
      createMonthlyCheckoutSessionRef.id
    ),
    async (snap) => {
        console.log("checkout session ran", snap.id)
      const { sessionId } = snap.data();
      console.log("sessionID", sessionId)
      if (sessionId) {
        console.log("redirect to checkout")
        const stripe = await getStripe();
        stripe?.redirectToCheckout({sessionId})
      }
    }
  );
}

