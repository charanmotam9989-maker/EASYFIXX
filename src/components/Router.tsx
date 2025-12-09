import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';

// Import pages
import Layout from '@/components/Layout';
import HomePage from '@/components/pages/HomePage';
import LoginPage from '@/components/pages/LoginPage';
import TouristRegistrationPage from '@/components/pages/TouristRegistrationPage';
import GuideRegistrationPage from '@/components/pages/GuideRegistrationPage';
import ExperiencesPage from '@/components/pages/ExperiencesPage';
import ServiceDetailPage from '@/components/pages/ServiceDetailPage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';
import ProviderRegistrationPage from '@/components/pages/ProviderRegistrationPage';
import BookingPage from '@/components/pages/BookingPage';
import BookingsPage from '@/components/pages/BookingsPage';
import ReviewsPage from '@/components/pages/ReviewsPage';
import ProfilePage from '@/components/pages/ProfilePage';
import ProviderDashboardPage from '@/components/pages/ProviderDashboardPage';
import AdminApprovalsPage from '@/components/pages/AdminApprovalsPage';

// Layout component that includes ScrollToTop
function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Layout />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />, // MIXED ROUTE: Shows different content for authenticated vs anonymous users
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register-tourist",
        element: <TouristRegistrationPage />,
      },
      {
        path: "register-guide",
        element: <GuideRegistrationPage />,
      },
      {
        path: "services",
        element: <ExperiencesPage />,
      },
      {
        path: "experiences",
        element: <ExperiencesPage />,
      },
      {
        path: "services/:id",
        element: <ServiceDetailPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "provider-registration",
        element: <ProviderRegistrationPage />,
      },
      {
        path: "reviews",
        element: <ReviewsPage />,
      },
      {
        path: "book/:id",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to book a service">
            <BookingPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "bookings",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view your bookings">
            <BookingsPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view your profile">
            <ProfilePage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "provider-dashboard",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your guide dashboard">
            <ProviderDashboardPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "guide-dashboard",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your guide dashboard">
            <ProviderDashboardPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "admin/approvals",
        element: <AdminApprovalsPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
