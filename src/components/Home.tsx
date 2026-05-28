import styled from 'styled-components';

const Home = () => {
  return <HomeBase></HomeBase>;
};
export default Home;

const HomeBase = styled.main`
  position: relative;
  height: calc(var(--vh, 1vh) * 100);
  overflow-y: scroll;
  border: 1px solid black;
`;
