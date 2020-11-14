const {
	GraphQLInputObjectType,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLString,
} = require('graphql');


const UserInputType = (type) => {
	let allGraphFields = {};
	const standardGraphFields = {
		id: {
			type: new GraphQLNonNull(GraphQLInt),
		},
	};

	switch (type) {
		case 'delete':
			allGraphFields = {
				...standardGraphFields,
			};
			break;
		case 'update':
			allGraphFields = {
				...standardGraphFields,
				userName: {
					type: GraphQLString,
				},
				firstName: {
					type: GraphQLString,
				},
				lastName: {
					type: GraphQLString,
				},
				email: {
					type: GraphQLString,
				},
				password: {
					type: GraphQLString,
				},
				avatarId: {
					type: GraphQLInt,
				},
				roleId: {
					type: GraphQLInt,
				},
				// creatorId: {
				// 	type: GraphQLInt,
				// },
			};
			break;
		default:
			allGraphFields = {
				...standardGraphFields,
			};
	}

	const userInputType = new GraphQLInputObjectType({
		name: `UserInputType${type[0].toUpperCase() + type.slice(1, type.length - 1)}`,
		description: 'This represents a UserInputType',
		fields: allGraphFields,
	});

	return userInputType;
};

module.exports = { UserInputType };
