import { css } from "styled-components";

const CUSTOM_CONF = "af-awesomegrid";
export const DIMENSIONS = ["xs", "sm", "md", "lg", "xl", "xxl"];
export const BASE_CONF = {
  mediaQuery: "only screen",
  columns: {
    xs: 4,
    sm: 4,
    md: 8,
    lg: 8,
    xl: 12,
    xxl: 12,
  },
  gutterWidth: {
    xs: 1,
    sm: 1.5,
    md: 1.5,
    lg: 1.5,
    xl: 2,
    xxl: 2,
  },
  paddingWidth: {
    xs: 1.5,
    sm: 1.75,
    md: 1.75,
    lg: 1.75,
    xl: 2.5,
    xxl: 2.5,
  },
  container: {
    xs: "full", // 'full' = max-width: 100%
    sm: "full", // 'full' = max-width: 100%
    md: "full", // 'full' = max-width: 100%
    lg: "full", // max-width: 1440px
    xl: "full", // max-width: 1440px
    xxl: 120, // max-width: 1920px
  },
  breakpoints: {
    xs: 1, //  16px
    sm: 40, // 640px
    md: 64, // 1024px
    lg: 80, // 1280px
    xl: 90, // 1440px
    xxl: 120, // 1920px
  },
};

const configs = [];
const hasCustomConf = (props) =>
  JSON.stringify((props.theme && props.theme[CUSTOM_CONF]) || {});
const resolveConfig = (props) => {
  const themeConf = (props.theme && props.theme[CUSTOM_CONF]) || {};

  const conf = {
    ...BASE_CONF,
    ...themeConf,
  };

  conf.media = Object.keys(conf.breakpoints).reduce((media, breakpoint) => {
    const breakpointWidth = conf.breakpoints[breakpoint];
    media[breakpoint] = makeMedia(
      [
        conf.mediaQuery,
        breakpointWidth >= 0 && `(min-width: ${breakpointWidth}rem)`,
      ]
        .filter(Boolean)
        .join(" and ")
    );
    return media;
  }, {});

  return conf;
};

export default function config(props = {}) {
  const customConf = hasCustomConf(props);
  if (configs[0] === customConf) {
    return configs[1];
  }

  const conf = resolveConfig(props);

  configs[0] = customConf;
  configs[1] = conf;

  return conf;
}

function makeMedia(media) {
  return (...args) => css`
    @media ${media} {
      ${css(...args)}
    }
  `;
}
