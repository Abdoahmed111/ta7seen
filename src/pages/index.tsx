
 

import Navbar from "@/components/layouts/Navbar";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>تحصين الٍران | بالحصون الخمسة</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        class="flex min-h-screen w-full flex-col items-end justify-start font-elmessiri"
        dir="rtl"
      >
        <Navbar />

        {/* Hero Section */}
        <div class="hero min-h-screen bg-base-200">
          <div class="hero-content text-center">
            <div class="max-w-2xl">
              <h1 class="text-4xl font-bold md:text-7xl">تحصين القران</h1>
              <p class="text-md py-6 md:text-xl">
                <span class="text-primary">تحصين القرآن</span> مساعدة لحفظة
                وحافظات القرآن في تنظيم أورادهم اليومية. يقدم هذا الموقع جدول
                الورد الأسبوعي <span class="text-warning">للحصون الخمسة</span>،
                يمكن للحافظ والحافظة للقرآن تخطي التحديات المرتبطة بإعداد الجدول
                وتنظيمه يدويًا، وتركز جهودهم على الحفظ والاستماع والمراجعة بشكل
                فعال.
              </p>
              <button class="btn-primary btn">ابدأ الآن</button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer class="footer mx-auto items-center justify-center bg-neutral p-4 text-neutral-content">
          <div class="items-center">
            <p>
              حقوق النشر محفوظة © 2022 تم تطويره بواسطة
              <a
                target="_blank"
                class="mx-1 text-warning"
                href="https://www.linkedin.com/in/abdelrahman114/"
              >
                عبدالرحمن أحمد عباس
              </a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Home;
