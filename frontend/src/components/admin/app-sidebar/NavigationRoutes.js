export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'Dashboard',
      meta: {
        iconClass: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'accountoperations',
      displayName: 'Account Operations',
      meta: {
        iconClass: 'vuestic-iconset-user',
      },
    },
    {
      name: 'fundtransfer',
      displayName: 'Fund Transfer',
      meta: {
        iconClass: 'vuestic-iconset-maps',
      },
      children: [
        {
          name: 'swift',
          displayName: 'SWIFT',
        },
        {
          name: 'rtgstransfer',
          displayName: 'rtgs',
        },
        {
          name: 'ift',
          displayName: 'IFT',
        },
        {
          name: 'eft',
          displayName: 'EFT',
        },
        {
          name: 'mobiletransfer',
          displayName: 'Mobile Transfer',
        },
      ],
    },
    {
      name: 'pesalink',
      displayName: 'Pesalink',
      meta: {
        iconClass: 'vuestic-iconset-auth',
      },
    },
    {
      name: 'b2b',
      displayName: 'b2b',
      meta: {
        iconClass: 'vuestic-iconset-auth',
      },
    },
    {
      name: 'bill-payment',
      displayName: 'bill-payment',
      meta: {
        iconClass: 'vuestic-iconset-auth',
      },
    },
    {
      name: 'lipa-na-mpesa',
      displayName: 'lipa-na-mpesa',
      meta: {
        iconClass: 'vuestic-iconset-auth',
      },
    },
    {
      name: 'purchase-airtime',
      displayName: 'purchase-airtime',
      meta: {
        iconClass: 'vuestic-iconset-auth',
      },
    },
    {
      name: 'queries',
      displayName: 'Queries',
      meta: {
        iconClass: 'vuestic-iconset-comments',
      },
      children: [
        {
          name: 'kyc',
          displayName: 'KYC',
        },
        {
          name: 'creditscore',
          displayName: 'Credit Score',
        },
      ],
    },
    {
      name: 'users',
      displayName: 'Users',
      meta: {
        iconClass: 'vuestic-iconset-user',
      },
      children: [
        {
          name: 'adduser',
          displayName: 'Add',
        },
        {
          name: 'viewusers',
          displayName: 'View all',
        },
      ],
    },
    {
      name: 'accounts',
      displayName: 'Accounts',
      meta: {
        iconClass: 'vuestic-iconset-tables',
      },
      children: [
        {
          name: 'addaccount',
          displayName: 'Add',
        },
        {
          name: 'viewaccounts',
          displayName: 'View all',
        },
      ],
    },
  ],
}
