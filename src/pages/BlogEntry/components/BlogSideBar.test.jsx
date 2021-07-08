import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import BlogSideBar from './BlogSideBar';

describe("BlogSideBar", () => {
	let featuredPosts;
	let pathParams;
	let setRedirect;

	beforeEach(() => {
		featuredPosts = [];
		pathParams = [
			{name: "Strona główna", path: "qwe"},
			{name: "Strona 1", path: "asd"},
			{name: "Strona 2", path: "zxc"}
		];
		setRedirect = jest.fn();
		jest.clearAllMocks();
	});

	it("should match snapshot", () => {
		const {container} = render(
			<MemoryRouter>
				<BlogSideBar pathParams={pathParams} setRedirect={setRedirect} featuredPosts={featuredPosts} />
			</MemoryRouter>
		);

		expect(container).toMatchSnapshot();
	});

	it("should call setRedirect with correct params", () => {
		const {getByText} = render(
			<MemoryRouter>
				<BlogSideBar pathParams={pathParams} setRedirect={setRedirect} featuredPosts={featuredPosts} />
			</MemoryRouter>
		);

		fireEvent.click(getByText(pathParams[1].name));

		expect(setRedirect).toHaveBeenCalledWith({
			action: true,
			destination: pathParams[1].path
		})
	});
});