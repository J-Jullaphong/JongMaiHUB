import React from "react";
import DataSender from "../components/DataSender";
import axios from "axios";
import { JSDOM } from "jsdom";
import fs from "fs";

describe("DataSender", () => {
  it("should submit data successfully", async () => {
    axios.post = jest.fn().mockResolvedValue({ data: "mockSuccess" });

    const dom = new JSDOM();
    global.document = dom.window.document;
    const formData = document.createElement("form");
    formData.append("key1", "value1");
    const dataSender = new DataSender();
    const result = await dataSender.submitData("testType", formData, "testKey");

    expect(result).toEqual({ data: "mockSuccess" });
  });

  it("should submit data unsuccessfully", async () => {
    axios.post = jest.fn().mockRejectedValue(new Error("mockUnsuccess"));

    const dom = new JSDOM();
    global.document = dom.window.document;
    const formData = document.createElement("form");
    formData.append("key1", "value1");
    const dataSender = new DataSender();

    try {
      await dataSender.submitData("testType", formData, "testKey");
    } catch (error) {
      expect(error.message).toEqual("mockUnsuccess");
    }
  });

  it("should convert image to base64", async () => {
    const dataSender = new DataSender();

    const data = fs.readFileSync(__dirname + "/img/testImage.jpeg");
    const file = new File([data], "testImage.jpeg", { type: "image/jpeg" });
    const base64 = await dataSender.convertImageToBase64(file);

    expect(base64).not.toEqual("");
    expect(base64).toMatch(/AGr2soKQxN0TJaivGsnrWVlYjmQt/);
  });
});
