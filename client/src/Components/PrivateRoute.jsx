// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import { useAuth } from '../Contexts/AuthContext';

// const PrivateRoute = ({ component: Component, admin, ...rest }) => {
//   const { user } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user ? (
//           admin && !user.isAdmin ? (
//             <Redirect to="/dashboard" />
//           ) : (
//             <Component {...props} />
//           )
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;






import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const PrivateRoute = ({ element, admin, ...rest }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (admin && !user.isAdmin) {
    return <Navigate to="/admin" />;
  }

  return React.cloneElement(element, rest);
};

export default PrivateRoute;


