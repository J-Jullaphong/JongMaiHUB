import React from "react";
import DataFetcher from "../components/DataFetcher";
import axios from "axios";

describe("DataFetcher", () => {
  it("should fetch data successfully and decrypt it", async () => {
    axios.get = jest.fn().mockResolvedValue({ ciphertext: "mockCipherText", iv: "mockIv" });

    const dataFetcher = new DataFetcher();
    const result = await dataFetcher.fetchData("testType", "testKey");

    expect(result).toEqual(dataFetcher.decryptData({ ciphertext: "mockCipherText", iv: "mockIv" }));
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
