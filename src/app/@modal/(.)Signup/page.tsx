"use client"
import Signup from "@/src/components/signUp/page"
import styles from "./style.module.css"
import { useRouter } from "next/navigation"

export default function page() {
  const router = useRouter()
  return (
   
      <div className={styles["Form-wrap"]}  onClick={()=>router.back()}>
        <Signup modal="inter-modal" />
      </div>
  )
}
