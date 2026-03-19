import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import Skeleton from './components/ui/Skeleton';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Protected route wrapper
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <div className="cursor-glow pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      <ScrollProgress />
      <Navbar />
      
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <Suspense 
            fallback={
              <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
                <Skeleton className="h-12 w-64 rounded-xl" />
                <Skeleton className="h-64 w-full max-w-2xl rounded-2xl" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
