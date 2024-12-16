export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin'
};

export const hasPermission = (userRole, requiredRole) => {
  const roleHierarchy = {
    [ROLES.SUPERADMIN]: 3,
    [ROLES.ADMIN]: 2,
    [ROLES.USER]: 1
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

export const roleRoutes = {
  [ROLES.USER]: [
    '/dashboard',
    '/dashboard/products',
  ],
  [ROLES.ADMIN]: [
    '/dashboard',
    '/dashboard/products',
    '/dashboard/overview',
    '/dashboard/daily',
    '/dashboard/monthly',
    '/dashboard/add-product',
    '/dashboard/add-user'
  ],
  [ROLES.SUPERADMIN]: [
    '/dashboard',
    '/dashboard/products',
    '/dashboard/overview',
    '/dashboard/daily',
    '/dashboard/monthly',
    '/dashboard/customers',
    '/dashboard/add-product',
    '/dashboard/add-user',
    '/dashboard/admin',
    '/dashboard/manage',
    '/dashboard/popular-products',
    '/dashboard/performance',
    '/dashboard/transactions',
    '/dashboard/geography'
  ]
};
