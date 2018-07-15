module.exports = (h) => {
    return {
        OK(data){
            return h.response(data).code(201);
        },
        NotFound(msg){
            let result ={
                success: false,
                mensage: msg
            };

            return h.response(result).code(404);
        },
        Error(msg){
            let result ={
                success: false,
                mensage: msg
            };
            return h.response(result).code(500);
        },
        BadRequest(msg){
            let result ={
                success: false,
                mensage: msg
            };
            return h.response(result).code(400);
        }
    }
}