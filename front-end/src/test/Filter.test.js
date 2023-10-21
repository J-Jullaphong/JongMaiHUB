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
        const getType = screen.getByText(/type:/i)
        const getPrice = screen.getByText(/price/i)
        const getDuration = screen.getByText(/duration/i)
        const getApplyFilter = screen.getByText(/apply filter/i)
        const getClearFilter = screen.getByText(/clear filter/i)
        expect(getType).toBeInTheDocument();
        expect(getPrice).toBeInTheDocument();
        expect(getDuration).toBeInTheDocument();
        expect(getApplyFilter).toBeInTheDocument();
        expect(getClearFilter).toBeInTheDocument();
    });

    it('should display and update query parameters when click apply filter', () => {
        render(<Filter />);
        const getApplyFilter = screen.getByText(/apply filter/i);
        fireEvent.click(getApplyFilter);
        expect(navigateMock).toHaveBeenCalledWith(expect.stringMatching(/type=&maxPrice=0&maxDuration=0$/));
    });

    it('should clear all query parameters when click clear filter', () => {
        searchParamsMock.set('type', 'barber');
        searchParamsMock.set('maxPrice', '1000');
        searchParamsMock.set('maxDuration', '60');

        render(<Filter />);
        const getClearFilter = screen.getByText(/clear filter/i);
        fireEvent.click(getClearFilter);
        expect(navigateMock).toHaveBeenCalledWith(expect.stringMatching(/type=&maxPrice=0&maxDuration=0$/));
    });
    
});
