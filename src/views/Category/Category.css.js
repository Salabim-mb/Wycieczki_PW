import styled from 'styled-components'
import Container from '@material-ui/core/Container';

const StyledContainer = styled(Container)`
    margin:0 auto;
    padding: 0!important;
`;

const StyledPostDisplay = styled.div`
    padding: ${({ theme }) => theme.margin.m};
`;

export { StyledContainer, StyledPostDisplay }