"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/home.module.css";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.navbar}>
        <Link href={"/Home"} className={styles.logobar}>
          <Image src="/logo.png" width={40} height={40} alt="logo" />
          <div className={styles.logoText}>duJoy</div>
        </Link>
        <div className={`${styles.navitems}`}>
          <Link href="/Imagen" className={styles.navlist}>
            Imagen
          </Link>
          <Link href="/QA" className={styles.navlist}>
            Q/A
          </Link>
          <Link href="/Chat" className={styles.navlist}>
            Chat
          </Link>
          <Link href="/Rekog" className={styles.navlist}>
            Rekog
          </Link>
          <UserButton />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link href="/Contact">Contact Us</Link>
          </button>
        </div>
      </div>
      <div className={`${styles.herosection} mt-20`}>
        <div className={styles.herocontent}>
          <div className={styles.heroheading}>
            <h1 className={styles.h1}>
              <Typewriter
                words={["What is EduJoy", "Gamified LMS", "AI Powered", "Fun to Learn"]}
                loop={1000}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
          </div>
          <div className={styles.wrapper}>
            <p className={`${styles.heroheading} ${styles.p}`}>
              EduJoy is a platform where you can learn the latest technologies
              in the industry. It makes learning as fun as gaming and it has
              integrated ai tools to make learning more interactive.
            </p>
            <Link href="/Courses/html5">
              <button className={styles.btnpink}>Select Logo and Learn</button>
            </Link>
          </div>
        </div>
        <div
          className={cn(
            `flex flex-wrap w-[600px] gap-6 p-3 ml-5 ${styles.heroimg}`
          )}
        >
          <Link href="/Courses/html5">
            <Image
              src="/icons/html5.svg"
              width={90}
              height={90}
              alt="html5"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/css3">
            <Image
              src="/icons/css3.svg"
              width={90}
              height={90}
              alt="css3"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/javascript">
            <Image
              src="/icons/javascript.svg"
              width={90}
              height={90}
              alt="javascript"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/typescript">
            <Image
              src="/icons/typescript.svg"
              width={90}
              height={90}
              alt="typescript"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/mongodb">
            <Image
              src="/icons/mongodb.svg"
              width={90}
              height={90}
              alt="mongodb"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/reactjs">
            <Image
              src="/icons/reactjs.svg"
              width={90}
              height={90}
              alt="reactjs"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/express">
            <Image
              src="/icons/express.svg"
              width={90}
              height={90}
              alt="express"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/tailwindcss">
            <Image
              src="/icons/tailwindcss.svg"
              width={90}
              height={90}
              alt="tailwindcss"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/nextjs">
            <Image
              src="/icons/nextjs.svg"
              width={90}
              height={90}
              alt="nextjs"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/azure">
            <Image
              src="/icons/azure.svg"
              width={90}
              height={90}
              alt="azure"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/devops">
            <Image
              src="/icons/devops.svg"
              width={90}
              height={90}
              alt="devops"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/github">
            <Image
              src="/icons/github.svg"
              width={90}
              height={90}
              alt="github"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/git">
            <Image
              src="/icons/git.svg"
              width={90}
              height={90}
              alt="git"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/docker">
            <Image
              src="/icons/docker.svg"
              width={90}
              height={90}
              alt="docker"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/graphql">
            <Image
              src="/icons/graphql.svg"
              width={90}
              height={90}
              alt="graphql"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
          <Link href="/Courses/kubernetes">
            <Image
              src="/icons/kubernetes.svg"
              width={90}
              height={90}
              alt="graphql"
              className="transition ease-in-out duration-500 hover:scale-110"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
