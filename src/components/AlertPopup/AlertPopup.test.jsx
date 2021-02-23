import React from 'react';
import {render} from '@testing-library/react';
import alertOptions from 'constants/alertOptions';
import { AlertContext } from 'context/AlertContext';
import AlertPopup from './AlertPopup';

describe("AlertPopup", () => {
	let contextData;
	beforeEach(() => {
		contextData = {
			open: true,
			message: "test123",
			severity: alertOptions.ERROR,
			changeVisibility: jest.fn(),
			showAlert: jest.fn()
		}
		jest.clearAllMocks();
	})

	it("should match snapshot", () => {
		const {container} = render(
			<AlertContext.Provider value={contextData}>
				<AlertPopup />
			</AlertContext.Provider>
		);
		expect(container).toMatchSnapshot();
	});

	it("should display correct alert message", () => {
		const {getByText} = render(
			<AlertContext.Provider value={contextData}>
				<AlertPopup />
			</AlertContext.Provider>
		);
		expect(getByText(contextData.message)).toBeInTheDocument();
	});
});