import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  // Tương tự tên Slice khi tạo Slice thông thường
  reducerPath: 'api',

  // Cấu hình chung cho tất cả request
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-rest-api-nodejs.herokuapp.com/',
  }),

  // Các endpoints (lệnh gọi request)
  endpoints: (builder) => ({}),
})
