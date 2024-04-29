// "use client";
// const firebase = require("firebase/app");
// const auth = require("firebase/auth");
// const firestore = require("firebase/firestore");
// const functions = require("firebase/functions");

// exports.getCheckoutUrl = async (app, priceId) => {
//   const authInstance = auth.getAuth(app);
//   const userId = authInstance.currentUser?.uid;
//   if (!userId) throw new Error("User is not authenticated");

//   const db = firestore.getFirestore(app);
//   const checkoutSessionRef = firestore.collection(
//     db,
//     "customers",
//     userId,
//     "checkout_sessions"
//   );

//   const docRef = await firestore.addDoc(checkoutSessionRef, {
//     price: priceId,
//     success_url: window.location.origin,
//     cancel_url: window.location.origin,
//   });

//   return new Promise((resolve, reject) => {
//     const unsubscribe = firestore.onSnapshot(docRef, (snap) => {
//       const { error, url } = snap.data();
//       if (error) {
//         unsubscribe();
//         reject(new Error(`An error occurred: ${error.message}`));
//       }
//       if (url) {
//         console.log("Stripe Checkout URL:", url);
//         unsubscribe();
//         resolve(url);
//       }
//     });
//   });
// };

// exports.getPortalUrl = async (app) => {
//   const authInstance = auth.getAuth(app);
//   const user = authInstance.currentUser;

//   let dataWithUrl;
//   try {
//     const functionsInstance = functions.getFunctions(app, "us-central1");
//     const functionRef = functions.httpsCallable(
//       functionsInstance,
//       "ext-firestore-stripe-payments-createPortalLink"
//     );
//     const { data } = await functionRef({
//       customerId: user?.uid,
//       returnUrl: window.location.origin,
//     });

//     dataWithUrl = data;
//     console.log("Reroute to Stripe portal: ", dataWithUrl.url);
//   } catch (error) {
//     console.error(error);
//   }

//   return new Promise((resolve, reject) => {
//     if (dataWithUrl.url) {
//       resolve(dataWithUrl.url);
//     } else {
//       reject(new Error("No url returned"));
//     }
//   });
// };