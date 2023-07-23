export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME,
  url: process.env.NEXT_PUBLIC_SITE_URL,
};

export const breakpoints = {
  tabletMinWidth: 550,
  laptopMinWidth: 1100,
  desktopMinWidth: 1500,
};

export const mediaQueries = {
  tabletAndWider: `(min-width: ${breakpoints.tabletMinWidth}px)`,
  laptopAndWider: `(min-width: ${breakpoints.laptopMinWidth}px)`,
  desktopAndWider: `(min-width: ${breakpoints.desktopMinWidth}px)`,
};
