import { ReactElement, ReactNode } from 'react';

interface ThemeConfigPros {
  children: ReactNode;
}

const ThemeConfig = (props: ThemeConfigPros): ReactElement => {
  const { children } = props;

  return <>{children}</>;
};

export default ThemeConfig;
