// SideBar.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SideBar from './SideBar';
import '@testing-library/jest-dom/extend-expect';

// Mock icons and DashCard component
jest.mock('../../assets/icons/icons', () => ({
  MenuIcon: (props: any) => <div {...props}>Menu</div>,
  PersonOutlineIcon: (props: any) => <div {...props}>Person</div>,
  GridViewIcon: (props: any) => <div {...props}>Grid</div>,
}));

jest.mock('../Reusable/DashCard/DashCard', () => ({ isActive, link, icon, text, closeSideBar }: any) => (
  <div>
    <a href={link} className={isActive ? 'active' : ''}>
      {icon}
      {text}
    </a>
    <button onClick={closeSideBar}>Close Sidebar</button>
  </div>
));

describe('SideBar', () => {
  test('renders with MenuIcon and DashCard components', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SideBar />
      </MemoryRouter>
    );

    const menuIcon = screen.getByText('Menu');
    const dashboardCard = screen.getByText('Dashboard');
    const usersCard = screen.getByText('Users');

    expect(menuIcon).toBeInTheDocument();
    expect(dashboardCard).toBeInTheDocument();
    expect(usersCard).toBeInTheDocument();
  });

  test('renders DashCard components with correct active state', () => {
    render(
      <MemoryRouter initialEntries={['/users']}>
        <SideBar />
      </MemoryRouter>
    );

    const dashboardCard = screen.getByText('Dashboard');
    const usersCard = screen.getByText('Users');

    expect(dashboardCard).not.toHaveClass('active');
    expect(usersCard).toHaveClass('active');
  });

  test('clicking close button triggers closeSideBar function', () => {
    const closeSideBar = jest.fn();
    render(
      <MemoryRouter initialEntries={['/']}>
        <SideBar closeSideBar={closeSideBar} />
      </MemoryRouter>
    );

    const closeButton = screen.getByText('Close Sidebar');
    fireEvent.click(closeButton);

    expect(closeSideBar).toHaveBeenCalled();
  });

  test('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SideBar />
      </MemoryRouter>
    );
    // Component renders without crashing if no errors are thrown
  });
});
