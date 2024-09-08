const URL = require("../models/url")
const {shortIDGenerater} =require("./createShortID");

const handleGetNewId = async (req, res) => {

	const url = req.body.url;
	if(!url) return res.status(400).json({error : "URL is not given"})

	const isExists = await URL.findOne({redirectURL : url});
	if(isExists){
		return res.status(200).json( {id : isExists.shortID});
	}

	let shortID;
	while(true){
		const result =  shortIDGenerater(15);
		const isExists = await URL.findOne({shortID : shortID});
		if(!isExists){
			shortID=result;
			break;
		}
	}

	await URL.create({
		shortID : shortID,
		redirectURL : url,
		visitHistory : [],
	})

	return res.status(201).json({id : shortID});
}

const handeleAnalytics = async (req, res) => {
	const id = req.params.id;
	const result=await  URL.findOne({shortID :id});
	return res.status(200).json(
		{visited : result.visitHistory.length , Analytics : result.visitHistory})
}


const handeleGetOriginalPage = async (req , res) => {
	const shortid= req.params.shortid;
	const isExists =  await URL.findOne({ shortID: shortid });

	if(!isExists){
		return res.status(400).json({error : "Page bot Found"})
	}

	const result = await URL.findOneAndUpdate(
		{ shortID: shortid },
		{
			$push : 
			{ 
				visitHistory : { timestamp : Date.now() }
			}
		})

	
	res.redirect(result.redirectURL);
}

module.exports = {handleGetNewId , handeleAnalytics , handeleGetOriginalPage};