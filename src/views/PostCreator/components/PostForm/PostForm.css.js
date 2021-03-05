import styled from 'styled-components';

export const StyledUploadWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		width: 70%;
	}
`;
