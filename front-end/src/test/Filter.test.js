import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
