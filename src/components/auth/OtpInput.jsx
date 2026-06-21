import { useRef } from "react";

export default function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  hasError = false,
}) {
  const inputRefs = useRef([]);

  const digits = Array.from(
    { length },
    (_, index) => value[index] || ""
  );

  const updateDigit = (index, digit) => {
    const nextDigits = [...digits];

    nextDigits[index] = digit;

    onChange(nextDigits.join(""));
  };

  const handleChange = (index, event) => {
    const digit = event.target.value
      .replace(/\D/g, "")
      .slice(-1);

    updateDigit(index, digit);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      !digits[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      index < length - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    onChange(pastedValue);

    const focusIndex = Math.min(
      pastedValue.length,
      length - 1
    );

    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div
      className="flex gap-2 sm:gap-3"
      onPaste={handlePaste}
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] =
              element;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={disabled}
          autoComplete={
            index === 0
              ? "one-time-code"
              : "off"
          }
          onChange={(event) =>
            handleChange(index, event)
          }
          onKeyDown={(event) =>
            handleKeyDown(index, event)
          }
          onFocus={(event) =>
            event.target.select()
          }
          aria-label={`Verification digit ${
            index + 1
          }`}
          className={`h-14 min-w-0 flex-1 rounded-xl border bg-white text-center text-xl font-bold text-slate-950 outline-none transition disabled:bg-slate-100 ${
            hasError
              ? "border-red-400 focus:ring-4 focus:ring-red-100"
              : "border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          }`}
        />
      ))}
    </div>
  );
}