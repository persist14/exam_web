/*
 * @Description: 
 * @Author: 
 * @Date: 2023-06-14 17:44:44
 * @LastEditTime: 2023-06-14 17:50:40
 * @LastEditors: 
 * @Reference: 
 */
import ajax from "../utils/ajax";

export const loggerQuery = async () => {
	return await ajax.get("/logger");
};
