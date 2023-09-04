import React from 'react'
import { Fragment } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { PublicRoutes, PrivateRoutes, AuthRoutes } from './routes'
import DefaultLayout from './Layouts/DefaultLayout'
import config from './config'
import * as UserServices from './service/userService'

function App() {
  return (
    <div className="App">
      <>
        <Routes>
          {PublicRoutes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout

            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
          {AuthRoutes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout
            const isAuthenticated = UserServices.isLog()
            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isAuthenticated === true ? (
                    <Navigate to={config.home} replace={true} />
                  ) : (
                    <Layout>
                      <Page />
                    </Layout>
                  )
                }
              />
            )
          })}

          {PrivateRoutes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout
            const isAuthenticated = UserServices.isLog()

            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isAuthenticated === true ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Navigate to={config.userLogin} replace={true} />
                  )
                }
              />
            )
          })}
        </Routes>
      </>
    </div>
  )
}

export default App
