
import { useLocation, useNavigate, matchPath } from 'react-router-dom';
import { HiArrowSmallLeft } from 'react-icons/hi2';
import PageTitle from '../Shared/PageTitle';


// Route configuration for title display
const routeTitles = [
  { path: '/', name: '/ Dashboard' },
  { path: '/predictions', name: '/ Predictions' },
  { path: '/prediction-details/:id', name: '/ Predictions / Prediction-Details' },
  { path: '/user-management', name: '/ User Management' },
  { path: '/user-details/:id', name: '/ User Management / User Details' },
  { path: '/ticket-management', name: '/ Ticket Management' },
  { path: '/transaction', name: '/ Transaction' },
  { path: '/settings', name: '/ Settings' },
  { path: '/jackpot-tracker', name: '/ Jackpot-Tracker' },
];

// Paths that should show a back arrow
const backArrowPaths = [
  '/prediction-details/:id',
  '/user-details/:id',
];

const RouteHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Match current route
  const currentRoute = routeTitles.find(route =>
    matchPath({ path: route.path, end: !route.path.includes('/:') }, currentPath)
  );

  const pageTitle = currentRoute?.name || '';
  const showBackArrow = backArrowPaths.includes(currentRoute?.path);

  return (
    <div className="flex items-center gap-2 text-white">
      {pageTitle && showBackArrow ? (
        <button onClick={() => navigate(-1)} className="flex items-center gap-x-2 cursor-pointer">
          <HiArrowSmallLeft size={25} />
          <PageTitle>{pageTitle}</PageTitle>
        </button>
      ) : (
        pageTitle && <PageTitle>{pageTitle}</PageTitle>
      )}
    </div>
  );
};

export default RouteHeader;
