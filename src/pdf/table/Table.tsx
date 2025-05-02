import { View, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: "column",
  },
});

export interface TableProps extends React.PropsWithChildren<unknown> {
  style?: Style;
}

export function Table(props: TableProps = {}) {
  const { style, children } = props;
  return <View style={{ ...styles.root, ...style }}>{children}</View>;
}
