import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import styles from "@/styles/choosePlan.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Footer from "@/components/Footer";
import createMonthlyCheckoutSession from "@/stripe/createMonthlySession";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { getCheckoutUrl } from "@/account/stripePayment";
import { useRouter } from "next/navigation";
import { getPremiumStatus } from "@/account/getPremiumStatus";
// import { getApp } from "@firebase/app"
// import { getStripePayments } from "@invertase/firestore-stripe-payments"
// import { createCheckoutSession } from "@invertase/firestore-stripe-payments"

// const app = getApp()
//   const payments = getStripePayments(app, {
//     productsCollection: "products",
//     customersCollection: "customers",
//   })

//   const session = await createCheckoutSession(payments, {
//     price: mypriceId,
//     // success_url: "www",
//     // cancel_url: "www"
//   })
//   window.location.assign(session.url)

export default function choosePlan() {
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();

  // const user = auth.currentUser;

  const app = initFirebase();
  const auth = getAuth(app);

  const userName = auth.currentUser?.displayName;
  const email = auth.currentUser?.email;
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);

  const [activePlan, setActivePlan] = useState("yearly");

  function handlePlanChange(plan) {
    setActivePlan(plan);
  }

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [app, auth.currentUser?.uid]);

  const upgradeToMonthly = async () => {
    const priceId = "price_1PAQAiDzstqEKrnRQNg8gnzq";
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    console.log("Upgrade to Monthly");
    router.push(checkoutUrl);
  };

  const upgradeToYearly = async () => {
    const priceId = "price_1PAQAEDzstqEKrnRoqsijaTU";
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkoutUrl);
    console.log("Upgrade to Yearly");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      console.log(currentUser);
      dispatch(
        setUser({
          email: currentUser.email,
        })
      );
    });

    return unsubscribe;
  }, []);

  const itemOne =
    "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.";
  const itemTwo =
    "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.";
  const itemThree =
    "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.";
  const itemFour =
    "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.";

  return (
    <>
      <div className={styles.plan}>
        <div className={styles.planHeaderWrapper}>
          <div className={styles.planHeader}>
            <div className={styles.planTitle}>
              Get unlimited access to many amazing books to read
            </div>
            <div className={styles.planSubTitle}>
              Turn ordinary moments into amazing learning opportunities
            </div>
            <figure className={styles.planImgMask}>
              <img srcSet="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpricing-top.4d86e93a.png&w=1080&q=75"></img>
            </figure>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.container}>
            <div className={styles.planFeaturesWrapper}>
              <div>
                <figure className={styles.planFeaturesIcon}>
                  <svg
                    className={styles.svg}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2zM320 482a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h384a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320zm0 136a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h184a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320z"></path>
                  </svg>
                </figure>
                <div className={styles.planFeaturesText}>
                  <b>Key ideas in a few min</b> with many books to read
                </div>
              </div>
              <div>
                <figure className={styles.planFeaturesIcon}>
                  <svg
                    className={styles.svg}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path fill="none" d="M0 0H24V24H0z"></path>
                      <path d="M21 3v2c0 3.866-3.134 7-7 7h-1v1h5v7c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2v-7h5v-3c0-3.866 3.134-7 7-7h3zM5.5 2c2.529 0 4.765 1.251 6.124 3.169C10.604 6.51 10 8.185 10 10v1h-.5C5.358 11 2 7.642 2 3.5V2h3.5z"></path>
                    </g>
                  </svg>
                </figure>
                <div className={styles.planFeaturesText}>
                  <b>3 million</b> people growing with Summarist everyday
                </div>
              </div>
              <div>
                <figure className={styles.planFeaturesIcon}>
                  <svg
                    className={styles.svg}
                    viewBox="0 0 640 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z"></path>
                  </svg>
                </figure>
                <div className={styles.planFeaturesText}>
                  <b>Precise recommendations</b> collections curated by experts
                </div>
              </div>
            </div>

            <div className={styles.sectionTitle}>
              Choose the plan that fits you
            </div>

            <div className={styles.card}>
              <div className={styles.cardCircle}>
                <div className={styles.cardDot}></div>
              </div>
              <div>
                <div
                  className={`${activePlan === "yearly" ? "cardDot" : ""}`}
                  onClick={() => handlePlanChange("yearly")}
                >
                  <div className={styles.cardTitle}>Premium Plus Yearly</div>
                  <div className={styles.cardPrice}>$99.99/year</div>
                  <div className={styles.cardText}>
                    7-day free trail included
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.cardSeperator}>
              <div>or</div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardCircle}>
                <div className={styles.cardDot}></div>
              </div>
              <div>
                <div className={`${activePlan === "monthly" ? "cardDot" : ""}`} onClick={() => handlePlanChange("monthly")}>
                  <div className={styles.cardTitle}>Premium Monthly</div>
                  <div className={styles.cardPrice}>$9.99/month</div>
                  <div className={styles.cardText}>No trail included</div>
                </div>
              </div>
            </div>

            <div className={styles.cardCta}>
              <span>
                <button
                  onClick={() => upgradeToMonthly()}
                  className={styles.btn}
                >
                  <span>
                    {activePlan === "yearly"
                      ? "Start your free 7-day trial"
                      : "Start your Annual Membership"}
                  </span>
                </button>
                <br />
              </span>
              <div className={styles.disclaimer}>
                Cancel your trial at any time before it ends, and you won’t be
                charged.
              </div>
            </div>

            {/* <div>
              <div className={styles.accordionCard}>
                <div className={styles.accordionHeader}>
                  <div className={styles.accordionTitle}>How does the free 7-day trial work?</div>
                  <svg className="accordion__icon accordion__icon--rotate" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path>
                  </svg>
                </div>
                <div className={styles.collapse && styles.show}>
                  <div className={styles.accordionBody}>
                  Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.
                  </div>
                </div>
              </div>
            </div> */}

            <Accordion
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    height: "auto",
                    transition: {
                      height: {
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        duration: 1,
                      },
                      opacity: {
                        easings: "ease",
                        duration: 1,
                      },
                    },
                  },
                  exit: {
                    y: -10,
                    opacity: 0,
                    height: 0,
                    transition: {
                      height: {
                        easings: "ease",
                        duration: 0.25,
                      },
                      opacity: {
                        easings: "ease",
                        duration: 0.3,
                      },
                    },
                  },
                },
              }}
            >
              <AccordionItem
                key="1"
                aria-label="How does the free 7-day trial work?"
                title="How does the free 7-day trial work?"
                indicator={({ isOpen }) =>
                  isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />
                }
                className={styles.accordionCard && styles.accordionHeader}
              >
                {itemOne}
              </AccordionItem>

              <AccordionItem
                key="2"
                aria-label="Can I switch subscriptions from monthly to yearly, or yearly to monthly?"
                title="Can I switch subscriptions from monthly to yearly, or yearly to monthly?"
                indicator={({ isOpen }) =>
                  isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />
                }
                className={styles.accordionCard && styles.accordionHeader}
              >
                {itemTwo}
              </AccordionItem>

              <AccordionItem
                key="3"
                aria-label="What's included in the Premium plan?"
                title="What's included in the Premium plan?"
                indicator={({ isOpen }) =>
                  isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />
                }
                className={styles.accordionCard && styles.accordionHeader}
              >
                {itemThree}
              </AccordionItem>

              <AccordionItem
                key="4"
                aria-label="Can I cancel during my trail or subscription?"
                title="Can I cancel during my trail or subscription?"
                indicator={({ isOpen }) =>
                  isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />
                }
                className={styles.accordionCard && styles.accordionHeader}
              >
                {itemFour}
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
