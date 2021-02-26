import React from 'react';
import { render, waitFor } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import { AlertProvider } from 'context/AlertContext';
import BlogSideBar from './components';
import BlogEntry from './BlogEntry';

jest.mock("./components");

describe("BlogEntry", () => {
	let apiFail;
	let entryData;
	// let params;
	
	beforeAll(() => {
		BlogSideBar.mockImplementation(() => <div>BlogSideBar</div>);
		window.fetch = jest.fn().mockImplementation(() => new Promise((resolve) => {
				if (apiFail) {
					resolve({status: 500, json: () => Promise.resolve({message: "not ok"})});
				} else {
					resolve({status: 200, json: () => Promise.resolve(entryData)});
				}
			}));
	});

	beforeEach(() => {
		apiFail = false;
		entryData = {
			id: 1,
			date: (new Date()).toISOString(),
			title: "Tytuł",
			content: "lorem ipsum"
		};
		// params = {
		// 	category: "cat",
		// 	entryId: "123456"
		// };
	});

	it("should match snapshot", async () => {
		const {container} = render(
			<AlertProvider>
				<MemoryRouter>
					<BlogEntry />
				</MemoryRouter>
			</AlertProvider>
		);
		await waitFor(() => expect(fetch).toHaveBeenCalled(), {
			timeout: 5000
		});

		expect(container).toMatchSnapshot();

	});

	it("should display error alert on api fail", async () => {

	});
});