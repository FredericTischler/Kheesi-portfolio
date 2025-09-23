import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootLayout } from "@/components/layout/root-layout";
import { AboutPage } from "@/pages/about";
import { ContactPage } from "@/pages/contact";
import { GalleryPage } from "@/pages/gallery";
import { HomePage } from "@/pages/home";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
