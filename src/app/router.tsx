import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MerchantLayout, MobileLayout, RootLayout, StationLayout } from '../components/layout';
import { Empty, Missing } from '../components/ui';
import { Link } from 'react-router-dom';
import Landing from '../pages/demo/Landing';
import Controller from '../pages/demo/Controller';
import { PlaceDetail } from '../features/trips/PlaceDetail';
import {
  Earnings,
  JoinTrip,
  MyTrips,
  Profile,
  ShareTrip,
  TravelHome,
  TravelLogin,
  TripDetail,
  TripEditor,
} from '../pages/travel/Travel';
import { GuestJourney, GuestLanding } from '../pages/guest/Guest';
import {
  Cart,
  Catalog,
  CustomerOrders,
  LookupOrder,
  OrderTracking,
  ProductDetail,
  StationDetail,
} from '../features/ordering/Shopping';
import {
  MerchantLogin,
  MerchantMenu,
  MerchantOrderDetail,
  MerchantOrders,
  MerchantToday,
} from '../pages/merchant/Merchant';
import {
  StationLogin,
  StationOrderDetail,
  StationOrders,
  StationOverview,
  StationPartners,
  StationSales,
  StationSettings,
  VehicleDetail,
  Vehicles,
} from '../pages/station/Station';
const shoppingRoutes = [
  { path: 'station/:stationId', element: <StationDetail /> },
  { path: 'station/:stationId/catalog', element: <Catalog /> },
  { path: 'station/:stationId/products/:productId', element: <ProductDetail /> },
  { path: 'station/:stationId/cart', element: <Cart /> },
  { path: 'station/:stationId/checkout', element: <Cart checkout /> },
];
function RouteError() {
  return (
    <div className="error-page">
      <Empty
        title="Phiên cần được mở lại"
        description="Vui lòng mở lại trang chủ để tiếp tục hành trình."
        action={
          <Link className="button" to="/app">
            Về trang chủ
          </Link>
        }
      />
    </div>
  );
}
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/demo-control', element: <Controller /> },
      {
        path: '/app',
        element: <MobileLayout />,
        children: [
          { index: true, element: <TravelHome /> },
          { path: 'login', element: <TravelLogin /> },
          { path: 'register', element: <TravelLogin register /> },
          { path: 'trips', element: <MyTrips /> },
          { path: 'trips/new', element: <TripEditor /> },
          { path: 'trips/join', element: <JoinTrip /> },
          {
            path: 'trips/:tripId',
            children: [
              { index: true, element: <TripDetail /> },
              { path: 'live', element: <TripDetail live /> },
              { path: 'share', element: <ShareTrip /> },
              { path: 'edit', element: <TripEditor /> },
              { path: 'places/:stopId', element: <PlaceDetail /> },
              ...shoppingRoutes,
            ],
          },
          { path: 'orders', element: <CustomerOrders /> },
          { path: 'orders/:orderId', element: <OrderTracking /> },
          { path: 'profile', element: <Profile /> },
          { path: 'partner', element: <Profile partner /> },
          { path: 'earnings', element: <Earnings /> },
        ],
      },
      {
        element: <MobileLayout guest />,
        children: [
          {
            path: '/t/:code',
            children: [
              { index: true, element: <GuestLanding /> },
              { path: 'journey', element: <GuestJourney /> },
              { path: 'places/:stopId', element: <PlaceDetail /> },
              ...shoppingRoutes,
              { path: 'orders/:orderId', element: <OrderTracking /> },
              { path: 'lookup', element: <LookupOrder /> },
            ],
          },
          { path: '/qr/:tripId', element: <GuestLanding /> },
        ],
      },
      { path: '/merchant/login', element: <MerchantLogin /> },
      {
        path: '/merchant',
        element: <MerchantLayout />,
        children: [
          { index: true, element: <Navigate to="orders" replace /> },
          { path: 'orders', element: <MerchantOrders /> },
          { path: 'orders/:partId', element: <MerchantOrderDetail /> },
          { path: 'menu', element: <MerchantMenu /> },
          { path: 'today', element: <MerchantToday /> },
        ],
      },
      { path: '/station/login', element: <StationLogin /> },
      {
        path: '/station',
        element: <StationLayout />,
        children: [
          { index: true, element: <StationOverview /> },
          { path: 'vehicles', element: <Vehicles /> },
          { path: 'vehicles/:tripId', element: <VehicleDetail /> },
          { path: 'vehicles/:tripId/check-in', element: <VehicleDetail checkIn /> },
          { path: 'orders', element: <StationOrders /> },
          { path: 'orders/:orderId', element: <StationOrderDetail /> },
          { path: 'sales', element: <StationSales /> },
          { path: 'partners', element: <StationPartners /> },
          { path: 'settings', element: <StationSettings /> },
        ],
      },
      {
        path: '*',
        element: (
          <div className="error-page">
            <Missing />
          </div>
        ),
      },
    ],
  },
]);
