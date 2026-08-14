import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const MyWorks = lazy(() => import("./pages/MyWorks"));
const Play = lazy(() => import("./pages/Play"));
const Admin = lazy(() => import("./pages/Admin"));
import { LoadingProvider } from "./context/LoadingProvider";
import { ConfigProvider } from "./context/ConfigContext";

const App = () => {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LoadingProvider>
                <Suspense>
                  <MainContainer>
                    <Suspense>
                      <CharacterModel />
                    </Suspense>
                  </MainContainer>
                </Suspense>
              </LoadingProvider>
            }
          />
          <Route
            path="/myworks"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MyWorks />
              </Suspense>
            }
          />
          <Route
            path="/play"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Play />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Admin />
              </Suspense>
            }
          />
        </Routes>
        <Analytics />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
