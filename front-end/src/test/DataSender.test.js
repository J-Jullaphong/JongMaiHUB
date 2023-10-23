import React from "react";
import DataSender from "../components/DataSender";
import axios from "axios";
import { JSDOM } from 'jsdom';

describe("DataSender", () => {
    it("should submit data successfully", async () => {
        axios.post = jest.fn().mockResolvedValue({ data: "mockSuccess" });

        const dom = new JSDOM();
        global.document = dom.window.document;
        const formData = document.createElement('form');
        formData.append('key1', 'value1');
        const dataSender = new DataSender();
        const result = await dataSender.submitData("testType", formData, "testKey");

        expect(result).toEqual({ data: "mockSuccess" });
    });
});
