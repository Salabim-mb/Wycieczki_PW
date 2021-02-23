import { useMutation, useQuery } from 'react-query';
import {
	sendPost,
	sendAttachments,
	getTopics,
	deleteAttachments,
	deleteAttachment,
} from 'views/PostCreator/PostCreator.api';

export const usePostMutation = (token, prevId) =>
	useMutation(postData => sendPost(token, postData, prevId));
export const useAttachmentsMutation = token =>
	useMutation(attachmentList => sendAttachments(token, attachmentList));
export const useTopicsQuery = () => useQuery('topics', getTopics);
export const useFileDeletion = token => useMutation(data => deleteAttachments(token, data));
export const useImageDeletion = token => useMutation(data => deleteAttachment(token, data, true));
