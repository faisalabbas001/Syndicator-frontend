import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/ViewOffers";
import NoPage from "./Pages/Not-found";
import CreateOffers from "./Pages/CreateOffers";
import MyProfile from "./Pages/MyProfile";
import MyHistory from "./Pages/Myhistory";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/createoffers" element={<CreateOffers />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/myhistory" element={<MyHistory />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}