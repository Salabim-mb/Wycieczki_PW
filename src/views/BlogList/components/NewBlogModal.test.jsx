import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { AlertProvider } from 'context/AlertContext';
import NewBlogModal from './NewBlogModal';

describe("NewBlogModal", () => {
	let open;
	let setOpen;
	// let fetchFail;
	
	// beforeAll(() => {
	// 	global.fetch = jest.fn().mockImplementation(() => new Promise((resolve) => {
	// 			if (fetchFail) {
	// 				resolve({status: 500, json: () => Promise.resolve({message: "not ok"})});
	// 			} else {
	// 				resolve({status: 201, json: () => Promise.resolve({id: 1})});
	// 			}
	// 		}))
	// });

	beforeEach(() => {
		open = true;
		setOpen = jest.fn();
		// fetchFail = false;
		jest.clearAllMocks();
	});
	
	it("should match snapshot", () => {
		const {getByRole} = render(
			<AlertProvider>
				<NewBlogModal open={open} setOpen={setOpen} />
			</AlertProvider>
		);

		expect(getByRole("dialog")).toMatchSnapshot();
	});

	it("should clear data on cancel", () => {
		const {getByLabelText, getByText} = render(
			<AlertProvider>
				<NewBlogModal open={open} setOpen={setOpen} />
			</AlertProvider>
		);

		fireEvent.change(getByLabelText("Tytuł bloga", {exact: false}), {
			target: {
				value: "qwe"
			}
		});
		fireEvent.click(getByText("Anuluj"));

		expect(getByLabelText("Tytuł bloga", {exact: false}).value).toBe("");
	});

	it("should call fetching method with correct data", () => {
		const {getByLabelText, getByText} = render(
			<AlertProvider>
				<NewBlogModal open={open} setOpen={setOpen} />
			</AlertProvider>
		);

		fireEvent.change(getByLabelText("Tytuł bloga", {exact: false}), {
			target: {
				value: "qwe"
			}
		});
		fireEvent.change(getByLabelText("Dodaj zdjęcie kafelka", {exact: false}), {
			target: {
				files: [
					new File([], "qwe.jpg"),
				]
			}
		});
		fireEvent.change(getByLabelText("Tytuł widoczny na kafelku", {exact: false}), {
			target: {
				checked: true
			}
		});

		fireEvent.click(getByText("Zatwierdź"))
	});

	it("should display photo name in input", async () => {
		const {getByLabelText, getByPlaceholderText} = render(
			<AlertProvider>
				<NewBlogModal open={open} setOpen={setOpen} />
			</AlertProvider>
		);
		fireEvent.change(getByLabelText("Dodaj zdjęcie kafelka", {exact: false}), {
			target: {
				files: [
					new File(["qweqwe", "qwe"], "qwe.jpg"),
				]
			}
		});
		const fileNameInput = getByPlaceholderText(
			"Wybierz plik przyciskiem powyżej",
			{exact: false}
		)
		await expect(fileNameInput.value).toBe("qwe.jpg");
	});
});