module.exports = (h) => {
    return {
        OK(data){
            return h.response(data).code(201);
        },
        NotFound(msg){
            return h.response(msg).code(404);
        },
        Error(msg){
            return h.response(msg).code(500);
        },
        BadRequest(msg){
            return h.response(msg).code(400);
        }
    }
}