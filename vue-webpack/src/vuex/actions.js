import * as type from './mutation-types';
import {
	userServer
} from 'api/UserServer';

export const userAction = function ({
	commit,
}, item) {
	commit(type.USER, item);
};


export const getUserInfo = function ({
	commit,
}, ) {
	userServer.getUserInfo().then(res => {
		if (res.succeed) {
			commit(type.USER_INFO, res.data);
		}
	});
};
