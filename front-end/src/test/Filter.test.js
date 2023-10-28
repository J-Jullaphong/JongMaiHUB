import React from 'react';
import { render, screen } from '@testing-library/react';
import Filter from '../components/Filter';

const searchParamsMock = new URLSearchParams();

const serviceData = [
    {
        id: 1,
        name: "service1",
        service_provider: "provider1",
        service_picture: "service1.jpg",
        type: "type1",
        duration: 10,
        price: 10,
    }
];

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
    useSearchParams: jest.fn()
}));


describe("Filter", () => {
    it('should display type, price, duration, apply and clear filter', () => {
        render(<Filter serviceData={serviceData} searchQuery={searchParamsMock}/>);
        const getType = screen.getByText("Type")
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
});
