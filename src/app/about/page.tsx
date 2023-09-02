import {
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { NavLink, VisuallyHiddenHeading } from 'src/components';
import { site } from 'src/constants';
import styles from './about.module.scss';

const inter = Inter({ subsets: ['latin'] });

export default function About() {
  return (
    <>
      <article className={styles.container}>
        <VisuallyHiddenHeading>關於我</VisuallyHiddenHeading>
        <section className={styles.profile}>
          <Image
            priority
            src="/avatar.jpg"
            alt="Avatar"
            width={120}
            height={120}
          />
          <div>
            <p className={clsx(styles.greeting, inter.className)}>
              {"Hi, I'm Ming-jun Lu."}
            </p>
            <ul className={styles.socialLinkList}>
              <li>
                <NavLink
                  href="https://github.com/mingjunlu"
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.socialLink}
                >
                  <FontAwesomeIcon icon={faGithub} />
                  <span>GitHub</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="https://www.facebook.com/mingchun.lu"
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.socialLink}
                >
                  <FontAwesomeIcon icon={faFacebook} />
                  <span>Facebook</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </section>
        <section className={styles.content}>
          <p>
            2018 年 8 月開始自學 web 前端開發，自 2020 年 6 月起在
            <NavLink
              href="https://www.gss.com.tw"
              target="_blank"
              rel="noreferrer noopener"
            >
              叡揚資訊
            </NavLink>
            擔任前端工程師至今。關於我的轉職經歷可以參考：
            <NavLink href="/blog/how-i-became-a-front-end-web-developer-in-2020">
              2020 非本科轉職前端工程師心得
            </NavLink>
            。
          </p>
          <p>我喜歡和別人分享學到的東西。例如：</p>
          <ul>
            <li>
              <NavLink href="/blog/how-to-ask-for-help">
                讓人一看就想回覆的誠懇提問術
              </NavLink>
            </li>
            <li>
              <NavLink href="/blog/lazy-loading-images-with-intersection-observer">
                透過 lazy loading 延遲載入圖片
              </NavLink>
            </li>
            <li>
              <NavLink href="/blog/image-optimization-using-webp">
                使用 WebP 格式減少圖片載入時間
              </NavLink>
            </li>
            <li>
              <NavLink href="/blog/window-onscroll-vs-document-body-onscroll">
                你的 onscroll 不是你的 onscroll
              </NavLink>
            </li>
          </ul>
          <p>對於跟生活有關的應用，我充滿熱忱。像是我寫了：</p>
          <ul>
            <li>
              <NavLink
                href="https://github.com/mingjunlu/findmasks-frontend"
                target="_blank"
                rel="noreferrer noopener"
              >
                口罩地圖
              </NavLink>
            </li>
            <li>
              <NavLink href="/blog/monitor-laptop-battery-with-python">
                讓 Python 自動提醒你幫電腦充電
              </NavLink>
            </li>
          </ul>
          <p>如果你是初學者的話，可以參考這幾篇文章：</p>
          <ul>
            <li>
              <NavLink href="/blog/build-a-navbar-with-html-and-css-part-1">
                用 HTML 與 CSS 製作簡易導覽列（上）
              </NavLink>
            </li>
            <li>
              <NavLink href="/blog/build-a-navbar-with-html-and-css-part-2">
                用 HTML 與 CSS 製作簡易導覽列（中）
              </NavLink>
            </li>
            <li>
              <NavLink href="/blog/build-a-navbar-with-html-and-css-part-3">
                用 HTML 與 CSS 製作簡易導覽列（下）
              </NavLink>
            </li>
            <li>
              <NavLink href="/blog/why-use-functions-in-python">
                Python 初學疑惑：為什麼要用函式？
              </NavLink>
            </li>
            <li>
              <NavLink href="/blog/why-use-functions-in-python">
                Python 初學疑惑：For 迴圈怎麼用？
              </NavLink>
            </li>
          </ul>
          <p>
            想聯繫我的話，請透過 email：
            <NavLink href="mailto:coders.ersatz-0a@icloud.com">
              coders.ersatz-0a@icloud.com
            </NavLink>
            。
          </p>
        </section>
      </article>
    </>
  );
}

export function generateMetadata(): Metadata {
  const title = `About | ${site.name}`;
  return {
    title,
    openGraph: {
      url: '/about',
      title,
    },
  };
}
