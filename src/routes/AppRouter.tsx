import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RouteGuard } from '../components/routes/RouteGuard';
import { AuthLayout } from '../layouts/AuthLayout';
import { AppShell } from '../layouts/AppShell';
import AccountPage from '../pages/AccountPage';
import FoundItemsPage from '../pages/FoundItemsPage';
import HomePage from '../pages/HomePage';
import ItemDetailPage from '../pages/ItemDetailPage';
import LoginPage from '../pages/LoginPage';
import LostItemsPage from '../pages/LostItemsPage';
import MyItemsPage from '../pages/MyItemsPage';
import NotFoundPage from '../pages/NotFoundPage';
import PostFoundItemPage from '../pages/PostFoundItemPage';
import PostLostItemPage from '../pages/PostLostItemPage';
import { ROUTES } from '../constants/routes';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.login}
          element={
            <RouteGuard requireAuth={false}>
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            </RouteGuard>
          }
        />

        <Route element={<RouteGuard />}>
          <Route element={<AppShell />}>
            <Route path={ROUTES.home} element={<HomePage />} />
            <Route path={ROUTES.account} element={<AccountPage />} />
            <Route path={ROUTES.lostItems} element={<LostItemsPage />} />
            <Route path={ROUTES.foundItems} element={<FoundItemsPage />} />
            <Route path={ROUTES.itemDetail} element={<ItemDetailPage />} />
            <Route path={ROUTES.postLostItem} element={<PostLostItemPage />} />
            <Route
              path={ROUTES.postFoundItem}
              element={<PostFoundItemPage />}
            />
            <Route path={ROUTES.myItems} element={<MyItemsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
