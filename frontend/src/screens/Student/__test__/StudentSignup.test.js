import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StudentLogin from "../StudentLogin";
describe("SignUp", () => {
  describe("with valid inputs", () => {
    it("calls the onSubmit function", async () => {
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByRole } = render(
        <StudentLogin submitHandler={mockOnSubmit} />
      );
      await act(async () => {
        fireEvent.change(getByLabelText("email"), {
          target: { value: "test@123.com" },
        });
        fireEvent.change(getByLabelText("password"), {
          target: { value: "test@123.com" },
        });
      });
      await act(async () => {
        fireEvent.click(getByRole("button"));
      });
      expect(mockOnSubmit).toHaveBeenCall;
    });
  });
});
