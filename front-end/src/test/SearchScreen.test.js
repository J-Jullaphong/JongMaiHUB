import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchScreen from "../components/SearchScreen";


describe('SearchScreen', () => {
    it('should display filter, search result, and Load More button', () => {
        render(<SearchScreen />);
    });

    it('should display Load More button', () => {
        render(<SearchScreen />);
    })

    it('should display more service result when user click on Load More button', () => {
        render(<SearchScreen />);
    })
})

describe('Search Result', () => {
    it('should display name of service provider, name of service, and Details button', () => {
        render(<SearchScreen />);
    })

    it('should display ServiceDetail when user click on Details button', () => {
        render(<SearchScreen />);
    })
})

describe('ServiceDetail', () => {
    it('should display name, open, close,and location of service venues', () => {
        render(<SearchScreen />);
    })

    it('should display name, duration, price, and  available staffs of service', () => {
        render(<SearchScreen />);
    } )

})

describe('StaffInform', () => {
    it('should display name and specialty of staff', () => {
        render(<SearchScreen />);
    })
})

// Staff Obj
// It should display name, specialty of staff