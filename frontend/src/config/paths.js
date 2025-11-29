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
      getHref: () => "/booking",
    },
    reservation: {
      getHref: () => "/reservation",
    },
    success: {
      getHref: () => "/success",
    },
    reservationList: {
      getHref: () => "/my-reservation"
    },
  }
};