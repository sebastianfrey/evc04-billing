import { View, StyleSheet } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: "column",
  },
});

export interface TableBodyProps extends React.PropsWithChildren<unknown> {
  style?: Style;
}

export function TableBody(props: TableBodyProps = {}) {
  const { style, children } = props;
  return <View style={{ ...styles.root, ...style }}>{children}</View>;
}
