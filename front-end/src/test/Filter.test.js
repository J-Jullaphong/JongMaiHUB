import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../components/Filter';
import { useNavigate, useSearchParams } from 'react-router-dom';

const navigateMock = jest.fn();
const searchParamsMock = new URLSearchParams();

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useSearchParams: jest.fn()
}));

describe("Filter", () => {
    beforeEach(() => {
        useNavigate.mockReturnValue(navigateMock);
        useSearchParams.mockReturnValue([searchParamsMock]);
    });

    it('should display type, price, duration, apply and clear filter', () => {
        render(<Filter />);
        expect(screen.getByText(/type:/i)).toBeInTheDocument();
        expect(screen.getByText(/price/i)).toBeInTheDocument();
        expect(screen.getByText(/duration/i)).toBeInTheDocument();
        expect(screen.getByText(/apply filter/i)).toBeInTheDocument();
        expect(screen.getByText(/clear filter/i)).toBeInTheDocument();
    });

    it('should display and update query parameters when click apply filter', () => {
        render(<Filter />);
        const applyFilterButton = screen.getByText(/apply filter/i);
        fireEvent.click(applyFilterButton);
        expect(navigateMock).toHaveBeenCalledWith(expect.stringMatching(/type=&maxPrice=0&maxDuration=0$/));
    });

    it('should clear all query parameters when click clear filter', () => {
        searchParamsMock.set('type', 'barber');
        searchParamsMock.set('maxPrice', '1000');
        searchParamsMock.set('maxDuration', '60');

        render(<Filter />);
        const clearFilterButton = screen.getByText(/clear filter/i);
        fireEvent.click(clearFilterButton);
        expect(navigateMock).toHaveBeenCalledWith(expect.stringMatching(/type=&maxPrice=0&maxDuration=0$/));
    });
});
