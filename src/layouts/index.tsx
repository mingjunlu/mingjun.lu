import styled from 'styled-components';

const ErrorScreen = styled.main`
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
  padding: 18px 20px;

  @supports (height: 100dvh) {
    height: 100dvh;
  }
`;

const Layout = {
  ErrorScreen,
};

export default Layout;
