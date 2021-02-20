import { useMutation, useQuery } from 'react-query';
import {
	sendPost,
	reserveSpace,
	sendAttachments,
	getTopics,
} from 'views/PostCreator/PostCreator.api';

export const usePostMutation = token => useMutation(postData => sendPost(token, postData));
export const useAttachmentsMutation = token =>
	useMutation(attachmentList => sendAttachments(token, attachmentList));
export const useReserveMutation = token => useMutation(() => reserveSpace(token));
export const useTopicsQuery = () => useQuery('topics', getTopics);
