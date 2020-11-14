const privateRoutes = {
	'GET /avatars': 'UserController/avatar.getAvatars',
	'GET /avatars/:id': 'UserController/avatar.getAvatar',

	'GET /roles': 'UserController/role.getRoles',
	'GET /roles/:id': 'UserController/role.getRole',

	'GET /departments': 'UserController/department.getDepartments',
	'GET /departments/:id': 'UserController/department.getDepartment',
	'POST /departments': 'UserController/department.postDepartment',
	'PUT /departments/:id': 'UserController/department.postDepartment',
	'DELETE /departments': 'UserController/department.deleteDepartments',
	'DELETE /departments/:id': 'UserController/department.deleteDepartment',

	'GET /users': 'UserController/user.getUsers',
	'GET /users/:id': 'UserController/user.getUser',
	'POST /users': 'UserController/user.postUser',
	'PUT /users/:id': 'UserController/user.postUser',
	'DELETE /users': 'UserController/user.deleteUsers',
	'DELETE /users/:id': 'UserController/user.deleteUser',

	'GET /permissions': 'CoreController/permission.getPermissions',
	'GET /permissions/:id': 'CoreController/permission.getPermission',

	'GET /features': 'CoreController/feature.getFeatures',
	'GET /features/:id': 'CoreController/feature.getFeature',

	'GET /courses': 'MediaController/course.getCourses',
	'GET /courses/:id': 'MediaController/course.getCourse',
	'POST /courses': 'MediaController/course.postCourse',
	'PUT /courses/:id': 'MediaController/course.postCourse',
	'DELETE /courses': 'MediaController/course.deleteCourses',
	'DELETE /courses/:id': 'MediaController/course.deleteCourse',

	'GET /notes': 'MediaController/note.getNotes',
	'GET /notes/:id': 'MediaController/note.getNote',
	'POST /notes': 'MediaController/note.postNote',
	'PUT /notes/:id': 'MediaController/note.postNote',
	'DELETE /notes': 'MediaController/note.deleteNotes',
	'DELETE /notes/:id': 'MediaController/note.deleteNote',


	'GET /jobs': 'TaskController/job.getJobs',
	'GET /jobs/:id': 'TaskController/job.getJob',
	'POST /jobs': 'TaskController/job.postJob',
	'PUT /jobs/:id': 'TaskController/job.postJob',
	'DELETE /jobs': 'TaskController/job.deleteJobs',
	'DELETE /jobs/:id': 'TaskController/job.deleteJob',

	'GET /tasks': 'TaskController/task.getTasks',
	'GET /tasks/:id': 'TaskController/task.getTask',
	'POST /tasks': 'TaskController/task.postTask',
	'PUT /tasks/:id': 'TaskController/task.postTask',
	'DELETE /tasks': 'TaskController/task.deleteTasks',
	'DELETE /tasks/:id': 'TaskController/task.deleteTask',


	'GET /targets': 'AggController/target.getTargets',
	'GET /targets/:id': 'AggController/target.getTarget',
	'POST /targets': 'AggController/target.postTarget',
	'PUT /targets/:id': 'AggController/target.postTarget',
	'DELETE /targets': 'AggController/target.deleteTargets',
	'DELETE /targets/:id': 'AggController/target.deleteTarget',

	'GET /sources': 'AggController/source.getSources',
	'GET /sources/:id': 'AggController/source.getSource',
	'POST /sources': 'AggController/source.postSource',
	'PUT /sources/:id': 'AggController/source.postSource',
	'DELETE /sources': 'AggController/source.deleteSources',
	'DELETE /sources/:id': 'AggController/source.deleteSource',
};

module.exports = privateRoutes;
