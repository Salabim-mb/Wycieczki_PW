import React from 'react';
import {render, fireEvent} from "@testing-library/react";
import { AlertProvider } from 'context/AlertContext';
import BlogList from './BlogList';

describe("BlogList", () => {
	it("should match snapshot", () => {
		const {container} = render(
			<AlertProvider>
				<BlogList />
			</AlertProvider>
		);

		expect(container).toMatchSnapshot();
	});

	it("should open dialog on button click", () => {
		const {getByText} = render(
			<AlertProvider>
				<BlogList />
			</AlertProvider>
		);
		fireEvent.click(getByText("Dodaj blog"));
		expect(getByText("Dodaj nowy blog")).toBeInTheDocument();
	});
});