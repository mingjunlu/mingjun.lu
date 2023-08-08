import {
  faFacebook,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import styled from 'styled-components';
import { Header, Metadata, NavLink } from 'src/components';
import { mediaQueries as queries } from 'src/constants';
import { site } from 'src/constants';

const inter = Inter({ subsets: ['latin'] });

export default function About() {
  return (
    <>
      <Metadata title="About" url={`${site.url}/about`} />
      <Container>
        <Header />
        <Main>
          <Profile>
            <Image
              priority
              src="/avatar.jpg"
              alt="Avatar"
              width={120}
              height={120}
            />
            <div>
              <Greeting className={inter.className}>
                {"Hi, I'm Ming-jun Lu."}
              </Greeting>
              <SocialLinkGroup>
                <li>
                  <SocialLink
                    href="https://github.com/mingjunlu"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                    <span>GitHub</span>
                  </SocialLink>
                </li>
                <li>
                  <SocialLink
                    href="https://www.facebook.com/mingchun.lu"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FontAwesomeIcon icon={faFacebook} />
                    <span>Facebook</span>
                  </SocialLink>
                </li>
              </SocialLinkGroup>
            </div>
          </Profile>
          <Body>
            <VisuallyHiddenHeading>關於我</VisuallyHiddenHeading>
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
          </Body>
        </Main>
      </Container>
    </>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 18px 20px;

  @supports (min-height: 100dvh) {
    min-height: 100dvh;
  }
  @media ${queries.tabletAndWider} {
    padding: 60px;
    max-width: 754px;
    margin: 0 auto;
  }
`;
const Main = styled.article`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 42px 0;

  @media ${queries.tabletAndWider} {
    gap: 40px;
    font-size: 18px;
    line-height: 1.8;
    padding: 54px 0;
    margin: 0 auto;
  }
`;
const Profile = styled.section`
  text-align: center;

  @media ${queries.tabletAndWider} {
    display: flex;
    gap: 30px;
    text-align: left;
  }

  > img {
    margin: 0 auto;
    border-radius: 6px;

    @media ${queries.tabletAndWider} {
      flex: 0 0 auto;
      margin: 0;
    }
  }
  > div {
    @media ${queries.tabletAndWider} {
      flex: 1 1 auto;
    }
  }
`;
const Greeting = styled.p`
  font-size: 24px;
  line-height: normal;
  font-weight: 600;
  margin-top: 16px;

  @media ${queries.tabletAndWider} {
    margin-top: 36px;
  }
`;
const SocialLinkGroup = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 0;
  margin: 30px 0 0 0;
  list-style-type: none;

  @media ${queries.tabletAndWider} {
    justify-content: flex-start;
    gap: 40px;
    margin-top: 20px;
  }
`;
const SocialLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: initial;

  &:hover {
    text-decoration: none;
  }

  @media ${queries.tabletAndWider} {
    gap: 12px;
  }

  > svg {
    width: 20px;
    height: 20px;

    @media ${queries.tabletAndWider} {
      width: 30px;
      height: 30px;
    }
  }
  > span {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;
const Body = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;

  ${NavLink} {
    display: inline;
    text-decoration: underline;
  }
`;
const VisuallyHiddenHeading = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  border: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
`;
