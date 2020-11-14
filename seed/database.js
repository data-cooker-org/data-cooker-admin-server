'use strict';

const bcryptService = require('../api/services/bcrypt.service');
const Context = require('./context');

class Database {

	constructor(seedData, enableLogging) {
		this.features = seedData.features;
		this.avatars = seedData.avatars;
		this.roles = seedData.roles;
		this.departments = seedData.departments;
		this.users = seedData.users;
		this.jobs = seedData.jobs;
		this.tasks = seedData.tasks;
		this.targets = seedData.targets;
		this.sources = seedData.sources;
		this.courses = seedData.courses;
		this.notes = seedData.notes;
		this.permissions = seedData.permissions;
		this.enableLogging = enableLogging;
		this.context = new Context('./db/database.sqlite', enableLogging);
		this.PasswordHasher = bcryptService();
	}

	log(message) {
		if (this.enableLogging) {
			console.info(message);
		}
	}

	tableExists(tableName) {
		this.log(`Checking if the ${tableName} table exists...`);

		return this.context.retrieveValue(`
			SELECT EXISTS (
				SELECT 1 
				FROM sqlite_master 
				WHERE type = 'table' AND name = ?
			);`,
			tableName
		);
	}

	createFeature(feature) {
		return this.context.execute(`
			INSERT INTO core_Features(
				id, 
				featureName, 
				createdAt, 
				updatedAt
			)
			VALUES(
				? /* id */,
				? /* featureName */,
				datetime('now'), 
				datetime('now')
			);`,
			feature.id,
			feature.featureName
		);
	}

	createAvatar(avatar) {
		return this.context.execute(`
			INSERT INTO user_Avatars(
				id,
				avatarData, 
				isPublic,
				creatorId,
				createdAt, 
				updatedAt
			)
			VALUES(
				? /* id */,
				? /* avatarData */,
				? /* isPublic */,
				? /* creatorId */,
				datetime('now'), 
				datetime('now')
			);`,
			avatar.id,
			avatar.avatarData,
			avatar.isPublic,
			avatar.creatorId
		);
	}

	createRole(role) {
		return this.context.execute(`
			INSERT INTO user_Roles(
				id, 
				roleName, 
				createdAt, 
				updatedAt
			)
			VALUES(
				? /* id */,
				? /* roleName */,
				datetime('now'), 
				datetime('now')
			);`,
			role.id,
			// role.featureId,
			role.roleName
		);
	}

	createDepartment(department) {
		return this.context.execute(`
			INSERT INTO user_Departments(
				id, 
				department, 
				createdAt, 
				updatedAt
			)
			VALUES(
				? /* id */,
				? /* department */,
				datetime('now'), 
				datetime('now')
			);`,
			department.id,
			department.department
		);
	}

	createUser(user) {
		return this.context.execute(`
			INSERT INTO user_Users(
				userName, 
				firstName, 
				lastName, 
				email, 
				password, 
				createdAt, 
				updatedAt,
				departmentId, 
				avatarId, 
				roleId 
			)
			VALUES(
				? /* userName */,
				? /* firstName */,
				? /* lastName */,
				? /* email */,
				? /* password */,
				datetime('now'), 
				datetime('now'),
				? /* departmentId */,
				? /* avatarId */,
				? /* roleId */
			);`,
			user.userName,
			user.firstName,
			user.lastName,
			user.email,
			user.password,
			user.departmentId,
			user.avatarId,
			user.roleId
		);
	}

	createJob(job) {
		return this.context.execute(`
			INSERT INTO task_Jobs(
				featureId, 
				jobName,
				jobDescription,
				jobStatus,
				jobEnabled,
				repeatSchedule,
				scheduleType,
				scheduleCron,
				scheduleBegin,
				scheduleEnd,
				nextSchedule,
				lastSchedule,
				creatorId,
				createdAt,
				updatedAt
			)
			VALUES(
				? /* featureId */,
				? /* jobName */,
				? /* jobDescription */,
				'' /* jobStatus */,
				1 /* jobEnabled */,
				1 /* repeatSchedule */,
				? /* scheduleType */,
				? /* scheduleCron */,
				'' /* scheduleBegin */,
				'' /* scheduleEnd */,
				'' /* nextSchedule */,
				'' /* lastSchedule */,
				? /* creatorId */,
				datetime('now'), 
				datetime('now')
			);`,
			job.featureId,
			job.jobName,
			job.jobDescription,
			job.scheduleType,
			job.scheduleCron,
			job.creatorId
		);
	}

	createTask(task) {
		return this.context.execute(`
			INSERT INTO task_Tasks(
				featureId, 
				jobStep,
				taskName,
				taskDescription,
				taskWorker,
				taskStatus,
				stopOnError,
				lastScheduledTime,
				lastCompleteTime,
				creatorId,
				createdAt, 
				updatedAt,
				jobId
			)
			VALUES(
				? /* featureId */,
				? /* jobStep */,
				? /* taskName */,
				'' /* taskDescription */,
				'' /* taskWorker */,
				'' /* taskStatus */,
				? /* stopOnError */,
				'' /* lastScheduledTime */,
				'' /* lastCompleteTime */,
				? /* creatorId */,
				datetime('now'), 
				datetime('now'),
				? /* jobId */
			);`,
			task.featureId,
			task.jobStep,
			task.taskName,
			task.stopOnError,
			task.creatorId,
			task.jobId
		);
	}

	createTarget(target) {
		return this.context.execute(`
			INSERT INTO agg_Targets(
				featureId, 
				targetLabel,
				targetData,
				batchControlColumn,
				batchControlSize,
				batchControlNext,
				batchProcessed,
				batchProcessing,
				batchMicroChunkCurrent,
				batchScheduleType,
				batchScheduleLast,
				patternColumns,
				groupByColumns,
				groupByPattern,
				groupByFlexible,
				aggregateColumns,
				aggregateFunctions,
				suppoetSpVersions,
				creatorId,
				createdAt,
				updatedAt
			)
			VALUES(
				? /* featureId */,
				? /* targetLabel */,
				? /* targetData */,
				? /* batchControlColumn */,
				5 /* batchControlSize */,
				'' /* batchControlNext */,
				'' /* batchProcessed */,
				'' /* batchProcessing */,
				'' /* batchMicroChunkCurrent */,
				'' /* batchScheduleType */,
				'' /* batchScheduleLast */,
				'' /* patternColumns */,
				'' /* groupByColumns */,
				0 /* groupByPattern */,
				0 /* groupByFlexible */,
				'' /* aggregateColumns */,
				'' /* aggregateFunctions */,
				'' /* suppoetSpVersions */,
				? /* creatorId */,
				datetime('now'), 
				datetime('now')
			);`,
			target.featureId,
			target.targetLabel,
			target.targetData,
			target.batchControlColumn,
			target.creatorId
		);
	}

	createSource(source) {
		return this.context.execute(`
			INSERT INTO agg_Sources(
				featureId, 
				sourceLabel,
				sourceData,
				sourceEnabled,
				sourceReadyTime,
				sourceCheckTime,
				sourceCheckQuery,
				patternDefault,
				patternFlexible,
				transformation,
				creatorId,
				createdAt, 
				updatedAt,
				targetId
			)
			VALUES(
				? /* featureId */,
				? /* sourceLabel */,
				? /* sourceData */,
				0 /* sourceEnabled */,
				'' /* sourceReadyTime */,
				'' /* sourceCheckTime */,
				'' /* sourceCheckQuery */,
				0 /* patternDefault */,
				0 /* patternFlexible */,
				? /* transformation */,
				? /* creatorId */,
				datetime('now'), 
				datetime('now'),
				? /* targetId */
			);`,
			source.featureId,
			source.sourceLabel,
			source.sourceData,
			source.transformation,
			source.creatorId,
			source.targetId
		);
	}

	createCourse(course) {
		return this.context.execute(`
			INSERT INTO media_Courses(
				featureId, 
				title, 
				description, 
				estimatedTime, 
				materialsNeeded, 
				createdAt, 
				updatedAt,
				creatorId
			)
			VALUES(
				? /* featureId */,
				? /* title */,
				? /* description */,
				? /* estimatedTime */,
				? /* materialsNeeded */,
				datetime('now'), 
				datetime('now'),
				? /* creatorId */
			);`,
			course.featureId,
			course.title,
			course.description,
			course.estimatedTime,
			course.materialsNeeded,
			course.creatorId
		);
	}

	createNote(note) {
		return this.context.execute(`
			INSERT INTO media_Notes(
				featureId, 
				note, 
				createdAt, 
				updatedAt,
				creatorId
			)
			VALUES(
				? /* featureId */,
				? /* note */,
				datetime('now'), 
				datetime('now'),
				? /* creatorId */
			);`,
			note.featureId,
			note.note,
			note.creatorId
		);
	}

	createPermission(permission) {
		return this.context.execute(`
			INSERT INTO core_Permissions(
				featureId,
				permisionNote,
				createdAt, 
				updatedAt,
				roleId
			)
			VALUES(
				? /* featureId */,
				? /* permisionNote */,
				datetime('now'), 
				datetime('now'),
				? /* roleId */
			);`,
			permission.permisionNote,
			permission.featureId,
			permission.roleId
		);
	}

	async hashUserPasswords(users) {
		const usersWithHashedPasswords = [];
		for (const user of users) {
			this.log('Original password: ' + user.password);
			const hashedPassword = this.PasswordHasher.password(user);
			this.log('Hasshed password: ' + hashedPassword);
			usersWithHashedPasswords.push({ ...user, password: hashedPassword });
		}
		return usersWithHashedPasswords;
	}

	async createFeatures(features) {
		for (const feature of features) {
			await this.createFeature(feature);
		}
	}

	async createAvatars(avatars) {
		for (const avatar of avatars) {
			await this.createAvatar(avatar);
		}
	}

	async createRoles(roles) {
		for (const role of roles) {
			await this.createRole(role);
		}
	}

	async createDepartments(departments) {
		for (const department of departments) {
			await this.createDepartment(department);
		}
	}

	async createUsers(users) {
		for (const user of users) {
			await this.createUser(user);
		}
	}

	async createJobs(jobs) {
		for (const job of jobs) {
			await this.createJob(job);
		}
	}

	async createTasks(tasks) {
		for (const task of tasks) {
			await this.createTask(task);
		}
	}

	async createTargets(targets) {
		for (const target of targets) {
			await this.createTarget(target);
		}
	}

	async createSources(sources) {
		for (const source of sources) {
			await this.createSource(source);
		}
	}

	async createCourses(courses) {
		for (const course of courses) {
			await this.createCourse(course);
		}
	}

	async createNotes(notes) {
		for (const note of notes) {
			await this.createNote(note);
		}
	}

	async createPermissions(permissions) {
		for (const permission of permissions) {
			await this.createPermission(permission);
		}
	}

	async init(migrate) {

		// clear tables
		if (migrate) {
			await this.context.execute(`
				DELETE FROM core_Permissions;
				DELETE FROM media_Notes;
				DELETE FROM media_Courses;
				DELETE FROM task_Tasks;
				DELETE FROM task_Jobs;
				DELETE FROM agg_Sources;
				DELETE FROM agg_Targets;
				DELETE FROM user_Users;
				DELETE FROM user_Departments;
				DELETE FROM user_Roles;
				DELETE FROM user_Avatars;
				DELETE FROM core_Features;
			`);
		}
		
		// load features
		const featureTableExists = await this.tableExists('core_Features');
		if (!migrate && featureTableExists) {
			this.log('Dropping the core_Features table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS core_Features;
			`);
		}

		this.log('Creating the Features table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS core_Features (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				featureName VARCHAR(255) NOT NULL DEFAULT '',
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL
			);
			`);

		this.log('Creating the feature records...');
		await this.createFeatures(this.features);


		// load avatars
		const avatarTableExists = await this.tableExists('user_Avatars');
		if (!migrate && avatarTableExists) {
			this.log('Dropping the user_Avatars table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS user_Avatars;
			`);
		}

		this.log('Creating the user_Avatars table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS user_Avatars (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				avatarData VARCHAR(2048) NOT NULL DEFAULT '',
				isPublic INTEGER NOT NULL,
				creatorId INTEGER,
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL
			);
			`);

		this.log('Creating the avatar records...');
		await this.createAvatars(this.avatars);


		// load roles
		const roleTableExists = await this.tableExists('user_Roles');
		if (!migrate && roleTableExists) {
			this.log('Dropping the user_Roles table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS user_Roles;
			`);
		}

		this.log('Creating the user_Roles table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS user_Roles (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				roleName VARCHAR(255) NOT NULL DEFAULT '',
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL
			);
			`);

		this.log('Creating the role records...');
		await this.createRoles(this.roles);


		// load departments
		const departmentTableExists = await this.tableExists('user_Departments');
		if (!migrate && departmentTableExists) {
			this.log('Dropping the user_Departments table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS user_Departments;
			`);
		}

		this.log('Creating the user_Departments table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS user_Departments (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				department VARCHAR(255) NOT NULL DEFAULT '',
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL
			);
			`);

		this.log('Creating the department records...');
		await this.createDepartments(this.departments);


		// load users
		const userTableExists = await this.tableExists('user_Users');
		if (!migrate && userTableExists) {
			this.log('Dropping the user_Users table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS user_Users;
			`);
		}

		this.log('Creating the Users table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS user_Users (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				userName VARCHAR(255) NOT NULL DEFAULT '', 
				firstName VARCHAR(255) NOT NULL DEFAULT '', 
				lastName VARCHAR(255) NOT NULL DEFAULT '', 
				email VARCHAR(255) NOT NULL DEFAULT '' UNIQUE, 
				password VARCHAR(255) NOT NULL DEFAULT '', 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL,
				departmentId INTEGER NULL REFERENCES user_Departments (id),
				avatarId INTEGER NULL REFERENCES user_Avatars (id),
				roleId INTEGER NULL REFERENCES user_Roles (id)
			);
			`);

		this.log('Hashing the user passwords...');
		await this.hashUserPasswords(this.users)
			.then(hasshedUsers => {
				this.log('Creating the user records...');
				this.createUsers(hasshedUsers);
			});


		// load jobs
		const jobTableExists = await this.tableExists('task_Jobs');
		if (!migrate && jobTableExists) {
			this.log('Dropping the task_Jobs table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS task_Jobs;
			`);
		}

		this.log('Creating the Jobs table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS task_Jobs (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				jobName STRING NOT NULL,
				jobDescription STRING,
				jobStatus STRING,
				jobEnabled INTEGER NOT NULL,
				repeatSchedule STRING NOT NULL,
				scheduleType STRING NOT NULL,
				scheduleCron STRING NOT NULL,
				scheduleBegin STRING,
				scheduleEnd STRING,
				nextSchedule STRING,
				lastSchedule STRING,
				creatorId INTEGER, 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL,
				featureId INTEGER NOT NULL REFERENCES core_Features (id) ON DELETE CASCADE ON UPDATE CASCADE
			);
			`);

		this.log('Creating the job records...');
		await this.createJobs(this.jobs);


		// load tasks
		const taskTableExists = await this.tableExists('task_Tasks');
		if (!migrate && taskTableExists) {
			this.log('Dropping the task_Tasks table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS task_Tasks;
			`);
		}

		this.log('Creating the task_Tasks table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS task_Tasks (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				jobStep INTEGER NOT NULL,
				taskName STRING NOT NULL,
				taskDescription STRING,
				taskWorker STRING NOT NULL,
				taskStatus STRING,
				stopOnError INTEGER,
				lastScheduledTime STRING,
				lastCompleteTime STRING,
				creatorId INTEGER NOT NULL, 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL,
				jobId INTEGER NOT NULL REFERENCES task_Jobs (id) ON DELETE CASCADE ON UPDATE CASCADE,
				featureId INTEGER NOT NULL REFERENCES core_Features (id) ON DELETE CASCADE ON UPDATE CASCADE
				);
			`);

		this.log('Creating the task records...');
		await this.createTasks(this.tasks);

		// load targets
		const targetTableExists = await this.tableExists('agg_Targets');
		if (!migrate && targetTableExists) {
			this.log('Dropping the agg_Targets table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS agg_Targets;
			`);
		}

		this.log('Creating the agg_Targets table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS agg_Targets (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				targetLabel STRING,
				targetData STRING NOT NULL,
				batchControlColumn STRING NOT NULL,
				batchControlSize INTEGER NOT NULL,
				batchControlNext STRING NOT NULL,
				batchProcessed INTEGER NOT NULL,
				batchProcessing INTEGER,
				batchMicroChunkCurrent INTEGER,
				batchScheduleType STRING,
				batchScheduleLast INTEGER,
				patternColumns BLOB NOT NULL,
				groupByColumns BLOB NOT NULL,
				groupByPattern INTEGER NOT NULL,
				groupByFlexible INTEGER NOT NULL,
				aggregateColumns BLOB NOT NULL,
				aggregateFunctions BLOB NOT NULL,
				suppoetSpVersions BLOB,
				creatorId INTEGER NOT NULL, 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL,
				featureId INTEGER NOT NULL REFERENCES core_Features (id) ON DELETE CASCADE ON UPDATE CASCADE
			);
			`);

		this.log('Creating the target records...');
		await this.createTargets(this.targets);


		// load sources
		const sourceTableExists = await this.tableExists('agg_Sources');
		if (!migrate && sourceTableExists) {
			this.log('Dropping the agg_Sources table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS agg_Sources;
			`);
		}

		this.log('Creating the agg_Sources table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS agg_Sources (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				sourceLabel STRING,
				sourceData STRING NOT NULL,
				sourceEnabled INTEGER,
				sourceReadyTime STRING NOT NULL,
				sourceCheckTime STRING,
				sourceCheckQuery STRING,
				patternDefault INTEGER NOT NULL,
				patternFlexible INTEGER NOT NULL,
				transformation STRING NOT NULL,
				creatorId INTEGER NOT NULL, 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL,
				targetId INTEGER NULL DEFAULT NULL REFERENCES agg_Targets (id) ON DELETE CASCADE ON UPDATE CASCADE,
				featureId INTEGER NOT NULL REFERENCES core_Features (id) ON DELETE CASCADE ON UPDATE CASCADE
				);
			`);

		this.log('Creating the source records...');
		await this.createSources(this.sources);

		// load courses
		const courseTableExists = await this.tableExists('media_Courses');
		if (!migrate && courseTableExists) {
			this.log('Dropping the media_Courses table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS media_Courses;
			`);
		}

		this.log('Creating the media_Courses table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS media_Courses (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				title VARCHAR(255) NOT NULL DEFAULT '', 
				description TEXT NOT NULL DEFAULT '', 
				estimatedTime VARCHAR(255), 
				materialsNeeded VARCHAR(255), 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL, 
				creatorId INTEGER NULL DEFAULT NULL,
				featureId INTEGER NOT NULL REFERENCES core_Features (id) ON DELETE CASCADE ON UPDATE CASCADE
				);
			`);

		this.log('Creating the course records...');
		await this.createCourses(this.courses);


		// load notes
		const noteTableExists = await this.tableExists('media_Notes');
		if (!migrate && noteTableExists) {
			this.log('Dropping the media_Notes table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS media_Notes;
			`);
		}

		this.log('Creating the media_Notes table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS media_Notes (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				note VARCHAR(255) NOT NULL DEFAULT '', 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL, 
				creatorId INTEGER NULL DEFAULT NULL,
				featureId INTEGER NOT NULL REFERENCES core_Features (id) ON DELETE CASCADE ON UPDATE CASCADE
				);
			`);

		this.log('Creating the Note records...');
		await this.createNotes(this.notes);


		// load permissions
		const permissionTableExists = await this.tableExists('core_Permissions');
		if (!migrate && permissionTableExists) {
			this.log('Dropping the core_Permissions table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS core_Permissions;
			`);
		}

		this.log('Creating the core_Permissions table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS core_Permissions (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				permisionNote VARCHAR(255) NULL DEFAULT '', 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL, 
				roleId INTEGER NOT NULL REFERENCES user_Roles (id),
				featureId INTEGER NOT NULL REFERENCES core_Features (id)
				);
			`);

		this.log('Creating the Permission records...');
		await this.createPermissions(this.permissions);


		// Done
		this.log('Database successfully initialized!');
	}
}

module.exports = Database;
