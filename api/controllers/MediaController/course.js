const { validationResult } = require('express-validator');
const { Course, User } = require('../../models');


const CourseController = () => {
	const getCourses = (req, res, next) => {
		// Find all courses
		Course.findAll({
			// This is all the course data
			attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded', 'creatorId'],
			include: [{
				// this is the user data associated with each course
				model: User,
				attributes: ['id', 'userName', 'firstName', 'lastName', 'email'],
			}],
		}).then((courses) => {
			res.status(200);
			// retrieve courses in JSON format
			res.json({ courses });
		})
			// Catch the errors
			.catch((err) => {
				err.status = 400;
				next(err);
			});
	};

	const getCourse = (req, res, next) => {
		// get course
		Course.findOne({
			where: {
				id: req.params.id,
			},
			attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded', 'creatorId'],
			include: [{
				model: User,
				attributes: ['id', 'userName', 'firstName', 'lastName', 'email'],
			}],
		}).then((course) => {
			// Checks for match for course
			if (course) {
				res.status(200);
				res.json(course);
			} else {
				const err = new Error('This course does not exist.');
				err.status = 404;
				next(err);
			}
		});
	};

	const postCourse = (req, res, next) => {
		if (!req.body.title && !req.body.description) {
			const err = new Error('Please enter a title and a description.');
			err.status = 400;
			next(err);
		} else if (!req.body.title) {
			const err = new Error('Please enter a title.');
			err.status = 400;
			next(err);
		} else if (!req.body.description) {
			const err = new Error('Please enter a description.');
			err.status = 400;
			next(err);
		} else {
			Course.findOne({
				where: {
					title: req.body.title
				}
			}).then((title) => {
				if (title) {
					const err = new Error('This course already exists.');
					err.status = 400;
					next(err);
				} else {
					Course.create(req.body).then((course) => {
						res.location(`/respful/courses/${course.id}`);
						res.status(201).end();
					})
						// Catch errors
						.catch((err) => {
							err.status = 400;
							next(err);
						});
				}
			})
		}
	};

	const putCourse = (req, res, next) => {
		// const user = req.token;
		// If title is left null
		if (!req.body.title && !req.body.description) {
			const err = new Error('Please enter a title and a description.');
			err.status = 400;
			next(err);
		} else if (!req.body.title) {
			const err = new Error('Please enter a title.');
			err.status = 400;
			next(err);
		} else if (!req.body.description) {
			const err = new Error('Please enter a description.');
			err.status = 400;
			next(err);
		} else {
			Course.findOne({
				where: {
					id: req.body.id
				}
			}).then((course) => {
				if (!course) {
					res.status(404).json({
						message: 'Course Not Found'
					});
				} else if (course) {
					if (req.token.roleId === course.creatorId) {
						const updateCourse = {
							id: req.body.id,
							title: req.body.title,
							description: req.body.description,
							estimatedTime: req.body.estimatedTime,
							materialsNeeded: req.body.materialsNeeded,
							creatorId: req.token.id,
						};
						course.update(req.body);
					} else {
						res.location('/').status(403).json('Only course owner can update course');
					}
				}
			}).then(() => {
				res.status(204).end();
			})
				// Catch any errors
				.catch((err) => {
					err.status = 400;
					next(err);
				});
		}
	};

	const deleteCourses = (req, res, next) => {
		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

		// Only the user with admin role can do multi-deletion
		if (req.token.roleId !== 1) {
			res.status(403).json({ message: 'Only admin can use the multi-selection to delete course!' });
		} else {
			// delete user from users table
			Course.destroy({
				where: filter,
			}).then((deleted) => {
				const { id } = deleted;
				res.json({ id }).status(204).end();
			});
		}
	};

	const deleteCourse = (req, res, next) => {
		// const user = req.token;
		// Find one course to delete
		Course.findOne({
			where: {
				id: req.params.id
			}
		}).then((course) => {
			// If course doesn't exist
			if (!course) {
				// Show error
				res.status(404).json({
					message: 'Course Not Found'
				});
			} else if (req.token.roleId === course.creatorId) {
				// Delete the course
				return course.destroy();
			} else {
				res.location('/').status(403).json('You do not have permissions to delete this course');
			}
		}).then(() => {
			// Return no content and end the request
			res.status(204).end();
		})
			// Catch the errors
			.catch((err) => {
				err.status = 400;
				next(err);
			});
	};

	return {
		getCourses,
		getCourse,
		postCourse,
		putCourse,
		deleteCourses,
		deleteCourse,
	};
};

module.exports = CourseController;
