import React, { useEffect, useState } from "react";
import { getPremiumStatus } from "@/account/getPremiumStatus";
import { stripePayment } from "@/account/stripePayment"
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import Sidebar from "@/components/Sidebar";
import styles from "@/styles/Settings.module.css"
import Link from "next/link"

export default function settings() {
  const [isPremium, setIsPremium] = useState(false);

  const app = initFirebase();
  const auth = getAuth(app);

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [app, auth.currentUser?.uid]);

  const statusPanel = isPremium
  ? "Premium Subscription"
  : "Standard Subsription";

  const memberButton = isPremium ? "Manage Premium Stuff" : "Upgrade to Premium"

  return (
    <>
    
      <div>
        <div className="wrapper"></div>
        <div className="search__background"></div>
        <Sidebar />
        <div className="container">
            <div className="row">
                <div className={styles.title}>Settings</div>
                <div className={styles.content}>
                    <div className={styles.subtitle}>Your Subscription Plan</div>
                    <div className={styles.text}>{statusPanel}</div>
                    {isPremium ? "" : <Link href="/choose-plan" className={styles.btn}>{memberButton}</Link>}
                </div>
                <div className={styles.content}>
                    <div className={styles.subtitle}>Email</div>
                    <div className={styles.text}>{auth.currentUser?.email}</div>
                </div>
            </div>
        </div>
        {" "}
        {memberButton}
      </div>
    </>
  );
}
