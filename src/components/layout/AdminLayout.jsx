// AdminLayout.jsx
import React, { useContext } from 'react';
import { Outlet, Link, Navigate } from 'react-router-dom';
import { Navbar, Sidebar } from 'flowbite-react';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi';
import AuthContext from '../../config/context/auth-context';

const AdminLayout = () => {
  const { user } = useContext(AuthContext);

  const isAdmin = user?.roles[0]?.name === 'ADMIN_ROLE';
  const isClient = user?.roles[0]?.name === 'CLIENT_ROLE';
  const isUser = user?.roles[0]?.name === 'USER_ROLE';

  if (!(isAdmin || isClient || isUser)) {

    return <Navigate to="/error" />;
  }

 
  const welcomeMessage = `Bienvenido_${user?.roles[0]?.name}`;

  const fullName = `${user?.person?.name ?? ''} ${user?.person?.surname ?? ''} ${user?.person?.lastname ?? ''}`;

  return (
    <>
      <header>
        <Navbar fluid rounded>
          <Navbar.Brand as={Link} href="https://flowbite-react.com">
            <img
              src="/favicon.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Flowbite React
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link href="#" active>
              Home
            </Navbar.Link>
            <Navbar.Link as={Link} href="#">
              About
            </Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <main className="flex">
        <aside>
          <Sidebar aria-label="Default sidebar example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <li>
                  <Link
                    to={'dashboard'}
                    className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <HiChartPie className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    <span className="px-3 flex-1 whitespace-nowrap">
                      Dashboard
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={'users'}
                    className="flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <HiViewBoards className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    <span className="px-3 flex-1 whitespace-nowrap">
                      Usuarios
                    </span>
                  </Link>
                </li>
                <Sidebar.Item as={Link} href="products" icon={HiInbox}>
                  Inbox
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiUser}>
                  Users
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiShoppingBag}>
                  Products
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiArrowSmRight}>
                  Sign In
                </Sidebar.Item>
                <Sidebar.Item href="#" icon={HiTable}>
                  Sign Up
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </aside>
        <section className="w-full">
          <h2>{welcomeMessage}</h2>
          <p>{`Nombre completo: ${fullName}`}</p>
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default AdminLayout;

