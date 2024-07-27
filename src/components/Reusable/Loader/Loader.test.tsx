import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Loader from "./Loader"; 

describe('<Loader />', () => {

  test('renders the correct number of LinearProgress components', () => {
    render(<Loader />);
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars).toHaveLength(6);
  });

});
