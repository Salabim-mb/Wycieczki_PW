import styled from 'styled-components';
import { FormGroup, Typography } from '@material-ui/core';
import { Input } from 'components';

export const StyledFormGroup = styled(FormGroup)`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		width: 100%;
		flex-direction: row;
		align-items: center;
	}
`;

export const StyledTypography = styled(Typography)`
	margin: 0.5rem 0;
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		margin: 0 1rem;
	}
`;

export const StyledInput = styled(Input)`
	width: 100%;
	@media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
		width: 350px;
	}
`;
