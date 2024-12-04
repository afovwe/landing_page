import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
    "CreateHeroSection",
    "HeroSection", 
    "ActiveHeroSection",
    "InactiveHeroSection",
    "MobileNavigation",
    "PopularProducts",
    "SuperQuality",
    "Services",
    "SpecialOffer",
    "CustomerReviews",
    "Subscribe"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `api/general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "api/client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "api/client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "api/client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "api/client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "api/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "api/management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `api/management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "api/general/dashboard",
      providesTags: ["Dashboard"],
    }),
    getCreateHeroSection: build.query({
      query: () => "api/herosections/new", 
      providesTags: ["CreateHeroSection"],
    }),
    getHeroSections: build.query({
      query: () => "api/herosections/all-herosections", 
      providesTags: ["HeroSection"],
    }),
    getHeroSectionById: build.query({
      query: (id) => `api/herosections/${id}`, 
      providesTags: ["HeroSection"],
    }),
    getActiveHeroSectionById: build.query({
      query: () => "api/herosections",  // Fetch the active hero section
      providesTags: ["ActiveHeroSection"], 
    }),
    getInactiveHeroSections: build.query({
      query: () => "api/herosections/inactive", 
      providesTags: ["InactiveHeroSection"],
    }),
    getMobileNavigation: build.query({
      query: () => "api/navigation/mobile",
      providesTags: ["MobileNavigation"],
    }),
    updateMobileNavigation: build.mutation({
      query: (data) => ({
        url: "api/navigation/mobile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MobileNavigation"],
    }),
    toggleMobileNavigation: build.mutation({
      query: (isOpen) => ({
        url: "api/navigation/mobile/toggle",
        method: "POST",
        body: { isOpen },
      }),
      invalidatesTags: ["MobileNavigation"],
    }),
    getPopularProducts: build.query({
      query: () => "api/popular-products/active",
      providesTags: ["PopularProducts"],
    }),
    getActiveSuperQuality: build.query({
      query: () => "api/super-quality/active",
      providesTags: ["SuperQuality"],
    }),
    getActiveServices: build.query({
      query: () => "api/services/active",
      providesTags: ["Services"],
    }),
    getActiveSpecialOffer: build.query({
      query: () => "api/special-offer/active",
      providesTags: ["SpecialOffer"],
    }),
    getActiveCustomerReviews: build.query({
      query: () => "api/customer-reviews/active",
      providesTags: ["CustomerReviews"],
    }),
    getActiveSubscribe: build.query({
      query: () => "api/subscribe/active",
      providesTags: ["Subscribe"],
    }),
    getAllSignups: build.query({
      query: () => "api/subscribe/signups",
      providesTags: ["Subscribe"],
    }),
    createSignup: build.mutation({
      query: (email) => ({
        url: "api/subscribe/subscribe-email",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["Subscribe"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useGetCreateHeroSectionQuery,
  useGetHeroSectionsQuery,       
  useGetHeroSectionByIdQuery,
  useGetActiveHeroSectionByIdQuery,
  useGetInactiveHeroSectionsQuery,
  useGetMobileNavigationQuery,
  useUpdateMobileNavigationMutation,
  useToggleMobileNavigationMutation,
  useGetPopularProductsQuery,
  useGetActiveSuperQualityQuery,
  useGetActiveServicesQuery,
  useGetActiveSpecialOfferQuery,
  useGetActiveCustomerReviewsQuery,
  useGetActiveSubscribeQuery,
  useGetAllSignupsQuery,
  useCreateSignupMutation,
} = api;
