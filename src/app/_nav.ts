export const navItems = [
 
  {
    name: 'Transaction Map',
    url: '/tran/transaction-map',
    icon: 'icon-map', 
  },
  {
    name: 'Checklists',
    url: '/list/create-checklist',
    icon: 'icon-layers',
  },
  {
    name: 'Services ',
    url: '/tran/service',
    icon: 'icon-people',
  },
  {
    name: 'Data Room ',
    url: '/tran/data-room',
    icon: 'icon-grid',
  },
  {
    name: 'Sell List',
    url: '/list/addedlist',
    icon: 'icon-list',
  },
  {
    name: 'Buy List',
    url: '/list/savedlist',
    icon: 'icon-star',
  },
  // {
  //   name: 'Notification',
  //   url: '/notification',
  //   icon: 'icon-layers',
  // },
  {
    name: 'Mail',
    url: '/mail',
    icon: 'icon-globe',
  },  
];

export const sellerNav =[
  {
    name: 'Transaction Map',
    url: '/tran/map',
    icon: 'icon-map', 
  },
  {
    name: 'Services ',
    url: '/tran/service',
    icon: 'icon-people',
  },
  // {
  //   name: 'Process Overview',
  //   url: '/list/process',
  //   icon: 'icon-layers',
  // },
  {
    name: 'Property List',
    url: '/list/addedlist',
    icon: 'icon-list',
  },
  {
    name: 'Data Room ',
    url: '/data',
    icon: 'icon-grid',
  },
];
export const buyerNav =[
  {
    name: 'Process Overview',
    url: '/list/process',
    icon: 'icon-layers',
  },
  {
    name: 'Transaction Map',
    url: '/tran/map',
    icon: 'icon-map', 
  },
  {
    name: 'Services ',
    url: '/tran/service',
    icon: 'icon-people',
  },
  {
    name: 'Buy List',
    url: '/list/savedlist',
    icon: 'icon-list',
  },
 
  {
    name: 'Data Room ',
    url: '/data',
    icon: 'icon-grid',
  },
];
export const professionalNav =[
  
  {
    name: 'Transaction Map',
   // url: '/tran/map',
    icon: 'icon-map', 
     children: [
          {
            name: 'Buy Sell Transaction',
            url: '/tran/map',
            icon: 'icon-cursor'
          },
          {
            name: 'Lease Transaction',
            url: '/lease-transaction',
            icon: 'icon-cursor'
          },
        ]
  }, 
  {
    name: 'Data Room ',
    url: '/data',
    icon: 'icon-grid',
  },
];
export const adminNav =[
  {
    name: 'Manage Business',
    url: '/admin/business-manage',
    icon: 'icon-map', 
  },
  {
    name: 'Manage Users',
    url: '/admin/user-manage',
    icon: 'icon-layers',
  },
  {
    name: 'Manage Notifications ',
    url: '/admin/manage-notification',
    icon: 'icon-grid',
  },
  {
    name: 'Manage BizAdmins ',
    url: '/admin/manage-bizAdmins',
    icon: 'icon-grid',
  },
 
];

export const LandlordNav =[
  // {
  //   name: 'Process Overview',
  //   url: '/list/process',
  //   icon: 'icon-layers',
  // },
  {
    name: 'Transaction Map',
    url: '/lease-transaction',
    icon: 'icon-map', 
  },
  {
    name: 'Services ',
    url: '/lease-transaction/lease-service',
    icon: 'icon-people',
  },
  {
    name: 'Landlord List',
    url: '/lease/landlord-list',
    icon: 'icon-list',
  },
 
  {
    name: 'Data Room ',
    url: '/data',
    icon: 'icon-grid',
  },
];

export const TenantNav =[
  // {
  //   name: 'Process Overview',
  //   url: '/list/process',
  //   icon: 'icon-layers',
  // },
  {
    name: 'Transaction Map',
    url: '/lease-transaction',
    icon: 'icon-map', 
  },
  {
    name: 'Services ',
    url: '/lease-transaction/lease-service',
    icon: 'icon-people',
  },
  {
    name: 'Saved List',
    url: '/lease/tenant-list',
    icon: 'icon-list',
  }, 
  {
    name: 'Data Room ',
    url: '/data',
    icon: 'icon-grid',
  },
];