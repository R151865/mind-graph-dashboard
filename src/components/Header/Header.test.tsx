// Header.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import '@testing-library/jest-dom/extend-expect';

// Mock the icons and UserLog component
jest.mock('../../assets/icons/icons', () => ({
  NotificationsNoneIcon: (props: any) => <div {...props}>Notifications</div>,
  MenuIcon: (props: any) => <div {...props}>Menu</div>,
}));

jest.mock('../UserLog/UserLog', () => () => <div>User Log</div>);

describe('Header', () => {
  test('renders without crashing', () => {
    render(<Header />);
    // Component renders without crashing if no errors are thrown
  });

  test('renders MenuIcon component and triggers toggleSidebar', () => {
    const toggleSidebar = jest.fn();
    render(<Header toggleSidebar={toggleSidebar} />);
    
    const menuIcon = screen.getByText('Menu');
    expect(menuIcon).toBeInTheDocument();
    
    fireEvent.click(menuIcon);
    expect(toggleSidebar).toHaveBeenCalled();
  });

  test('renders NotificationsNoneIcon component', () => {
    render(<Header />);
    
    const notificationsIcon = screen.getByText('Notifications');
    expect(notificationsIcon).toBeInTheDocument();
  });

  test('renders UserLog component', () => {
    render(<Header />);
    
    const userLog = screen.getByText('User Log');
    expect(userLog).toBeInTheDocument();
  });
});
