// DashboardLayout.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardLayout from './DashboardLayout';
import '@testing-library/jest-dom/extend-expect';

// Mock Header and SideBar components
jest.mock('../Header/Header', () => ({ toggleSidebar }: { toggleSidebar: () => void }) => (
  <button onClick={toggleSidebar}>Toggle Sidebar</button>
));

jest.mock('../SideBar/SideBar', () => ({ closeSideBar }: { closeSideBar: () => void }) => (
  <div>
    <button onClick={closeSideBar}>Close Sidebar</button>
  </div>
));

describe('DashboardLayout', () => {
  test('renders without crashing', () => {
    render(
      <DashboardLayout>
        <div>Child Content</div>
      </DashboardLayout>
    );
    // Component renders without crashing if no errors are thrown
  });

  test('renders Header component and triggers sidebar toggle', () => {
    render(
      <DashboardLayout>
        <div>Child Content</div>
      </DashboardLayout>
    );

    const toggleButton = screen.getByText('Toggle Sidebar');
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    // Check if sidebar opens upon clicking the toggle button
    expect(screen.getByText('Close Sidebar')).toBeInTheDocument();
  });

  test('renders SideBar component in desktop view', () => {
    render(
      <DashboardLayout>
        <div>Child Content</div>
      </DashboardLayout>
    );

    // Check if the sidebar is present in the desktop view
    expect(screen.getByText('Close Sidebar')).toBeInTheDocument();
  });

  test('sidebar closes when close button is clicked', () => {
    render(
      <DashboardLayout>
        <div>Child Content</div>
      </DashboardLayout>
    );

    const toggleButton = screen.getByText('Toggle Sidebar');
    fireEvent.click(toggleButton);

    const closeButton = screen.getByText('Close Sidebar');
    fireEvent.click(closeButton);

    // Check if the sidebar closes upon clicking the close button
    expect(screen.queryByText('Close Sidebar')).not.toBeInTheDocument();
  });

  test('renders children content correctly', () => {
    render(
      <DashboardLayout>
        <div>Child Content</div>
      </DashboardLayout>
    );

    const childContent = screen.getByText('Child Content');
    expect(childContent).toBeInTheDocument();
  });
});
