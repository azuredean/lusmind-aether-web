import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Minimal branded placeholder: no page CSS needed, no layout shift. */
const RouteFallback = () => (
  <div
    aria-hidden="true"
    style={{
      position: "fixed",
      inset: 0,
      background: "#050706",
      display: "grid",
      placeItems: "center",
    }}
  >
    <span
      style={{
        display: "block",
        width: 34,
        height: 2,
        background: "rgba(255,255,255,0.42)",
      }}
    />
  </div>
);

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Legacy URL from the original e-liquid category. */}
        <Route path="/e-liquid" element={<Navigate to="/products/e-liquid" replace />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
