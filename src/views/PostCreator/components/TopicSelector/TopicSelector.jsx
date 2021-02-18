import React from 'react';
import { Select, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { AlertInfo } from 'components';
import { getTopics } from 'views/PostCreator/PostCreator.api';

const TopicSelector = ({ value, handleChange }) => {
	const { isLoading, isError, error, data, isSuccess } = useQuery('topics', getTopics, {
		enabled: false,
	});
	return (
		<>
			<Select labelId="topicSelector" id="select" value={value} onChange={handleChange}>
				<MenuItem value={-1} disabled>
					Wybierz temat
				</MenuItem>
				{isSuccess &&
					data.map(({ id, title }) => (
						<MenuItem key={id} value={id}>
							{title}
						</MenuItem>
					))}
			</Select>
			<AlertInfo isLoading={isLoading} isError={isError}>
				{error?.message}
			</AlertInfo>
		</>
	);
};

TopicSelector.propTypes = {
	value: PropTypes.number.isRequired,
	handleChange: PropTypes.func.isRequired,
};

export default TopicSelector;
