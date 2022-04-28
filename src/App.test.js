import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const typeIntoForm = ({ email, password, confirmedPassword }) => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmedInputElement = screen.getByLabelText(/confirmed password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmedPassword) {
    userEvent.type(confirmedInputElement, confirmedPassword);
  }
  return { emailInputElement, passwordInputElement, confirmedInputElement };
};

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("initial input is empty", () => {
    const emailInputElement = screen.getByRole("textbox", { name: /email/i });
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmedInputElement = screen.getByLabelText(/confirmed password/i);

    expect(emailInputElement.value).toBe("");
    expect(passwordInputElement.value).toBe("");
    expect(confirmedInputElement.value).toBe("");
  });

  test("should be able to type a password", () => {
    // const passwordInputElement = screen.getByLabelText("Password");
    // userEvent.type(passwordInputElement, "password!");
    const { passwordInputElement } = typeIntoForm({ password: "password!" });
    expect(passwordInputElement.value).toBe("password!");
  });

  test("shoud be able to confirm password", () => {
    // const confirmedInputElement = screen.getByLabelText(/confirmed password/i);
    // userEvent.type(confirmedInputElement, "password!");
    const { confirmedInputElement } = typeIntoForm({
      confirmedPassword: "password!",
    });
    expect(confirmedInputElement.value).toBe("password!");
  });

  describe("Error Handling", () => {
    test("should show error message on invalid email", () => {
      const emailErrorElement = screen.queryByText(/invalid email format/i);
      expect(emailErrorElement).not.toBeInTheDocument();
      const submitBtnElement = screen.getByRole("button", { name: /submit/i });
      // const emailInputElement = screen.getByRole("textbox", { name: /email/i });
      // userEvent.type(emailInputElement, "selenagmail.com");
      typeIntoForm({ email: "selenagomez.com" });

      userEvent.click(submitBtnElement);
      const emailErrorElementAgain =
        screen.queryByText(/invalid email format/i);
      expect(emailErrorElementAgain).toBeInTheDocument();
    });
    test("show password error if length less than 5 characters", () => {
      const buttonElement = screen.getByRole("button", { name: /submit/i });
      // const emailInputElement = screen.getByRole("textbox", { name: /email/i });
      // userEvent.type(emailInputElement, "selena@gmail.com");

      typeIntoForm({ email: "selena@gmail.com" });
      const passwordErrorElement = screen.queryByText(
        /The password length should be 5 or more characters/i
      );
      expect(passwordErrorElement).not.toBeInTheDocument();
      // const passwordInputElement = screen.getByLabelText("Password");
      // userEvent.type(passwordInputElement, "dodo");

      typeIntoForm({ password: "dodo" });
      userEvent.click(buttonElement);

      const passwordErrorElementAgain = screen.queryByText(
        /The password length should be 5 or more characters/i
      );
      expect(passwordErrorElementAgain).toBeInTheDocument();
    });

    test("should show error if password isn't equal to confirmed password", () => {
      // const emailInputElement = screen.getByRole("textbox", { name: /email/i });
      // userEvent.type(emailInputElement, "selena@gomez.com");
      // const passwordInputElement = screen.getByLabelText("Password");
      // userEvent.type(passwordInputElement, "selenagomez");
      // const confirmedInputElement = screen.getByLabelText(/confirmed password/i);
      // userEvent.type(confirmedInputElement, "selena");
      const buttonElement = screen.getByRole("button", { name: /submit/i });
      typeIntoForm({
        email: "selena@gomez.com",
        password: "selenagomez",
        confirmedPassword: "selena",
      });

      userEvent.click(buttonElement);

      const confirmedErrorElement = screen.queryByText(
        /The passwords don't match. Try again/i
      );
      expect(confirmedErrorElement).toBeInTheDocument();
    });

    test("should show no error if every input is valid", () => {
      // const emailInputElement = screen.getByRole("textbox", { name: /email/i });
      // userEvent.type(emailInputElement, "selena@gomez.com");
      // const passwordInputElement = screen.getByLabelText("Password");
      // userEvent.type(passwordInputElement, "selenagomez");
      // const confirmedInputElement = screen.getByLabelText(/confirmed password/i);
      // userEvent.type(confirmedInputElement, "selenagomez");

      const buttonElement = screen.getByRole("button", { name: /submit/i });
      typeIntoForm({
        email: "selena@gomez.com",
        password: "selgo",
        confirmedPassword: "selgo",
      });
      userEvent.click(buttonElement);

      const confirmedErrorElement = screen.queryByText(
        /The passwords don't match. Try again/i
      );
      expect(confirmedErrorElement).not.toBeInTheDocument();
    });
  });
});
