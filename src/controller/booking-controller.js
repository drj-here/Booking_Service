const {BookingService}=require('../service/index')
const {StatusCodes}=require('http-status-codes')
const {createChannel,publishMessage}=require('../utils/messageQueue')
const {REMINDER_BINDING_KEY}=require('../config/serverConfig')
const bookingService=new BookingService()

class BookingController{

    constructor(){
        
    }
    async sendMessageToQueue(req,res){
        try{
        const channel=await createChannel();
        const data={message:'success'};
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data))
        return res.status(200).json({
            message:'Successfully published the event'
        })}
        catch(error){
            console.log(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message:'unable to send the msg to queue',
                success:false,
                err:error,
                data:{}
            })
        }
    }
 
    async create(req,res){
    try{
        const response=await bookingService.createBooking(req.body)
        return res.status(StatusCodes.OK).json({
            message:'successfully completed booking ',
            success:true,
            err:{},
            data:response
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            message:error.message,
            success:false,
            err:error.explanation,
            data:{}
        })
    }

    }
}

module.exports=BookingController;