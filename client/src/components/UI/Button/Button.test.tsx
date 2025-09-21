import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button Component", () => {
  it("renders button with correct label", () => {
    const { getByText } = render(
      <Button variant="primary" color="primary" label="Test Button" />
    );

    expect(getByText("Test Button")).toBeInTheDocument();
  });

  it("applies the correct variant class", () => {
    const { container } = render(
      <Button variant="secondary" color="primary" label="Test Button" />
    );

    const button = container.querySelector("button");
    expect(button).toHaveClass("SecondaryVariant");
  });

  it("applies the correct color class", () => {
    const { container } = render(
      <Button variant="primary" color="danger" label="Test Button" />
    );

    const button = container.querySelector("button");
    expect(button).toHaveClass("DangerColor");
  });

  it("applies the correct border class", () => {
    const { container } = render(
      <Button
        variant="primary"
        color="primary"
        label="Test Button"
        border="rounded-full"
      />
    );

    const button = container.querySelector("button");
    expect(button).toHaveClass("RoundedFullBorder");
  });

  it("applies the inline class when inline is true", () => {
    const { container } = render(
      <Button variant="primary" color="primary" label="Test Button" inline />
    );

    const button = container.querySelector("button");
    expect(button).toHaveClass("InlineButton");
  });

  it("does not apply the inline class when inline is false", () => {
    const { container } = render(
      <Button
        variant="primary"
        color="primary"
        label="Test Button"
        inline={false}
      />
    );

    const button = container.querySelector("button");
    expect(button).not.toHaveClass("InlineButton");
  });

  it("calls the onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const { getByText } = render(
      <Button
        variant="primary"
        color="primary"
        label="Test Button"
        onClick={handleClick}
      />
    );

    const button = getByText("Test Button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("sets the correct button type", () => {
    const { container } = render(
      <Button variant="primary" color="primary" label="Submit" type="submit" />
    );

    const button = container.querySelector("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it('uses "button" as the default type', () => {
    const { container } = render(
      <Button variant="primary" color="primary" label="Default Type" />
    );

    const button = container.querySelector("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("applies additional className if provided", () => {
    const { container } = render(
      <Button
        variant="primary"
        color="primary"
        label="Test Button"
        className="testClass"
      />
    );

    const button = container.querySelector("button");
    expect(button).toHaveClass("testClass");
  });
});
