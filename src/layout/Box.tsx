/* *****************************************************************************
 *
 * Copyright (c) 2025 by M.O.S.S. Computer Grafik Systeme GmbH
 *                        Hohenbrunner Weg 13
 *                        D-82024 Taufkirchen
 *                        http://www.moss.de
 *
 * Created: 14.04.2025
 * Author: sfrey
 *
 *******************************************************************************
 */

export interface BoxProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

export function Box(props: BoxProps) {
  return <div {...props}></div>;
}
