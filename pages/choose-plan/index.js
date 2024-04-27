import React from 'react'
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import styles from "@/styles/choosePlan.module.css"
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io";

export default function choosePlan() {
  
  const itemOne = "Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial."
  const itemTwo = "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option."
  const itemThree = "Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle."
  const itemFour = "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day."
  
  return (
    <>
      <Accordion motionProps={{
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
      }}>
        <AccordionItem key="1" aria-label="How does the free 7-day trial work?" title="How does the free 7-day trial work?" indicator={({ isOpen }) => (isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />)}>
          {itemOne}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Can I switch subscriptions from monthly to yearly, or yearly to monthly?" title="Can I switch subscriptions from monthly to yearly, or yearly to monthly?" indicator={({ isOpen }) => (isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />)}>
          {itemTwo}
        </AccordionItem>
        <AccordionItem key="3" aria-label="What's included in the Premium plan?" title="What's included in the Premium plan?" indicator={({ isOpen }) => (isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />)}>
          {itemThree}
        </AccordionItem>
        <AccordionItem key="4" aria-label="Can I cancel during my trail or subscription?" title="Can I cancel during my trail or subscription?" indicator={({ isOpen }) => (isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />)}>
          {itemFour}
        </AccordionItem>
      </Accordion>
    </>
  )
}
