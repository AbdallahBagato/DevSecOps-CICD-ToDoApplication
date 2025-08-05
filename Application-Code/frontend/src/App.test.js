import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import * as taskServices from "./services/taskServices";
import '@testing-library/jest-dom';


// Mock the taskServices functions
jest.mock("./services/taskServices");

describe("App Component", () => {
    const fakeTasks = [
        { _id: "1", task: "Test Task 1", completed: false },
        { _id: "2", task: "Test Task 2", completed: true },
    ];

    beforeEach(() => {
        taskServices.getTasks.mockResolvedValue({ data: fakeTasks });
    });

    it("renders tasks from API", async () => {
        render(<App />);
        expect(await screen.findByText("Test Task 1")).toBeInTheDocument();
        expect(await screen.findByText("Test Task 2")).toBeInTheDocument();
    });

    it("adds a new task", async () => {
        taskServices.addTask.mockResolvedValue({
            data: { _id: "3", task: "New Task", completed: false },
        });

        render(<App />);
        const input = screen.getByPlaceholderText("Add New TO-DO");
        const addButton = screen.getByRole("button", { name: /add task/i });

        fireEvent.change(input, { target: { value: "New Task" } });
        fireEvent.click(addButton);

        expect(await screen.findByText("New Task")).toBeInTheDocument();
    });

    it("updates a task", async () => {
        taskServices.updateTask.mockResolvedValue({});

        render(<App />);
        const checkbox = await screen.findAllByRole("checkbox");

        fireEvent.click(checkbox[0]);
        await waitFor(() =>
            expect(taskServices.updateTask).toHaveBeenCalled()
        );
    });

    it("deletes a task", async () => {
        taskServices.deleteTask.mockResolvedValue({});
        render(<App />);
        const deleteButtons = await screen.findAllByText("Delete");

        fireEvent.click(deleteButtons[0]);

        await waitFor(() =>
            expect(taskServices.deleteTask).toHaveBeenCalledWith("1")
        );
    });
});
