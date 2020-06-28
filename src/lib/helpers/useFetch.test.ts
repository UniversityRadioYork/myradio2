import { renderHook, act } from "@testing-library/react-hooks";
import { useFetch } from "./useFetch";

describe("useFetch", () => {
  it("returns four values with sane defaults", () => {
    const { result } = renderHook(() => useFetch(() => Promise.resolve()));
    expect(result.current).toHaveLength(4);
    expect(result.current[0]).toBeNull();
    expect(result.current[1]).toBe(true);
    expect(result.current[2]).toBeNull();
    expect(result.current[3]).toBeInstanceOf(Function);
  });

  it("calls the factory when told to", async () => {
    const factory = jest.fn();
    const { result, waitForNextUpdate } = renderHook(() => useFetch(factory));
    await act(async () => {
      result.current[3]();
      await waitForNextUpdate();
    });
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it("sets all the right values when the factory resolves", async () => {
    const sigil = "Yippee!";
    const factory = jest.fn().mockResolvedValue(sigil);

    const { result, waitForNextUpdate } = renderHook(() => useFetch(factory));
    await act(async () => {
      result.current[3]();
      await waitForNextUpdate();
    });

    expect(result.current[0]).toBe(sigil);
    expect(result.current[1]).toBe(false);
    expect(result.current[2]).toBeNull();
  });

  it("handles errors", async () => {
    const sigil = "Boo!";
    const factory = jest.fn().mockRejectedValueOnce(sigil);

    const { result, waitForNextUpdate } = renderHook(() => useFetch(factory));
    await act(async () => {
      result.current[3]();
      await waitForNextUpdate();
    });

    expect(result.current[0]).toBeNull;
    expect(result.current[1]).toBe(false);
    expect(result.current[2]).toBe(sigil);
  });

  it("doesn't call the factory more than needed", async () => {
    const sigil = "Yippee!";
    const factory = jest.fn().mockResolvedValue(sigil);

    const { result, waitForNextUpdate } = renderHook(() => useFetch(factory));
    expect(factory).toHaveBeenCalledTimes(0);

    await act(async () => {
      result.current[3]();
      await waitForNextUpdate();
    });

    expect(factory).toHaveBeenCalledTimes(1);
  });

  describe("refetch", () => {
    it("resets loading and error", async () => {
      const sigil = "Boo!";
      const factory = jest.fn().mockRejectedValueOnce(sigil);

      const { result, waitForNextUpdate } = renderHook(() => useFetch(factory));
      await act(async () => {
        result.current[3]();
        await waitForNextUpdate();
      });

      expect(factory).toHaveBeenCalledTimes(1);
      expect(result.current[1]).toBe(false);
      expect(result.current[2]).toBe(sigil);

      factory.mockReturnValueOnce(new Promise(() => {}));
      await act(async () => {
        result.current[3]();
        await waitForNextUpdate();
      });

      expect(factory).toHaveBeenCalledTimes(2);
      expect(result.current[1]).toBe(true);
      expect(result.current[2]).toBeNull();
    });

    it("returns the right value each time", async () => {
      const sigil = "Yippee1!";
      const factory = jest.fn().mockResolvedValue(sigil);

      const { result, waitForNextUpdate } = renderHook(() => useFetch(factory));
      await act(async () => {
        result.current[3]();
        await waitForNextUpdate();
      });

      expect(result.current[0]).toBe(sigil);

      const sigil2 = "Yay2!";
      factory.mockResolvedValueOnce(sigil2);
      await act(async () => {
        result.current[3]();
        await waitForNextUpdate();
      });

      expect(result.current[0]).toBe(sigil2);
    });
  });
});
