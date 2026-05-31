import "styled-components";
import type { Theme } from "./src/config/theme";

declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}
