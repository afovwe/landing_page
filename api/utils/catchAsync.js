// api/utils/catchAsync.js

// This is a wrapper function that eliminates the need to write try-catch blocks in every controller
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

export default catchAsync;