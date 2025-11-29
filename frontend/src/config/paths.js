export const paths = {
  home: {
    getHref: () => '/',
  },

  auth: {
    getHref: () => "/auth",
  },

  app: {
    root: {
      getHref: () => "/tabas",
    },
    stylists: {
      getHref: () => "/tabas/stylists",
    },
    bookings: {
      getHref: () => "/tabas/booking",
    },
    reservation: {
      getHref: () => "/tabas/reservation",
    },
    success: {
      getHref: () => "/tabas/success",
    },
    reservationList: {
      getHref: () => "/tabas/my-reservation"
    },
  }
};