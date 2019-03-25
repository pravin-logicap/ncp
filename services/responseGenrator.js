exports.responseGenrator = function(statusCode,msg,responseData){
    if(statusCode>=200 && statusCode <=299){
        let response = {
            "status" : 200,
            "msg" : msg,
            "response_data" : responseData
        }
        return response;
    }else{
        let response = {
            "status" : statusCode,
            "msg" : msg,
            "response_data" : responseData ? responseData : {}
        }
        return response; 
    }

}