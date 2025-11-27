export const paths = {
  home: {
    getHref: () => '/',
  },

  app: {
    root: {
      getHref: () => "/",
    },
    stylists: {
      getHref: () => "/stylists",
    },
    bookings: {
      getHref: () => "/bookings",
    },
    reservation: {
      getHref: () => "/reservation",
    },
  }
};