import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./Pages/Layout";
import Loader from "./Pages/Loader";
const Home = lazy(()=> import('./Pages/ViewOffers'))
const NoPage = lazy(()=> import('./Pages/Not-found'))
const CreateOffers = lazy(()=> import('./Pages/CreateOffers'))
const MyProfile = lazy(()=> import('./Pages/MyProfile'))
const MyHistory = lazy(()=> import('./Pages/Myhistory'))


export default function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/createoffers" element={<CreateOffers />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/myhistory" element={<MyHistory />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}