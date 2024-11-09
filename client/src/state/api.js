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
    "InactiveHeroSection"
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
      providesTags: ["CreateHeroSection"], // Add this line for tag consistency
    }),
    getHeroSections: build.query({
      query: () => "api/herosections/all-herosections", 
      providesTags: ["HeroSection"], // Unified tag for consistency
    }),
    getHeroSectionById: build.query({
      query: (id) => `api/herosections/${id}`, 
      providesTags: ["HeroSection"],
    }),
    getActiveHeroSectionById: build.query({ //herosections/active/
      query: (id) => `api/herosections/active/${id}`, 
      providesTags: ["ActiveHeroSection"],
    }),
    getInactiveHeroSections: build.query({
      query: () => "api/herosections/inactive", 
      providesTags: ["InactiveHeroSection"],
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
  useGetHeroSectionsQuery,       // Standardized to avoid redundancy
  useGetHeroSectionByIdQuery,
  useGetActiveHeroSectionByIdQuery,
  useGetInactiveHeroSectionsQuery,
} = api;
