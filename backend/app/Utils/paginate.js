// // utils/paginate.js
// const paginateQuery = async (Model, query = {}, options = {}) => {
//     const page = parseInt(options.page) || 1;
//     const limit = parseInt(options.limit) || 10;
//     const skip = (page - 1) * limit;

//     const total = await Model.countDocuments(query);
//     const data = await Model.find(query)
//         .skip(skip)
//         .limit(limit)
//         .sort(options.sort || { createdAt: -1 });

//     return {
//         total,
//         page,
//         pages: Math.ceil(total / limit),
//         results: data,
//     };
// };

// export default paginateQuery;
// utils/paginate.js
const paginateQuery = async (queryBuilder, options = {}) => {
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await queryBuilder.model.countDocuments(queryBuilder.getFilter());

    const data = await queryBuilder
        .skip(skip)
        .limit(limit)
        .sort(options.sort || { createdAt: -1 });

    return {
        total,
        page,
        pages: Math.ceil(total / limit),
        results: data,
    };
};

export default paginateQuery;
