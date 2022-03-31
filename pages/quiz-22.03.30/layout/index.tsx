// 이모션 임포트
import styled from "@emotion/styled";
import { ReactNode } from "react";

// 레이아웃 임포트
import LayoutBannerPage from "./banner";
import LayoutFooterPage from "./footer";
import LayoutHeaderPage from "./header";
import LayoutNavigationPage from "./navigation";
import LayoutSidebarPage from "./sidebar";

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const Body = styled.div`
  height: 1000px;
  width: calc(100% - 500px);
`;

interface ILayoutProps {
  children: ReactNode;
}

export default function Layout(props: ILayoutProps) {
  return (
    <>
      <LayoutHeaderPage></LayoutHeaderPage>
      <LayoutBannerPage></LayoutBannerPage>
      <LayoutNavigationPage></LayoutNavigationPage>
      <Wrap>
        <LayoutSidebarPage></LayoutSidebarPage>
        <Body>{props.children}</Body>
      </Wrap>
      <LayoutFooterPage></LayoutFooterPage>
    </>
  );
}
