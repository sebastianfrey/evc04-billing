import { View, StyleSheet, Text } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    fontSize: 12,
  },
});

export interface TableCellProps extends React.PropsWithChildren<unknown> {
  style?: Style;
  textStyle?: Style;
}

export function TableCell(props: TableCellProps = {}) {
  const { style, textStyle = {}, children } = props;
  if (style?.textAlign === 'right') {
    textStyle.flexFlow = 1;
    textStyle.alignSelf = 'flex-end';
  }
  return (
    <View style={{ ...styles.root, ...style }}>
      <Text style={{ ...styles.text, ...textStyle }}>{children}</Text>
    </View>
  );
}
