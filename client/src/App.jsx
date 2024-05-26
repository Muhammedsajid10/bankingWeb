// // App.jsx
// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from './Contexts/AuthContext';
// import LoginPage from './Pages/LoginPage';
// import RegisterPage from './Pages/RegisterPage';
// import PrivateRoute from './Components/PrivateRoute';
// import DashboardPage from './Pages/DashboardPage';
// import AdminPage from './Pages/AdminPage';

// const App = () => {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <PrivateRoute path="/dashboard" element={<DashboardPage />} />
//           <PrivateRoute path="/admin" element={<AdminPage />} admin={true} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// };

// export default App;








// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import LoginPage from './Pages/LoginPage';
// import RegisterPage from './Pages/RegisterPage';
// import AdminPage from './Pages/AdminPage';
// import PrivateRoute from './Components/PrivateRoute';
// import { AuthProvider } from './Contexts/AuthContext';
// import DashboardPage from './Pages/DashboardPage';

// const App = () => {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
//           <Route path="/admin" element={<PrivateRoute element={<AdminPage />} admin />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// };

// export default App;






import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import AdminPage from './Pages/AdminPage';
import PrivateRoute from './Components/PrivateRoute';
import { AuthProvider } from './Contexts/AuthContext';
import TransactionPage from './Pages/TransactionPage';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
          <Route path="/admin" element={<PrivateRoute element={<AdminPage />} admin />} />
          {/* <Route path="/admin" element={<AdminPage />} admin />  */}
          <Route path="/transactions" element={<PrivateRoute element={<TransactionPage />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
