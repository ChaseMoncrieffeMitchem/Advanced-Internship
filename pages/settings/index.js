import React, { useEffect, useState } from "react";
import { getPremiumStatus } from "@/account/getPremiumStatus";
import { stripePayment } from "@/account/stripePayment";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import Sidebar from "@/components/Sidebar";
import styles from "@/styles/Settings.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import LoginModal from "@/components/modals/LoginModal";
import { openLoginModal } from "@/redux/modalSlice";
import SearchBar from "@/components/SearchBar";

export default function settings() {
  const [isPremium, setIsPremium] = useState(false);

  const app = initFirebase();
  const auth = getAuth(app);
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.email);

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
    : "Standard Subscription";

  const memberButton = isPremium
    ? "Manage Premium Stuff"
    : "Upgrade to Premium";

  return (
    <>
      <div>
        <div className="wrapper"></div>
        <div className="search__background"></div>
        <SearchBar />
        <Sidebar />
        <div className="container">
          <div className="row">
            <div className={styles.title}>Settings</div>
            {user ? (
              <>
                <div className={styles.content}>
                  <div className={styles.subtitle}>Your Subscription Plan</div>
                  <div className={styles.text}>{statusPanel}</div>
                  {isPremium ? (
                    ""
                  ) : (
                    <Link href="/choose-plan" className={styles.btn}>
                      {memberButton}
                    </Link>
                  )}
                </div>
                <div className={styles.content}>
                  <div className={styles.subtitle}>Email</div>
                  <div className={styles.text}>{auth.currentUser?.email}</div>
                </div>{" "}
              </>
            ) : (
              <div className={styles.loginWrapper}>
                <img
                  alt="login"
                  srcset="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogin.e313e580.png&w=1080&q=75"
                  src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogin.e313e580.png&w=1080&q=75"
                  width="1033"
                  height="712"
                  decoding="async"
                  data-nimg="1"
                  loading="lazy"
                />
                <div className={styles.loginText}>
                  Log in to your account to see your details
                </div>
                <button className={styles.btn} onClick={() => dispatch(openLoginModal())}>
                  Login
                  <LoginModal />
                </button>
              </div>
            )}
          </div>
        </div>{" "}
        {memberButton}
      </div>
    </>
  );
}
