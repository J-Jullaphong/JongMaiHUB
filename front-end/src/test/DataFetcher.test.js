import React from "react";
import DataFetcher from "../components/DataFetcher";
import axios from "axios";

describe("DataFetcher", () => {
    it("should fetches data successfully", async () => {
        axios.get = jest.fn().mockResolvedValue({ data: "mockSuccess" });

        const dataFetcher = new DataFetcher();
        const result = await dataFetcher.fetchData("testType", "testKey");

        expect(result).toEqual("mockSuccess");
    });

    it("should fetches data unsuccessfully", async () => {
        axios.get = jest.fn().mockRejectedValue(new Error("mockUnsuccess"));

        const dataFetcher = new DataFetcher();

        try {
            await dataFetcher.fetchData("testType", "testKey");
        } catch (error) {
            expect(error.message).toEqual("mockUnsuccess");
        }
    });
});
